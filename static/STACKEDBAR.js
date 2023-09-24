function plotBarChart(top) {
    var margin = {top: 80, right: 40, bottom: 80, left: 50},
        width = 400 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#barid")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", 20)
        .attr("y", -30)
        .attr("fill", "white")
        .attr("font-family", "Gill Sans")
        .attr("font-size", "25px")
        .text("Top 5 Universities (with scores)")


    d3.csv("./static/stackeddata.csv", function (all_data) {
        var data = all_data.filter(university => top.includes(university.name));

        var subgroups = all_data.columns.slice(1)

        var groups = d3.map(data, function (d) {
            return (d.name)
        }).keys()

        console.log(groups)

        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .selectAll("text")
            .attr("fill", "white")
            .attr("dx", "-.5em")
            .attr("dy", ".95em")
            .attr("transform", function (d) {
                return "rotate(-7)";
            });

        var y = d3.scaleLinear()
            .domain([0, 400])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("fill", "white");

        var colorScheme = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"];
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colorScheme);

        var stackedData = d3.stack()
            .keys(subgroups)
            (data)

        console.log(stackedData)

        // What happens when user hover a bar
        var mouseover = function (d) {
            // what subgroup are we hovering?
            var subgroupName = d3.select(this.parentNode).datum().key; // This was the tricky part
            var subgroupValue = d.data[subgroupName];
            // Reduce opacity of all rect to 0.2
            d3.selectAll(".myRect").style("opacity", 0.2)
            // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
            d3.selectAll("." + subgroupName)
                .style("opacity", 1)
        }

        // When user do not hover anymore
        var mouseleave = function (d) {
            // Back to normal opacity: 0.8
            d3.selectAll(".myRect")
                .style("opacity", 0.8)
        }

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) {
                return color(d.key);
            })
            .attr("class", function (d) {
                return "myRect " + d.key
            }) // Add a class to each subgroup: their name
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.data.name);
            })
            .attr("y", function (d) {
                return y(d[1]);
            })
            .attr("height", function (d) {
                return y(d[0]) - y(d[1]);
            })
            .attr("width", x.bandwidth())
            .attr("stroke", "grey")
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
            .on("click", function (d) {
                barchartlistener(d.data.name)
            })
    })

}