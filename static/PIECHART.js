function plotPieChart2(data, type) {

    // set the dimensions and margins of the graph
    var width = 550,
        height = 480,
        margin = 21

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = 125;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#newpie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(250,165)");

    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })

    var data_ready = pie(d3.entries(data))

    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    let mouseOver = function (d) {
        d3.selectAll(".pieslice")
            .transition()
            .duration(100)
            .style("opacity", .3)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "black")
    }

    let mouseLeave = function (d) {
        d3.selectAll(".pieslice")
            .transition()
            .duration(100)
            .style("opacity", 1)
        d3.select(this)
            .transition()
            .duration(100)
            .style("stroke", "transparent")
            .style("fill", function () {
                if (this.getAttribute("test") === "yes") {
                    return "#FFFFFF";
                } else {
                    console.log("pie chart");
                    return d.data.key === "Female" ? d3.select(this).style("fill", "#3181BD") :
                        d3.select(this).style("fill", "#a444ff")
                }

            })
    }

    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr("class", "pieslice")
        .transition()
        .duration(1000)
        .attr('d', arcGenerator)
        .attr('fill', function (d) {
            if (d.data.key === "Oceania")
                return "#d62728"
            else if (d.data.key === "Asia")
                return "#00CED1"
            else if (d.data.key === "Americas")
                return "#9467bd"
            else if (d.data.key === "Africa")
                return "#c5b0d5"
            else if (d.data.key === "Europe")
                return "#8c564b"
        })
        .attr("stroke", "black")
        .style("stroke-opacity", 0.8)
        .style("stroke-width", "1px")
        .on('end', function (d, i) {
            d3.select(this)
                .on("click", function () {
                    if (this.getAttribute("test") === "yes") {
                        d.data.key === "Yes" ? d3.select(this).style("fill", "#3181BD").attr("test", "no") :
                            d3.select(this).style("fill", "#a444ff").attr("test", "no")
                    } else {
                        d.data.key === "Yes" ? d3.select(this).style("fill", "#FFFFFF").attr("test", "yes") :
                            d3.select(this).style("fill", "#FFFFFF").attr("test", "yes")
                    }
                    piechartlistener2(d.data.key, type)
                })
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave)
        })


    var len = 0
    for (var d in data_ready) {
        len = len + data_ready[d].data.value;
    }

    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) {
            return Math.round((d.data.value / len) * 100) + "%"
        })
        .attr("transform", function (d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", 17)

    svg.append('rect')
        .attr('x', 150)
        .attr('y', 30)
        .attr('width', 10)
        .attr('height', 10)
        .attr('stroke', 'black')
        .attr('fill', '#d62728')

    svg.append("text")
        .attr("fill", "#ffffff")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "17px")
        .attr("x", 170)
        .attr("y", 40)
        .text("Oceania");

    svg.append('rect')
    .attr('x', 150)
    .attr('y', 60)
    .attr('width', 10)
    .attr('height', 10)
    .attr('stroke', 'black')
    .attr('fill', '#8c564b')

    svg.append("text")
        .attr("fill", "#ffffff")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "17px")
        .attr("x", 170)
        .attr("y", 70)
        .text("Europe");

    svg.append('rect')
        .attr('x', 150)
        .attr('y', 90)
        .attr('width', 10)
        .attr('height', 10)
        .attr('stroke', 'black')
        .attr('fill', '#9467bd')

    svg.append("text")
        .attr("fill", "#ffffff")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "17px")
        .attr("x", 170)
        .attr("y", 100)
        .text("Americas");

        svg.append('rect')
        .attr('x', 150)
        .attr('y', 120)
        .attr('width', 10)
        .attr('height', 10)
        .attr('stroke', 'black')
        .attr('fill', '#00CED1')

    svg.append("text")
        .attr("fill", "#ffffff")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "17px")
        .attr("x", 170)
        .attr("y", 130)
        .text("Asia");

    svg.append('rect')
        .attr('x', 150)
        .attr('y', 150)
        .attr('width', 10)
        .attr('height', 10)
        .attr('stroke', 'black')
        .attr('fill', '#c5b0d5')

    svg.append("text")
        .attr("fill", "#ffffff")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "17px")
        .attr("x", 170)
        .attr("y", 160)
        .text("Africa");

    svg.append("text")
        .attr("fill", "#ffffff")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "30px")
        .attr("x", -75)
        .attr("y", 190)
        .text("Continents");}
