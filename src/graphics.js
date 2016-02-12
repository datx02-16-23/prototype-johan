
// Globals
var svg   = null;
var keyf  = function(d) { return d.value; }

// Setup entering data
function setupEnter(selection) {
  selection
    .append("rect")
    .attr("width", 64)
    .attr("height", 64);

  selection
    .append("text")
    .attr("x", 32)
    .attr("dx", "-.35em")
    .attr("y", 32)
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });
}

// Initial setup of data
function setup(data) {
  var width = 960,
      height = 200;

  svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  var group = svg.selectAll("g").data(data, keyf);

  var groups = group.enter().append("g")
    .attr("transform", function(d, i) {
      return "translate (" + i * 65 + ",0)";
    });

  setupEnter(group); 
}

function update(data, time) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var groups = svg.selectAll("g").data(data, keyf);

  // UPDATE
  // Update old elements as needed.
  groups.attr("class", "update")
  groups.select("rect").style("fill", function(d) {
    if (d.swap) {
      return "green";
    } else {
      return "steelblue";
    }
  });

  // ENTER
  // Create new elements as needed.
  var enterSelection = groups.enter().append("g");
  enterSelection.attr("class", "enter");
  setupEnter(enterSelection);

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  groups
    .transition().duration(time)
    .attr("transform", function(d, i) {
      return "translate (" + i * 65 + ",0)";
    });
  groups.select("text")
    .text(function(d) { return d.value;});

  groups.attr("class", "none");

  // EXIT
  // Remove old elements as needed.
  groups.exit().remove();
}