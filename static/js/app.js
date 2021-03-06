function buildCharts(sample) {
d3.json("samples.json").then(function(data) {
  console.log(data);


// Call updatePlotly() when a change takes place to the DOM
//d3.selectAll("#selDataset").on("change", updatePlotly);
d3.select("#selDataset").on("change", updatePlotly);
var data = [];
var vardata = [];

d3.json("samples.json").then((importedData) => {
  data = importedData
  vardata = data.samples.filter(val => val.id == "940");
  console.log(vardata);
  init();

///Filter data through drop downmenu 
// create dropdowns
  var id = data.samples.map(val => val.id);

  for (i = 0; i < id.length; i++) {
        var opt = document.createElement("option");
        document.getElementById("selDataset").innerHTML += '<option id="' + i + '">' + id[i] + '</option>';
      }  
  });

// Step1: Plotly 
function buildCharts(sample){
/// BAR CHART 
  // Use the D3 library to load in samples.json.
  d3.json("samples.json").then(function(data) {
    // slice first 10 objects for plots

    var sample_values = data.sample_values.slice(0,10).reverse;
    console.log(sample_values);
    var otu_labels = data.otu_labels.slice(0,10).reverse;
    console.log(otu_labels);
    var otu_ids = data.otu_ids.slice(0,10).reverse;
    console.log(otu_ids);

    var data = [{
      values: sample_values,
      labels: otu_ids,
      hovertext: otu_labels,
      type: 'bar',
      orientation: "h"
    }];

    var layout = {
      title: "Top 10 OTUs Bar Chart",
      height: 400,
      width: 500
    };

    Plotly.newPlot('bar-plot', data, layout);
  }
  )}
    });
    
    /////////////////////////////
    /// CREATE BUBBLE CHART ////
    //////*****************//// 
    var bubble = d3.select("#bubble");

    var trace1 = {
      x: data.otd_ids,
      y: data.sample_values,
      mode: 'markers',
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }
    };
    var trace1 = [trace1];
    var layout = {
      showlegend: false,
      height: 600,
      width: 1500
    };

Plotly.newPlot('bubble', data, layout);

/////////////////////////////////////
/// CREATE DEMOGRAPHIC TABLE ////////
///////////////////////////////////////

var selection = d3.select("#sample-metadata").selectAll("div")
.data(sampleMeta);
// Populated the sample metadata information
selection.enter()
.append("div")
.merge(selection)
.html(function(d){
  return `<p>ID: ${d.id}</p>
        <p>Ethnicity: ${d.ethnicity}</p>
        <p>Gender: ${d.gender}</p>
        <p>Age: ${d.age}</p>
        <p>Location: ${d.location}</p>
        <p>bbtype: ${d.bbtype}</p>
        <p>wfreq: ${d.wfreq}</p>`
});
// Removed old data //
selection.exit().remove();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }

    // Initialize the dashboard//
    init()