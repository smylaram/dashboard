function pcp(labels, rankings) {

    var margin = {top: 60, right: 120, bottom: 60, left: 50},
        width = 1040 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.scalePoint().range([0, width - 50]),
        y = {},
        dragging = {};

    var line = d3.line(),
        background,
        foreground;

    var svg = d3.select("#pcpplotid").append("svg")
        .attr("width", width + margin.left + margin.right + 70)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(240,65)");
    var dimensions = [];

    var cat_dims = ['name', 'intl_students_percent', 'closed', 'unaccredited', 'country',
        'code_3', 'continent', 'sub_region']

    svg.append("text")
        .attr("transform", "translate(0,0) rotate(-90)")
        .attr("x", -270)
        .attr("y", -120)
        .attr("fill", "white")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "25px")
        .text("Parallel Coordinates Plot")

    var attrs = ['overall_score', 'teaching_score', 'research_score', 'citations_score', 'industry_income_score', 'international_outlook_score'];

    function calDomain(d) {
        if (d === 'overall_score') {
            return [0, 100];
        } else if (d === 'teaching_score') {
            return [0, 100];
        } else if (d === 'research_score') {
            return [0, 100];
        } else if (d === 'citations_score') {
            return [0, 100];
        } else if (d === 'industry_income_score') {
            return [0, 100];
        } else if (d === 'international_outlook_score') {
            return [0, 100];
        } else {
            return d3.extent(rankings, function (p) {
                return +p[d];
            })
        }
    }

    x.domain(dimensions = attrs.filter(function (d) {
        if (d !== "EmployeeID") {
            if (cat_dims.includes(d)) {
                var domarr = [];
                d3.extent(rankings, function (p) {
                    domarr.push(p[d])
                    return String(p[d]);
                })
                return (cat_dims.includes(d)) && (y[d] = d3.scaleBand()
                    .domain(domarr)
                    .range([0, height]))
            } else {
                return !(cat_dims.includes(d)) && (y[d] = d3.scaleLinear()
                    .domain(calDomain(d))
                    .range([height, 0]));
            }
        }
    }));

    // Add grey background lines for context.
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(rankings)
        .enter().append("path")
        .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(rankings)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", function (d) {
            return "#1a76b9";
        })

    // Add a group element for each dimension.
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) {
            return "translate(" + x(d) + ")";
        })
        .call(d3.drag()
            .on("start", function (d) {
                dragging[d] = x(d);
                background.attr("visibility", "hidden");
            })
            .on("drag", function (d) {
                dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                foreground.attr("d", path);
                dimensions.sort(function (a, b) {
                    return position(a) - position(b);
                });
                x.domain(dimensions);
                g.attr("transform", function (d) {
                    return "translate(" + position(d) + ")";
                })
            })
            .on("end", function (d) {
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                transition(foreground).attr("d", path);
                background
                    .attr("d", path)
                    .transition()
                    .delay(500)
                    .duration(1000)
                    .attr("visibility", null);
            }));


    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function (d) {
            d3.select(this)
                .call(d3.axisLeft()
                    .scale(y[d]));
        })
        .append("text")
        .style("text-anchor", "middle")
        .attr("class", "axis-label")
        .attr("y", -19)
        .style("fill", "#4f4f4f")
        .style("font-size", 10)
        .attr("transform", "rotate(-30)")
        .text(function (d) {
            return d;
        })

    // Add and store a brush for each axis.
    g.append("g")
        .attr("class", "brush")
        .each(function (d) {
            d3.select(this)
                .call(y[d].brush = d3.brushY().extent([[-10, 0], [10, height]])
                    .on("start", brushstart)
                    .on("brush", brush)
                    .on("end", brush))

        }).selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);


    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }

    function transition(g) {
        return g.transition().duration(500);
    }

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function (p) {
            if (cat_dims.includes(p)) {
                return [position(p), y[p](d[p]) + y[p].bandwidth() / 2]
            } else {
                return [position(p), y[p](d[p])];
            }
        }));
    }

    function brushstart() {
        d3.event.sourceEvent.stopPropagation();
    }

    var sliced_vals = {}


// Handles a brush event, toggling the display of foreground lines.
    function brush() {

        var actives = [];

        d3.selectAll(".brush")
            .filter(function (d) {
                return d3.brushSelection(this);
            })
            .each(function (key) {
                actives.push({
                    dimension: key,
                    extent: d3.brushSelection(this)
                });
            });


        if (actives.length === 0) {
            foreground.style("display", null);
        } else {
            foreground.style("display", function (d) {
                return actives.every(function (brushObj) {
                    if (cat_dims.includes(brushObj.dimension)) {
                        if (brushObj.extent[0] <= y[brushObj.dimension](d[brushObj.dimension]) + y[brushObj.dimension].bandwidth() / 2
                            && y[brushObj.dimension](d[brushObj.dimension]) + y[brushObj.dimension].bandwidth() / 2 <= brushObj.extent[1]) {

                            if (sliced_vals[brushObj.dimension] === undefined) {
                                sliced_vals[brushObj.dimension] = new Set();
                            }
                            sliced_vals[brushObj.dimension].add(d[brushObj.dimension])

                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (brushObj.extent[0] <= y[brushObj.dimension](d[brushObj.dimension])
                            && y[brushObj.dimension](d[brushObj.dimension]) <= brushObj.extent[1]) {
                            if (sliced_vals[brushObj.dimension] === undefined) {
                                sliced_vals[brushObj.dimension] = new Set();
                            }
                            sliced_vals[brushObj.dimension].add(d[brushObj.dimension])
                            return true;
                        } else {
                            return false;
                        }
                    }
                }) ? null : "none";
            });
        }
        pcpListener(sliced_vals)
    }
}
