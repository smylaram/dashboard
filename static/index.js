var pcp_labels = []
var joblevel = []
var ages = []
var mincomes = []
var pie_data1 = []
var pie_data2 = []
var pie_data3 = []
var ranking_pcp_labels = []

var employees_data = []
var emp_data = {}
var ranks_data = {}
var rankings_data = []
var attrs = []
var ranking_attrs = []
var pcp_data = {}
var rankings_pcp_data = {}
var global_emp_data = []
var global_rankings_data = []
var global_pcp_data = {}
var rankings_global_pcp_data = {}
var teaching_score = []
var income_level = []
var continents = []
var overall_score = []
var research_score = []
var citations_score = []
var international_outlook_score = []
var university_name = []

var selected = {
    'code_3':[],
    'continent':[],
    'name':[],
    'teaching_score':[],
    'industry_income_score':[]
}

function removecharts(chart) {

    switch (chart) {

        case "barid":
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("newpie").innerHTML = "";
            document.getElementById("pcpplotid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";
            break;

        case "scatterid":
            document.getElementById("barid").innerHTML = "";
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("newpie").innerHTML = "";
            document.getElementById("pcpplotid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";
            break;

        case "sunburst":
            document.getElementById("barid").innerHTML = "";
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("pieid1").innerHTML = "";
            document.getElementById("pieid2").innerHTML = "";
            document.getElementById("pcpplotid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";
            break;

        case "pieid1":
            document.getElementById("barid").innerHTML = "";
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("sunburstid").innerHTML = "";
            document.getElementById("pieid2").innerHTML = "";
            document.getElementById("pcpplotid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";
            break;

        case "pieid2":
            document.getElementById("barid").innerHTML = "";
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("pcpplotid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";
            break;

        case "pcpplotid":
            document.getElementById("usmapid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";
            document.getElementById("barid").innerHTML = "";
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("pieid1").innerHTML = "";
            document.getElementById("pieid2").innerHTML = "";
            break;

        case "geomap":
            document.getElementById("barid").innerHTML = "";
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("newpie").innerHTML = "";
            document.getElementById("pcpplotid").innerHTML = "";
            break;

        case "pcpid":
            document.getElementById("scatterid").innerHTML = "";
            document.getElementById("barid").innerHTML = "";
            document.getElementById("pieid1").innerHTML = "";
            document.getElementById("pieid2").innerHTML = "";
            document.getElementById("sunburstid").innerHTML = "";
            document.getElementById("usmapid").innerHTML = "";

    }

}

// set initial data arrays
function setInitialArrays(pcp_l, joblevel, age, income, attrition, gender, dept, teachingscore, incomelevel, continentslist, overallscore, researchscore, citationsscore, internationaloutlookscore
, rpcp_l, universityname) {
    pcp_labels = pcp_l
    joblevels = joblevel
    mincomes = income
    ages = age
    pie_data1 = attrition
    pie_data2 = gender
    pie_data3 = dept
    teaching_score = teachingscore
    income_level = incomelevel
    continents = continentslist
    overall_score = overallscore
    research_score = researchscore
    citations_score = citationsscore
    international_outlook_score = internationaloutlookscore
    ranking_pcp_labels = rpcp_l
    university_name = universityname
}

function getJsonData() {
    sales_exec_yes = employees_data.filter(row => row['Department'] === 'Sales' && row['JobRole'] === 'Sales Executive' && row['Attrition'] === 'Yes').length
    sales_exec_no = employees_data.filter(row => row['Department'] === 'Sales' && row['JobRole'] === 'Sales Executive' && row['Attrition'] === 'No').length
    Sales_Manager_Yes = employees_data.filter(row => row['Department'] === 'Sales' && row['JobRole'] === 'Manager' && row['Attrition'] === 'Yes').length
    Sales_Manager_No = employees_data.filter(row => row['Department'] === 'Sales' && row['JobRole'] === 'Manager' && row['Attrition'] === 'No').length
    sales_Rep_yes = employees_data.filter(row => row['Department'] === 'Sales' && row['JobRole'] === 'Sales Representative' && row['Attrition'] === 'Yes').length
    sales_Rep_no = employees_data.filter(row => row['Department'] === 'Sales' && row['JobRole'] === 'Sales Representative' && row['Attrition'] === 'No').length

    RD_Scientist_yes = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Research Scientist' && row['Attrition'] === 'Yes').length
    RD_Scientist_no = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Research Scientist' && row['Attrition'] === 'No').length
    LT_yes = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Laboratory Technician' && row['Attrition'] === 'Yes').length
    LT_no = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Laboratory Technician' && row['Attrition'] === 'No').length
    MD_yes = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Manufacturing Director' && row['Attrition'] === 'Yes').length
    MD_no = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Manufacturing Director' && row['Attrition'] === 'No').length
    Health_Rep_yes = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Healthcare Representative' && row['Attrition'] === 'Yes').length
    Health_Rep_no = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Healthcare Representative' && row['Attrition'] === 'No').length
    RD_Manager_yes = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Manager' && row['Attrition'] === 'Yes').length
    RD_Manager_no = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Manager' && row['Attrition'] === 'No').length
    RD_Director_yes = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Research Director' && row['Attrition'] === 'Yes').length
    RD_Director_no = employees_data.filter(row => row['Department'] === 'Research & Development' && row['JobRole'] === 'Research Director' && row['Attrition'] === 'No').length

    HR_yes = employees_data.filter(row => row['Department'] === 'Human Resources' && row['JobRole'] === 'Human Resources' && row['Attrition'] === 'Yes').length
    HR_no = employees_data.filter(row => row['Department'] === 'Human Resources' && row['JobRole'] === 'Human Resources' && row['Attrition'] === 'No').length
    HR_Manager_yes = employees_data.filter(row => row['Department'] === 'Human Resources' && row['JobRole'] === 'Manager' && row['Attrition'] === 'Yes').length
    HR_Manager_no = employees_data.filter(row => row['Department'] === 'Human Resources' && row['JobRole'] === 'Manager' && row['Attrition'] === 'No').length


    return {
        "name": "employees1",
        "children": [
            {
                "name": "Sales2",
                "children": [
                    {
                        "name": "Sales Executive3",
                        "children": [
                            {"name": "Yes4", "size": sales_exec_yes},
                            {"name": "No4", "size": sales_exec_no}
                        ]
                    },
                    {
                        "name": "Manager3",
                        "children": [
                            {"name": "Yes4", "size": Sales_Manager_Yes},
                            {"name": "No4", "size": Sales_Manager_No}
                        ]
                    },
                    {
                        "name": "Sales Representative3",
                        "children": [
                            {"name": "Yes4", "size": sales_Rep_yes},
                            {"name": "No4", "size": sales_Rep_no}
                        ]
                    }
                ]
            },
            {
                "name": "Research & Development2",
                "children": [
                    {
                        "name": "Research Scientist3",
                        "children": [
                            {"name": "Yes4", "size": RD_Scientist_yes},
                            {"name": "No4", "size": RD_Scientist_no}
                        ]
                    },
                    {
                        "name": "Laboratory Technician3",
                        "children": [
                            {"name": "Yes4", "size": LT_yes},
                            {"name": "No4", "size": LT_no}
                        ]
                    },
                    {
                        "name": "Manufacturing Director3",
                        "children": [
                            {"name": "Yes4", "size": MD_yes},
                            {"name": "No4", "size": MD_no}
                        ]
                    },
                    {
                        "name": "Healthcare Representative3",
                        "children": [
                            {"name": "Yes4", "size": Health_Rep_yes},
                            {"name": "No4", "size": Health_Rep_no}
                        ]
                    },
                    {
                        "name": "Manager3",
                        "children": [
                            {"name": "Yes4", "size": RD_Manager_yes},
                            {"name": "No4", "size": RD_Manager_no}
                        ]
                    },
                    {
                        "name": "Research Director3",
                        "children": [
                            {"name": "Yes4", "size": RD_Director_yes},
                            {"name": "No4", "size": RD_Director_no}
                        ]
                    }
                ]
            },
            {
                "name": "Human Resources2",
                "children": [
                    {
                        "name": "Human Resources3",
                        "children": [
                            {"name": "Yes4", "size": HR_yes},
                            {"name": "No4", "size": HR_no}
                        ]
                    },
                    {
                        "name": "Manager3",
                        "children": [
                            {"name": "Yes4", "size": HR_Manager_yes},
                            {"name": "No4", "size": HR_Manager_no}
                        ]
                    }
                ]
            }
        ]
    }
}

d3.csv("./static/employees_new.csv", function (error, employees) {
    emp_data = employees
    global_pcp_data = emp_data
    pcp_data = emp_data
    attrs = emp_data.columns
    employees.map(d => {
        employees_data.push(d)
        global_emp_data.push(d)
    })
    getMapData()
   // drawgeomap()
    drawPieChart1()
    drawPieChart2()
    drawScatterPlot()
    //drawpcp()
    //drawbarchart()
    var json_data = getJsonData()
    drawSunBurst(json_data)
})

var rankings_data = []

d3.csv("./static/final_data.csv", function (error, rankings) {
   // emp_data = employees
    ranks_data = rankings
    //global_pcp_data = emp_data
    rankings_global_pcp_data = ranks_data
    rankings_pcp_data = ranks_data
    ranking_attrs = ranks_data.columns

  //  attrs = emp_data.columns
    rankings.map(d => {
        rankings_data.push(d)
        global_rankings_data.push(d)
    })
    // getMapData()
     drawgeomap1()
    // drawPieChart1()
    // drawPieChart2()
    // drawScatterPlot()
    drawpcp1()
    drawbarchart1()
    // var json_data = getJsonData()
    // drawSunBurst(json_data)
})

function reset() {
    location.reload()
}

function getFilteredPCPData() {
    rankings_pcp_data = rankings_global_pcp_data
   // pcp_data = global_pcp_data
    for (const sel in selected) {
        if (selected[sel].length !== 0) {
            rankings_pcp_data = rankings_pcp_data.filter(function (row) {

                return selected[sel].includes(row[sel])
            })
        }
    }
    return rankings_pcp_data
}

function getFilteredData() {
    console.log("global ", global_rankings_data);
    rankings_data = global_rankings_data
 //   employees_data = global_emp_data
    for (const sel in selected) {
        if (selected[sel].length !== 0) {
            rankings_data = rankings_data.filter(function (row) {

                return selected[sel].includes(row[sel])
            })
        }
    }
    return rankings_data
}

function barchartlistener(univname) {

    console.log("univ name", univname);

    if (selected['name'].includes(univname)) {
        let ind = selected['name'].indexOf(univname)
        selected['name'].splice(ind, 1)
    } else {
        selected['name'].push(univname)
    }

    rankings_pcp_data = getFilteredPCPData()

    rankings_pcp_data.columns = ranking_attrs

    rankings_data = getFilteredData()
   // employees_data = getFilteredData()
    continents = []
    teaching_score = []
    income_level = []

    for (const val of rankings_data) {
        continents.push(val['continent']);
        teaching_score.push(val['teaching_score']);
        income_level.push(val['industry_income_score']);
    }

    removecharts("barid")
    drawPieChart2()
    drawScatterPlot()
    drawgeomap1()
    drawpcp1()

}

function geomaplistener(id) {

   // console.log("id", id);

    if (selected['code_3'].includes(id)) {
        let ind = selected['code_3'].indexOf(id)
        selected['code_3'].splice(ind, 1)
    } else {
        selected['code_3'].push(id)
    }

    //console.log(selected)

    rankings_pcp_data = getFilteredPCPData()
    console.log("pcp data ",rankings_pcp_data)

    rankings_pcp_data.columns = ranking_attrs

    rankings_data = getFilteredData()

  //  console.log("rank data", rankings_data);

    pie_data1 = []
    pie_data2 = []
    mincomes = []
    joblevels = []
    ages = []
    continents = []
    teaching_score = []
    income_level = []
    university_name = []
    for (const val of rankings_data) {
        // pie_data1.push(val['Attrition'])
        // pie_data2.push(val['Gender'])
        // pie_data3.push(val['Department'])
        // mincomes.push(val['MonthlyIncome'])
        // ages.push(val['Age'])
       // joblevels.push(val['LevelofJob'])
        continents.push(val['continent']);
        teaching_score.push(val['teaching_score']);
        income_level.push(val['industry_income_score']);
        university_name.push(val['name']);

    }


    removecharts("geomap")
    drawbarchart1()
    drawPieChart2()
    drawScatterPlot()
    drawpcp1()

}

function piechartlistener1(sliceval, type) {
    console.log("hello")
    if (selected[type].includes(sliceval)) {
        let ind = selected[type].indexOf(sliceval)
        selected[type].splice(ind, 1)
    } else {
        selected[type].push(sliceval)
    }
    // selected[type].push(sliceval)
    pcp_data = getFilteredPCPData()

    pcp_data.columns = attrs

    employees_data = getFilteredData()

    pie_data1 = []
    pie_data2 = []
    mincomes = []
    joblevels = []
    ages = []
    for (const val of employees_data) {
        pie_data1.push(val['Attrition'])
        pie_data2.push(val['Gender'])
        mincomes.push(val['MonthlyIncome'])
        ages.push(val['Age'])
        joblevels.push(val['LevelofJob'])
    }

    removecharts("pieid1")
    drawPieChart2()
    drawScatterPlot()
    drawpcp()
    drawbarchart()
    drawgeomap()
    var json_data = getJsonData()
    drawSunBurst(json_data)
}

function piechartlistener2(sliceval, type) {

    console.log("sliceval ", sliceval, " type ", type);
    if (selected[type].includes(sliceval)) {
        let ind = selected[type].indexOf(sliceval)
        selected[type].splice(ind, 1)
    } else {
        selected[type].push(sliceval)
    }

    rankings_pcp_data = getFilteredPCPData()

    rankings_pcp_data.columns = ranking_attrs

    rankings_data = getFilteredData()

    teaching_score = []
    income_level = []
    university_name = []
    continents = []
    for (const val of rankings_data) {
        // pie_data1.push(val['Attrition'])
        // pie_data2.push(val['Gender'])
        // pie_data3.push(val['Department'])
        // mincomes.push(val['MonthlyIncome'])
        // ages.push(val['Age'])
       // joblevels.push(val['LevelofJob'])
        continents.push(val['continent']);
        teaching_score.push(val['teaching_score']);
        income_level.push(val['industry_income_score']);
        university_name.push(val['name']);

    }

    removecharts("pieid2")
   // drawPieChart2()
    drawScatterPlot()
    drawpcp1()
    drawbarchart1()
    drawgeomap1()


}

function sunburstlistener(sliceval, level) {

    if (level === '1') {
        // Handle later
        console.log("level" + level)
        removecharts("sunburst")
        drawPieChart1()
        drawPieChart2()
        drawScatterPlot()
        drawgeomap()
        drawpcp()
        drawbarchart()
        return;
    }

    switch (level) {
        case '2':
            type = 'Department';
            break;
        case '3':
            type = 'JobRole';
            break;
        default:
            type = 'Attrition'
    }

    sliceval = sliceval.slice(0, sliceval.length - 1)


    if (selected[type].includes(sliceval)) {
        let ind = selected[type].indexOf(sliceval)
        selected[type].splice(ind, 1)
    } else {
        selected[type].push(sliceval)
    }

    pcp_data = getFilteredPCPData()

    pcp_data.columns = attrs

    employees_data = getFilteredData()

    pie_data1 = []
    pie_data2 = []
    mincomes = []
    joblevels = []
    ages = []
    for (const val of employees_data) {
        pie_data1.push(val['Attrition'])
        pie_data2.push(val['Gender'])
        mincomes.push(val['MonthlyIncome'])
        ages.push(val['Age'])
        joblevels.push(val['LevelofJob'])
    }

    removecharts("sunburst")
    drawPieChart1()
    drawPieChart2()
    drawScatterPlot()
    drawpcp()
    drawbarchart()
    drawgeomap()


}

function scatterPlotListener(teachscores) {
    console.log("brushed data ", teachscores);
    var sliced_data = []
    for (const score of teachscores) {
        sliced_data.push(score.x)
        selected['teaching_score'].push(score.x.toString());
        selected['industry_income_score'].push(score.y.toString());
    }

    rankings_pcp_data = getFilteredPCPData()

    rankings_pcp_data.columns = ranking_attrs

    rankings_data = getFilteredData()

    teaching_score = []
    income_level = []
    university_name = []
    continents = []
    for (const val of rankings_data) {
        // pie_data1.push(val['Attrition'])
        // pie_data2.push(val['Gender'])
        // pie_data3.push(val['Department'])
        // mincomes.push(val['MonthlyIncome'])
        // ages.push(val['Age'])
       // joblevels.push(val['LevelofJob'])
        continents.push(val['continent']);
        teaching_score.push(val['teaching_score']);
        income_level.push(val['industry_income_score']);
        university_name.push(val['name']);

    }

    removecharts("scatterid")
    drawPieChart2()
    drawpcp1()
    drawbarchart1()
    drawgeomap1()
    drawScatterPlot()


}

function pcpListener(sliced_vals) {
    if (Object.keys(sliced_vals).length === 0)
        return;
    let len = employees_data.length
    console.log("sliced vals before filter", employees_data);
    for (const val in sliced_vals) {
        for (const s of sliced_vals[val]) {
            if (val === 'MonthlyIncome') {
                if (!selected[val].includes(+s)) {
                    selected[val].push(+s)
                }
            } else {
                if (!selected[val].includes(s)) {
                    selected[val].push(s)
                }
            }
        }
    }
    pcp_data = getFilteredPCPData()

    pcp_data.columns = attrs

    employees_data = getFilteredData()


    if (len === employees_data.length)
        return;
    pie_data1 = []
    pie_data2 = []
    pie_data3 = []
    mincomes = []
    ages = []
    joblevels = []
    continents = []
    teaching_score = []
    income_level = []
    university_name = []
    for (const val of rankings_data) {
        // pie_data1.push(val['Attrition'])
        // pie_data2.push(val['Gender'])
        // pie_data3.push(val['Department'])
        // mincomes.push(val['MonthlyIncome'])
        // ages.push(val['Age'])
       // joblevels.push(val['LevelofJob'])
        continents.push(val['continent']);
        teaching_score.push(val['teaching_score']);
        income_level.push(val['industry_income_score']);
        university_name.push(val['name']);

    }
    removecharts("pcpid")
    drawPieChart1()
    drawPieChart2()
    drawScatterPlot()
    drawbarchart()
    drawgeomap()
    var json_data = getJsonData()
    drawSunBurst(json_data)
}


function drawpcp() {
    pcp(pcp_labels, pcp_data)
}

function drawpcp1() {

    pcp(ranking_pcp_labels, rankings_pcp_data)
}

function drawbarchart() {
    plotBarChart(joblevels)
}
function drawbarchart1() {
    const firstFive = university_name.slice(0, 5);
    plotBarChart(firstFive)
}

function drawPieChart1() {
    var data1 = {}, data2 = {}, data3 = {};
    for (var i = 0; i < pie_data1.length; i++) {
        data1[pie_data1[i]] = data1[pie_data1[i]] ? data1[pie_data1[i]] + 1 : 1;
    }
    plotPieChart1(data1, "Attrition");
}

function drawPieChart2() {
    var data1 = {}, data2 = {}, data3 = {};
    for (var i = 0; i < continents.length; i++) {
        data2[continents[i]] = data2[continents[i]] ? data2[continents[i]] + 1 : 1;
    }
    plotPieChart2(data2, "continent");
}

function drawScatterPlot() {
    var data = []



    for (var i = 0; i < teaching_score.length; i++) {

        data[i] = {x: parseFloat(teaching_score[i]), y: parseFloat(income_level[i])}
    }

    console.log("scatter data", data);


    plotScatterplot(data)
}

function getMapData() {
    var avgIncomes = {}, nums = {};
    for (const row of employees_data) {
        if (avgIncomes[row["State"]] === undefined) {
            avgIncomes[row["State"]] = parseInt(row["MonthlyIncome"])
            nums[row["State"]] = 1
        } else {
            avgIncomes[row["State"]] += parseInt(row["MonthlyIncome"])
            nums[row["State"]] += 1
        }
    }
    var res = []
    for (let x in avgIncomes) {
        res.push({state: x, value: avgIncomes[x] / nums[x]})
        avgIncomes[x] = avgIncomes[x] / nums[x];
    }

    return res;
}

// function getrankingsMapData() {
//     var avgscores = {}, nums = {};
//     for (const row of rankings_data) {
//         if (avgscores[row["country"]] === undefined) {
//             avgscores[row["country"]] = parseInt(row["overall_score"])
//             nums[row["country"]] = 1
//         } else {
//             avgscores[row["country"]] += parseInt(row["overall_score"])
//             nums[row["country"]] += 1
//         }
//     }
//     var res = []
//     for (let x in avgscores) {
//         res.push({country: x, value: avgscores[x] / nums[x]})
//         avgscores[x] = avgscores[x] / nums[x];
//     }
//
//     return res;
// }

function getrankingsMapData() {
    var avgscores = {}, nums = {};
    for (const row of rankings_data) {
        if (avgscores[row["code_3"]] === undefined) {
            avgscores[row["code_3"]] = parseInt(row["overall_score"])
            nums[row["code_3"]] = 1
        } else {
            avgscores[row["code_3"]] += parseInt(row["overall_score"])
            nums[row["code_3"]] += 1
        }
    }
    var res = []
    for (let x in avgscores) {
        res.push({code_3: x, value: avgscores[x] / nums[x]})
        avgscores[x] = avgscores[x] / nums[x];
    }

    return res;
}


function drawgeomap() {
    res_data = getMapData()
    geomapplot(res_data)
}

function drawgeomap1() {
    var res_data1 = getrankingsMapData()
    geomapplot(res_data1)
}




