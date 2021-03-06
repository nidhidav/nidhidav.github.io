/* ---------------------------------------------------------------------
Nitya Davarapalli
CSE 163
Peru.js
Referenced:

Previous Project
https://sureshlodha.github.io/CMPS165_Winter15_FinalProjects/MapOfGods/

Click-To-Zoom
https://bl.ocks.org/mbostock/2206590

Different Shapes
https://bl.ocks.org/denisemauldin/1cacff932f3868aad2d7815384a0a6fa

Add Link to Objects
http://bl.ocks.org/d3noob/8150631

Additions:
Look of Map, Format of tooltips, Click to Zoom, Different Shapes, Hover over Boundary Lines, Added Reference to Link
----------------------------------------------------------------------*/ 

/*jslint browser: true*/
/*global d3*/

// Width and height
var width = document.getElementById('container').offsetWidth-60,
    height = 500,
    centered;

// Use the geoMercator to visualize the projection.
var projection = d3.geoMercator()
    .center([0,35])
    .scale((width) / 1.9 / Math.PI)
    .translate([width / 2, height / 1.9]);

// Will be used to create the path
var path = d3.geoPath().projection(projection);

// Creates zoom variable for later pan/zoom functionality
var zoom = d3.zoom().scaleExtent([1,8]).on("zoom", zoomed);

// Create the canvas
var svg = d3.select("#container")
	        .append("svg")
	        .attr("width", width)
	        .attr("height", height)
            .append("g");

// Create secondary layer to canvas SVG
var g = svg.append("g");

// Create tooltip to be used for information on shapes and countries
var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

// Call zoom and further functions
svg.call(zoom);

//Function to zoom and transform the page
function zoomed() {
  console.log('zoom');
  // Transform all the attributes that are attached to the var g
  g.attr("transform", d3.event.transform);
}

d3.select(self.frameElement).style("height", height + "px");

