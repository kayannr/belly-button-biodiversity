# Belly Button Biodiversity

https://kayannr.github.io/belly-button-biodiversity/Belly-Button-Biodiversity/index.html

## Background
An interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Plotly
 ![bar Chart](Belly-Button-Biodiversity/Images/1.png)
1.  `samples.json` is read using D3 library

2. A horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual is created. The following are used for the interactive bar chart: 

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.
