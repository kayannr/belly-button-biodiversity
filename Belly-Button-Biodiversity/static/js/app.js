// BELLY BUTTON BIODIVERSITY - Plotly.js

// ****************************************************
// BUILD CHARTS
// ****************************************************
function buildCharts(sampleID){
// 1. Use the D3 library to read in samples.json. 
    d3.json("samples.json").then((data) => {
        // console.log(data); 
        // ****************************************************
        // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
            // Use sample_values as the values for the bar chart.
            // Use otu_ids as the labels for the bar chart.
            // Use otu_labels as the hovertext for the chart.
            // Use slice() to grab the top 10 sample_values
        // ****************************************************
        // var otuIds = data.samples[0].otu_ids;
        // console.log(`OTU IDs: ${otuIds}`);
        // var otuLabels = data.samples[0].otu_labels.slice(0,10);
        // console.log(`OTU Labels: ${otuLabels}`); 
        // var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
        // console.log(`Sample Values: ${sampleValues}`); 
        // // Top 10 
        // var otu_top10 = (data.samples[0].otu_ids.slice(0, 10)).reverse();
        // console.log(`Top 10 OTU: ${otu_top10}`); 
        // // Change OTU IDs for the bar chart
        // var otu_ids = otu_top10.map(id => "OTU " + id); 
        // console.log(`Top 10 OTU IDs: ${otu_ids}`); 


        // Filter the data using sampleID entered by the user 
        var filteredSample = data.samples.filter(info => info.id===sampleID)[0]; 
        console.log(`Filtered Sample: ${filteredSample}`);

        var filteredOTUIds =  filteredSample.otu_ids;
        console.log(`Filtered OTU IDs: ${filteredOTUIds}`);
        var filtedSampleValues = filteredSample.sample_values;
        console.log(`Filtered Sample Values: ${filtedSampleValues}`);
        var filtedOTULabels = filteredSample.otu_labels.slice(0,10);
        console.log(`Filtered OTU Labels: ${filtedOTULabels}`);

        // Filtered Sample Top 10 OTU
        var filteredOTU_top10 = (filteredOTUIds.slice(0, 10)).reverse();
        console.log(`Filtered Top 10 OTU: ${filteredOTU_top10}`); 

        // Change OTU IDs for the bar chart
        var otu_ids = filteredOTU_top10.map(id => "OTU " + id); 
        console.log(`Filtered Top 10 OTU IDs: ${otu_ids}`); 

        var barTrace= {
            x: filtedSampleValues.slice(0,10).reverse(),
            y: otu_ids,
            // text: labels,
            hovertext: filtedOTULabels,
            hoverinfo: "hovertext",
            // marker: {color: 'salmon'},
            marker:{
                color: ['indigo', 'turquoise', 'lightcoral', 'deepskyblue', 'orange', 
                        'lightgreen', 'crimson', 'purple', 'salmon', 'plum']
            },
            type: "bar",
            orientation: "h",
        }
        var barData = [barTrace]; 
        var barLayout = {
            title: "Top 10 Operational Taxonomic Unit (OTU)", 
            // showlegend: true,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 25
            },
            xaxis: {tickfont: {
                size: 10,
                color: 'rgb(107, 107, 107)'
              }},
            yaxis: {
              title: 'OTU ID',
              titlefont: {
                size: 14,
                color: 'rgb(107, 107, 107)'
              },
              tickfont: {
                size: 10,
                color: 'rgb(107, 107, 107)'
              },
              tickmode:"linear",
            }
        }
        Plotly.newPlot("bar", barData, barLayout);

        // ****************************************************
        // 3. Create a bubble chart that displays each sample.
                // Use otu_ids for the x values.
                // Use sample_values for the y values.
                // Use sample_values for the marker size.
                // Use otu_ids for the marker colors.
                // Use otu_labels for the text values.
        // ****************************************************     
        var bubbleTrace = {
            x: filteredOTUIds,
            y: filtedSampleValues,
            mode: "markers",
            marker: {
                color: filteredOTUIds,
                size: filtedSampleValues
            },
            text: data.samples[0].otu_labels
        }; 
        var bubbleData = [bubbleTrace];
        var bubbleLayout = {
            xaxis:{title: "OTU ID"},
                height: 600,
                width: 1500
        } 
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}; 

// ****************************************************   
//  BONUS: GAUGE CHART - WEEKLY WASHING FREQUENCY
// ****************************************************  
function buildGauge (wfreq){
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number", 
            gauge: {
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
                steps: [
                    { range: [0, 2], color: "honeydew" },
                    { range: [2, 4], color: "mintcream" },
                    { range: [4, 6], color: "aliceblue" },
                    { range: [6, 8], color: "azure" },
                    { range: [8, 10], color: "lightcyan" }
                  ],
                bar: { color: "deepskyblue" }

            }
        }
    ];
    
    var layout = { width: 500, height: 450, margin: { t: 0, b: 0 }, color: 'deepskyblue' };
    Plotly.newPlot('gauge', data, layout);
}; 

// ****************************************************   
//  METADATA FOR DEMOGRAPHICS INFO PANEL
// ****************************************************  
function getMetadata(sampleID){  
    // Read samples.json using d3
    d3.json("samples.json").then((data)=>{
        var metaData = data.metadata;
        // console.log(`Metadata: ${metaData}`);

        // Filter metaData by Id 
        var filterResult = metaData.filter(info => info.id.toString() ===sampleID)[0]; 
        console.log(`Filtered Metadata: ${filterResult}`);

        // washing freq
        var freq = filterResult.wfreq;
        console.log(`Washing Frequency: ${freq}`);
        // Call build gauge function and pass freq
        buildGauge(freq);

        // select demographic panel to display metaData filter result
        var demographicInfo = d3.select("#sample-metadata");

        // Clear demographic info panel each time before getting new id info
        demographicInfo.html("");

        // Retrieve the necessary demographic data for the id and append the info to the panel
        Object.entries(filterResult).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
        console.log(`Selected Demographics Info: ${demographicInfo}`);
    });
}; 

// ****************************************************   
//  INITIAL DATA RENDERING
// ****************************************************    
function init() {
    // Use D3 to select the Dropdown Menu
    var dropdownMenu = d3.select("#selDataset");

    // Read samples data
    d3.json("samples.json").then((data) => {
        // console.log(data);
        // Read the list of sample names from samples.json to populate the select options 
        data.names.forEach((sampleName) => {
                dropdownMenu.append("option")
                .text(sampleName)
                .property("value");
        });

        //functions calls to display data and plots
        const firstSample = data.names[0]; 
        buildCharts(firstSample);
        getMetadata(firstSample);
    });
}

// ****************************************************   
//  UPDATE PAGE INFO AND VISUALIZATIONS BASED ON CHANGE EVENT
// ****************************************************  
function optionChanged(newId) {
    buildCharts(newId);
    getMetadata(newId);
}
  
// Initialize the Dashboard
init(); 

