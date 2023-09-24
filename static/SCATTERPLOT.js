function plotScatterplot(data) {
    // set the dimensions and margins of the graph
    var margin = {top: 80, right: 40, bottom: 100, left: 85},
        width = 520 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#scatterid")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    svg.append("text")
        .attr("x", 80)
        .attr("y", -30)
        .attr("fill", "white")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "25px")
        .text("Teaching score vs Income level")

    var n = data.length;

    var x = d3.scaleLinear()
        .domain([8, 100])
        .range([0, width])

    svg.append("g")
        .attr("class", "x-scatter")
        .call(d3.axisBottom(x).ticks(6))
        .attr("transform", "translate(0," + height + ")")

    svg.append("text")
        .attr("x", width / 2 - 80)
        .attr("y", 380)
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text("Teaching Score")


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([30, 100])
        .range([height, 0])


    svg.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .attr("class", "y-scatter")

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -180)
        .attr("y", -40)
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text("Income Level")


    var circles = svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d) => x(+d.x))
        .attr("cy", (d) => y(+d.y))
        .attr("class", "non_brushed");


    function highlightBrushedCircles() {

        if (d3.event.selection != null) {

            // revert circles to initial style
            circles.attr("class", "non_brushed");

            var brush_coords = d3.brushSelection(this);

            // style brushed circles
            circles.filter(function () {

                var cx = d3.select(this).attr("cx"),
                    cy = d3.select(this).attr("cy");

                return isBrushed(brush_coords, cx, cy);
            })
                .attr("class", "brushed");
        }
    }

    function displayTable() {
        if (!d3.event.selection) return;

        d3.select(this).call(brush.move, null);

        var d_brushed = d3.selectAll(".brushed").data();
        scatterPlotListener(d_brushed);
    }

    var brush = d3.brush()
        .on("brush", highlightBrushedCircles)
        .on("end", displayTable);

    svg.append("g")
        .call(brush);


    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];

        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

}
