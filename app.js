// Function for Data plotting (Bar and bubble)
function showPlot(id) {

    // get data from json 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Getting the top 10 sample_values and reversing it
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
     
        // create trace variable for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
        // create layout variable to set plots layout
        var layout = {
            title: "Top OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 200,
                r: 50,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);
              
        // Bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var layout_bubble = {
            xaxis:{title: "OTU ID"},
            height: 700,
            width: 1100
        };
  
        // creating data variable 
        var data_bubble = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data_bubble, layout_bubble);     
    });
}

// function to display the demographic data
function showInfo(id) {

    // read the json
    d3.json("samples.json").then((data)=> {
        
        // get metadata info 
        var metadata = data.metadata;

        //console.log(metadata)

        // filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demo = d3.select("#sample-metadata");
        
        // clear the contents of the demographic info panel on a refresh
        demo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}


// Change event ahndler function
function optionChanged(id) {
    showPlot(id);
    showInfo(id);
}

// Initial display function
    
function start() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        //console.log(data)

        // Populate the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the 2 show functions to display the plots and demographic data on the html page
        showPlot(data.names[0]);
        showInfo(data.names[0]);
    });
}      

start();