//Parse the data
//Data will be graabed from countries.geo.json and Map_of_Gods.csv
//Below code was supplemented from LA v SF group	
d3.json("countries.geo.json").then(function(json) {
        console.log(json);
    
        d3.csv("Map_of_the_Gods.csv").then(function(data){
            console.log(data);

        // Go through each element of the csv
		for (var i = 0; i < data.length; i++) {
			// Get data for csv element
        	var csvName = data[i].name;
        	var csvCulture = data[i].culture;
            var csvLocation = data[i].location;
            var csvGender = data[i].gender;
            var csvSpecies  = data[i].species;
            var csvType = data[i].type;
            var csvWikiLink = data[i].linkwik;
            var csvGCLink = data[i].linkgc;
            var csvPicture = data[i].picture;
        	// Go through each element of the json looking for a country
        	//		to match the country of the csv.
			for (var j = 0; j < json.features.length; j++) {
				var jsonCountry = json.features[j].properties.name;
                //console.log(jsonCountry);
                //console.log(j);
				if (csvLocation == jsonCountry) {
					// Assign the color retrieved from the csv to the
					// 		matching json element.
					json.features[j].properties.Name = csvName;
                    json.features[j].properties.Culture = csvCulture;
                    json.features[j].properties.Location = csvLocation;
                    json.features[j].properties.Gender = csvGender;
                    json.features[j].properties.Species = csvSpecies;
                    json.features[j].properties.Type = csvType;
                    json.features[j].properties.WikiLink = csvWikiLink;
                    json.features[j].properties.GCLink = csvGCLink;
                    json.features[j].properties.Picture = csvPicture;
					break;
                }//if(csvLocation == jsonCountry
            }//for loop
        }//outer for loop
       
        //This moves all the paths to the svg/g canvas
        //Color scheme for initial countries is from GodChecker.com
        g.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
            
         // When a region is clicked on, call the clicked function to zoom in to the region. 
         .on("click", clicked)
            
         // set the boundary color in between countries
         .attr("id", "boundary")
        
         // set the colors for the regions
         .style("fill", function(d) {
            var country = d.properties.Location;

            // const list_of_countries = ["Mexico", "The Bahamas", "Chile", "Argentina", "Brazil", "Nigeria", "Colombia", "Egypt", "Costa Rica", "Cuba", "Canada", "United States of America", "China", "Cyprus", "India", "Iraq", "Japan", "Pakistan", "Syria", "Vietnam", "Yemen", "South Africa", "Peru"];
            // for (let i = 0; i < list_of_countries.length; i++) {
            //     if(country == list_of_countries[i]) {
            //         return "#035AA6";
            //     }
            // }

            if(country === "Mexico") {
                   return "#ffccd5";}//purple  
            if(country === "The Bahamas") {
                   return "#c9184a";}//aqua
            if(country === "Chile") {
                   return "#ffe6f6";}//red
            if(country === "Brazil") {
                   return "#c9184a";}//green        
            if(country === "Nigeria") {
                   return "#ff8fa3";}//light brown
            if(country === "Colombia") {
                   return "#ff8fa3";}//green yellow
            if(country === "Egypt") {
                   return "#ff8fa3";}//salmony
            if(country === "Costa Rica") {
                   return "#ff8fa3";}//bluegrey
            if(country === "Cuba") {
                   return "#ff8fa3";}
            if(country === "Canada") {
                   return "#a4133c";}
            if(country === "Mexico") {
                   return "#ff5050";}
            if(country === "United States of America") {
                    return "#c9184a";}
            if(country === "China") {
                    return "#ff758f";}
            if(country === "Cyprus") {
                    return "#800f2f";}
            if(country === "India") {
                    return "fff0f3";}
            if(country === "Iraq") {
                    return "#ff4d6d";}
            if(country === "Japan") {
                    return "#a4133c";}
            if(country === "Pakistan") {
                    return "#ffccd5";}
            if(country === "Syria") {
                    return "#ff4d6d";}
            if(country === "Vietnam") {
                    return "#ffccd5";}
            if(country === "Yemen") {
                    return "#fff0f3";}
            if(country === "South Africa") {
                return "#ff4d6d";}
            if(country == "Argentina") {
                return "#a4133c";}
            if(country == "Peru") {
                return "#ff4d6d";}
            if(country == "Israel") {
                return "#800f2f";}
            else {
                // light grey 
//                return "#D3D3D3";}
                return "rgb(213,222,217)";}
        })//This is for the style attribute for the path
        // Add a tooltip to show the name of the country.
        .on('mouseover', function(d) {
            tooltip.transition()
                   .duration(100)
                   .style("background", "black")
                   .style("opacity", ".9");
            // Format the tooltip
            tooltip.html("Country: " + d.properties.name)
                   .style("left", (d3.event.pageX ) + "px")
                   .style("top", (d3.event.pageY) + "px")})
            // Deactivate the tooltip
           .on("mouseout", function(d) {
             tooltip.transition()
               .duration(500)
               .style("opacity", 0);
           });  
            
            
     // Separate data into shapes based on gender
     // Square for Female
     // Circle for Male
     g.selectAll(".shapes")
			.data(data)
			.enter()
            
            // Add Wikipedia Link to circle or square object
            // When the object is clicked, the user will be taken to the corresponding Wikipedia page.
            .append("a")
            .attr("href", function(d) {return d.linkwik;})
            
            // Assign shape to corresponding gender.
            // document.createElementNS() allows the user to create an element. The link is an XML namespace and the string specifies the type of element to be created.
			.append(function(d){
                 console.log(d);
                 if (d.gender === "Female") {
                 return document.createElementNS('http://www.w3.org/2000/svg', "rect");
                 } else {
                   return document.createElementNS('http://www.w3.org/2000/svg', "circle");
                 }
      })
      .attr("class", "shapes")
            
     // Create all of the circles 
        g.selectAll("circle")
         .attr("class", "circle")
         .attr("cx", function(d) {
                return projection([d.lon,d.lat])[0];})
          .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];})
          .attr("r", 2)
         // Add tooltip so that it appears over mouseover on the circle
         .on('mouseover', function(d) {
            tooltip.transition()
                   .duration(100)
                   .style("fill", "black")
                   .style("opacity", ".9");
            // Format the tooltip
            tooltip.html(
             "<table>" 
             + "<tr>" + "<td style= 'text-align:left;'> Group </td>" 
                      + "<td style= 'text-align:center;'>:</td>" + 
                      "<td style= 'text-align:left;'>" + d.name + "</td>" 
             + "</tr>" 
             + "<tr>" + "<td style= 'text-align:left;'>" + "BRCA1" + "</td>" 
                      + "<td style= 'text-align:center;'>" + ":" +  "</td>" + 
                      "<td style= 'text-align:left;'>" + d.type + "</td>" 
             + "</tr>" 
              + "<tr>" + "<td style= 'text-align:left;'>" + "BRCA2" + "</td>" 
                      + "<td style= 'text-align:center;'>" + ":" +  "</td>" + 
                      "<td style= 'text-align:left;'>" + d.culture + "</td>" 
             + "</tr>" 
             //+ "<tr>" + "<td style= 'text-align:left;'>" + "Gender" + "</td>" 
            //          + "<td style= 'text-align:center;'>" + ":" +  "</td>" + 
              //        "<td style= 'text-align:right;'>" + d.gender + "</td>" 
             + "</tr>" 
             + "</table>")
                   .style("left", (d3.event.pageX ) + "px")
                   .style("top", (d3.event.pageY) + "px")})
            // Deactivate the tooltip
           .on("mouseout", function(d) {
             tooltip.transition()
               .duration(500)
               .style("opacity", 0);
           });
            
        // Create all of the Squares
        g.selectAll("rect")
         .attr("class", "rect")
         .attr("x", function(d) {
                return projection([d.lon,d.lat])[0];})
          .attr("y", function(d) {
                return projection([d.lon, d.lat])[1];})
          .attr("width", "4")
          .attr("height", "4")
            
         // Add tooltip so that it appears over mouseover on the circle
         .on('mouseover', function(d) {
            tooltip.transition()
                   .duration(100)
                   .style("fill", "black")
                   .style("opacity", ".9");
            // Format the tooltip
            tooltip.html(
             "<table>" 
             + "<tr>" + "<td style= 'text-align:left;'> Name </td>" 
                      + "<td style= 'text-align:center;'> : </td>" + 
                      "<td style= 'text-align:right;'>" + d.name + "</td>" 
             + "</tr>" 
             + "<tr>" + "<td style= 'text-align:left;'>" + "Type" + "</td>" 
                      + "<td style= 'text-align:center;'>" + ":" +  "</td>" + 
                      "<td style= 'text-align:right;'>" + d.type + "</td>" 
             + "</tr>" 
              + "<tr>" + "<td style= 'text-align:left;'>" + "Culture" + "</td>" 
                      + "<td style= 'text-align:center;'>" + ":" +  "</td>" + 
                      "<td style= 'text-align:right;'>" + d.culture + "</td>" 
             + "</tr>" 
             + "<tr>" + "<td style= 'text-align:left;'>" + "Gender" + "</td>" 
                      + "<td style= 'text-align:center;'>" + ":" +  "</td>" + 
                      "<td style= 'text-align:right;'>" + d.gender + "</td>" 
             + "</tr>" 
             + "</table>")
            
                   .style("left", (d3.event.pageX ) + "px")
                   .style("top", (d3.event.pageY) + "px")})
            // Deactivate the tooltip
           .on("mouseout", function(d) {
             tooltip.transition()
               .duration(500)
               .style("opacity", 0);
           });
            
    });//These bracets are for d3.csv line above
});//These brackets are for d3.json line


