// Step1: Plotly 
/// BAR CHART 
  // Use the D3 library to load in samples.json.
  d3.json("samples.json").then(function(data) {

    var sample_values = data.sample_values;
    console.log(sample_values);
    var otu_labels = data.otu_labels;
    console.log(otu_labels);
    var otu_ids = data.otu_ids;
    console.log(otu_ids);

    var data = [{
      values: sample_values,
      labels: otu_ids,
      hovertext: otu_labels,
      type: 'bar'
    }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot('bar-plot', data, layout);

    });

