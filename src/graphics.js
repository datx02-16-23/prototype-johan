
/////////////////////////////////////////////////
// locals
/////////////////////////////////////////////////
var svg   = null;
var keyfunc  = function(d) { return d.value; }

var rWidth  = 64,
    rHeight = 64;

var width   = 960,
    height  = 200;
/////////////////////////////////////////////////
// setupEnter - 
//    setup entering data, create
//    rectangle with text containing value
/////////////////////////////////////////////////
function setupEnter(selection) {
  selection
    .append("rect")
    .attr("width", rWidth)
    .attr("height", rHeight);

  selection
    .append("text")
    .attr("x", rWidth / 2)
    .attr("dx", "-.35em")
    .attr("y", rHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });
}

// Initial setup of data
function setup(data) {
  svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  var group = svg.selectAll("g").data(data, keyfunc);

  var groups = group.enter().append("g")
    .attr("transform", function(d, i) {
      return "translate (" + i * (rWidth + 1) + ",0)";
    });

  setupEnter(group); 
}

function update(data, time) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var groups = svg.selectAll("g").data(data, keyfunc);

  // UPDATE
  // Update old elements as needed.
  groups.attr("class", "update")
  groups.each(function(d) {
    var obj = d3.select(this);
    if (d.swap) {
      obj.select("rect")
        .attr("y", 100)
        .style("fill", "green");
      obj.select("text")
        .attr("y", 132);
    } else {
      obj.select("rect")
        .style("fill", "steelblue");
    }
  })
  // groups.select("rect").style("fill", function(d) {
  //   if (d.swap) {
  //     return "green";
  //   } else {
  //     return "steelblue";
  //   }
  // });

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
  groups.select("rect")
    .transition().duration(time)
    .attr("y", 0);

  groups.select("text")
    .transition().duration(time)
    .attr("y", rHeight/2);

  groups.attr("class", "none");

  // EXIT
  // Remove old elements as needed.
  groups.exit().remove();
}