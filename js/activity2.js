
let width = 1000,
height = 600;



let svg = d3.select("#chart-area").append("svg")
.attr("width", width)
.attr("height", height);

d3.select('body').style('background', '#abcdef')

// Load data

// Load shapes of U.S. counties (TopoJSON)
Promise.all([d3.json('./data/airports.json'),d3.json('./data/world-110m.json')])
.then(function(data) {

	
let projection = d3.geoMercator()
	.translate([width/2, height/2])
	.center([0,0]);

let path = d3.geoPath().projection(projection);

let airportData = data[0];
let globeData = data[1];





	// Convert TopoJSON to GeoJSON (target object = 'states')
let globe = topojson.feature(globeData, globeData.objects.countries).features
	
	// Render the U.S. by using the path generator
svg.selectAll("path")
	.data(globe)
	.enter().append("path")
	.attr("d", path)
	.attr("fill", "#5548ff");


let node = svg.selectAll('.node')
	.data(airportData.nodes)
	.enter().append('circle')
	.attr('r', 5)
	.attr('class', 'node')
	.attr('fill', (d)=>{
		if(d.country === "United States"){return 'red'}
		else{ return 'purple'}})
	.attr('cy', function(d){return d.y})
	.attr('cx', function(d){return d.x})
	.attr("transform", function(d) {
		return "translate(" + projection([d.longitude, d.latitude]) + ")";
	})
	
node.on('hover', function(d){
	d.append("title")
	.text(d=>d.name)
	})


let an = airportData.nodes;

let connect = svg.selectAll('connect')
	.data(airportData.links)
	.enter().append('line')
	.attr('stroke', '#ddd')
	.attr('class', 'connect')
	.attr('x1', function(d){
		let source = d.source
		return projection([an[source].longitude, an[source].latitude])[0]
	})
	.attr('x2', function(d){
		let target = d.target
		return projection([an[target].longitude, an[target].latitude])[0]
	})
	.attr('y1', function(d){
		let source = d.source
		return projection([an[source].longitude, an[source].latitude])[1]
	})
	.attr('y2', function(d){
		let target = d.target
		return projection([an[target].longitude, an[target].latitude])[1]
	})
});


