function geomapplot(data) {

    var div = d3.select("#usmapid")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

 //   console.log("countries ", data)

    var lowColor = '#27a7fd'
    var highColor = '#002338'

    var margin = {top: 0, right: 10, bottom: 20, left: 10},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // D3 Projection
    var projection = d3.geoMercator()
        .translate([width / 2, height / 2])
        .center([0,20])
        .scale([85]);

    // Define path generator
    var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection

    //Create SVG element and append map to the SVG
    var svg = d3.select("#usmapid")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(80,40)");

    svg.append("text")
        .attr("x", 90)
        .attr("y", 15)
        .attr("fill", "white")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "25px")
        .text("Average Overall scores by Country")


    var dataArray = [];
    for (var d = 0; d < data.length; d++) {
        dataArray.push(parseFloat(data[d].value))
    }
    var minVal = d3.min(dataArray)
    var maxVal = d3.max(dataArray)

    var ramp = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])


    d3.tsv("https://gist.githubusercontent.com/amartone/5e9a82772cf1337d688fe47729e99532/raw/65a04d5b4934beda724630f18c475d350628f64d/us-state-names.tsv", function (error, names) {

        // Load GeoJSON data and merge with states data
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (json) {
            for (var j = 0; j < json.features.length; j++) {
                json.features[j].properties.value = 0;
            }
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].code_3;
                var dataValue = data[i].value;

                // Find the corresponding country inside the GeoJSON
                for (var j = 0; j < json.features.length; j++) {
                    var jsonID = json.features[j].id;

                    if (dataState === jsonID) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }

            let mouseOver = function (d) {
                d3.selectAll(".map")
                    .transition()
                    .duration(50)
                    .style("opacity", .4)
                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)

                div.transition()
                    .duration(50)
                    .style("opacity", .9);
                div.html(d.properties.name + " " + Math.round(d.properties.value))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 30) + "px")
            }

            let mouseLeave = function (d) {
                d3.selectAll(".map")
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style("stroke", "transparent")

                d3.select(this)
                    .transition()
                    .duration(100)

                div.transition()
                    .duration(50)
                    .style("opacity", 0);
            }

            // Bind the data to the SVG and create one path per GeoJSON feature
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("class", "map")
                .attr("d", path)
                .style("stroke", "rgba(72,72,72,0.3)")
                .style("stroke-width", "1")
                .style("fill", function (d) {
                    if (isNaN(d.properties.value))
                        return '#8c8a8a'
                    else
                        return ramp(d.properties.value)
                })
                .style("opacity", function (d) {
                    if (isNaN(d.properties.value))
                        return 0.5
                    else
                        return 1
                })

                .on("click", function (d) {
                    if (this.getAttribute("test") === "yes") {
                        d3.select(this).style("fill", ramp(d.properties.value)).attr("test", "no")
                    } else {
                        d3.select(this).style("fill", "#A344FF").attr("test", "yes")
                    }
                    geomaplistener(d.id)
                })
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave)

            // add a legend
            var w = 140, h = 280;

            var key = d3.select("#usmapid")
                .append("svg")
                .attr("width", w)
                .attr("height", h + 30)
                .attr("class", "legend")
                .attr("transform", "translate(30,-330)");


            var legend = key.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "100%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            legend.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", highColor)
                .attr("stop-opacity", 1);

            legend.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", lowColor)
                .attr("stop-opacity", 1);

            key.append("rect")
                .attr("width", w - 120)
                .attr("height", h - 20)
                .style("fill", "url(#gradient)")
                .attr("transform", "translate(0,10)");


            var y = d3.scaleLinear().domain([minVal, maxVal]).range([h - 20, 0])


            var yAxis = d3.axisRight(y).tickValues([minVal, (minVal + maxVal) / 2, maxVal]);

            key.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(20,10)")
                .call(yAxis)

        });
    });
}
