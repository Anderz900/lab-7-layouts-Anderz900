
let width = 400,
    height = 400;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


// 1) INITIALIZE FORCE-LAYOUT

// Load data
d3.json("data/airports.json")
.then(function(data) {
  let force = d3.forceSimulation(data.nodes)
  .force("charge", d3.forceManyBody().strength(-10))
  .force("link", d3.forceLink(data.links).distance(30))
  .force("center", d3.forceCenter().x(width/2).y(height/2));
  // 2a) DEFINE 'NODES' AND 'EDGES'

  let node = svg.selectAll(".node")
        .data(data.nodes)
  	    .enter().append("circle")
    		.attr("class", "node")
    		.attr("r", 5)
        .attr("fill", "green");
        
  let edges = svg.selectAll("line")
        .data(data.edges)
        .enter().append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);
  // 2b) START RUNNING THE SIMULATION

  // 3) DRAW THE LINKS (SVG LINE)

  // 4) DRAW THE NODES (SVG CIRCLE)

    node.call(d3.drag()
         .on("start", dragStarted)
         .on("drag", dragging)
         .on("end", dragEnded));
  // 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS

  force.on("tick", function(data) {
		
    // Update node coordinates
    
        node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    
        node.append("title")
        .text(function(d) { return d.name; });
       
    
    // Update edge coordinates
    edges.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; }); 
});
});