// Function to implement click-to-zoom via transform 
function clicked(d) {
  var x, y, k;

  // Check if map is centered on clicked point
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  // Scale Map
  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

// Legend for Cultures
 svg.append("rect")
        .attr("x", width-200)
        .attr("y", height-120)
        .attr("width", 200)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("opacity",0.5)
        .attr("height", 120)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-75)
        .style("fill", "#fff0f3");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-70)
        .style("text-anchor", "end")
        .text("25-34.1");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-75)
        .style("fill", "#ffccd5");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-70)
        .style("text-anchor", "end")
        .text("34.2-42.4");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-55)
        .style("fill", "#ffccd5");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-50)
        .style("text-anchor", "end")
        .text("42.3-50.8");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-55)
        .style("fill", "#ff4d6d");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-50)
        .style("text-anchor", "end")
        .text("50.9-59.2");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-35)
        .style("fill", "#ff4d6d");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-30)
        .style("text-anchor", "end")
        .text("59.3-67.5");

   svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-40)
        .attr("cy", height-35)
        .style("fill", "#a4133c");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -50)
        .attr("y", height-30)
        .style("text-anchor", "end")
        .text("67.5-77");

  svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-120)
        .attr("cy", height-15)
        .style("fill", "#a4133c");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -130)
        .attr("y", height-10)
        .style("text-anchor", "end")
        .text("77.1-85.3");



    svg.append("text")
        .attr("class", "label")
        .attr("x", width -100)
        .attr("y", height-90)
        .style("text-anchor", "middle")
        .style("fill", "black") 
        .attr("font-size", "20px")
        .text("ASR per 100,000"); 

// // Legend for Shapes
//  svg.append("rect")
//         .attr("x", width-1300)
//         .attr("y", height-100)
//         .attr("width", 125)
//         .attr("rx", 10)
//         .attr("ry", 10)
//         .style("opacity",0.5)
//         .attr("height", 100)
//         .attr("fill", "lightgrey")
//         .style("stroke-size", "1px");

//      svg.append("circle")
//             .attr("r", 5)
//             .attr("cx", width-1220)
//             .attr("cy", height-40)
//             .attr("fill", "#E8E4E1")
//             .attr("stroke", "black");
//      svg.append("text")
//             .attr("class", "label")
//             .attr("x", width -1240)
//             .attr("y", height-35)
//             .style("text-anchor", "end")
//             .text("Male");

//     svg.append("rect")
//             .attr("x", width-1225)
//             .attr("y", height-15)
//             .attr("width", 9)
//             .attr("height", 9)
//             .attr("fill", "#484848")
//             .attr("troke", "black");
//      svg.append("text")
//             .attr("class", "label")
//             .attr("x", width -1240)
//             .attr("y", height-10)
//             .style("text-anchor", "end")
//             .text("Female");

//      svg.append("text")
//             .attr("class", "label")
//             .attr("x", width -1235)
//             .attr("y", height-60)
//             .style("text-anchor", "middle")
//             .style("fill", "black") 
//             .attr("font-size", "18px")
//             .text("Gender"); 

