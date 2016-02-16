
/////////////////////////////////////////////////
// locals
/////////////////////////////////////////////////
var svg   = null;
var keyfunc  = function(d,i) { return d.id; }

var rWidth  = 64,
    rHeight = 64;

var width   = 960,
    height  = 200;

var localData = null;
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

/////////////////////////////////////////////////
// setup- 
//    create group elements & attach to svg
/////////////////////////////////////////////////
function setup(data) {
  localData = data;
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

var current = "";

function change(groups) {

  var values = localData.map(function(d) {
    return d.value;
  });

  var e = document.getElementById("dropdown");
  var newCurrent = e.options[e.selectedIndex].text;
  if (newCurrent === current) return;
  else current = newCurrent;

  if (current === "Boxes") changeToBoxes(groups,values);
  else if (current === "Bars") changeToBars(groups,values);
}

function changeToBars(selection, values) {
  var x = d3.scale.linear().domain([0,d3.max(values)]).range([0,height]);

  selection.select("rect") 
    .transition().duration(500)
    .attr("height", function(d) {
      return x(d.value);
    });

  selection.select("text")
    .transition().duration(500)
    .attr("y", function(d) {
      return x(d.value) - 16;
    });
}

function changeToBoxes(selection, values) {
  selection.select("rect")
    .transition().duration(500)
    .attr("height", rHeight);

  selection.select("text")
    .transition().duration(500)
    .attr("y", rHeight / 2);
}

function moveRects(data) {
  if (!data.swap) {
    return;
  } else {
    var obj = d3.select(this);
    obj.select("rect")
      .attr("y", rHeight)
      .style("fill", "green");
    obj.select("text")
      .attr("y", rHeight + 32);
  }
}

function moveBars(data) {
  if (!data.swap) {
    return;
  } else {
    var obj = d3.select(this);
    obj.select("rect")
      .style("fill", "green");
  }
}

function update(data, time) {
  localData = data;

  // DATA JOIN
  // Join new data with old elements, if any.
  var groups = svg.selectAll("g").data(data, keyfunc);

  // UPDATE
  // Update old elements as needed.
  groups.attr("class", "update")

  // ENTER
  // Create new elements as needed.
  var enterSelection = groups.enter().append("g");
  enterSelection.attr("class", "enter");
  setupEnter(enterSelection);

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  var groupTr = groups.transition().duration(time/2);

  groupTr.attr("transform", function(d, i) {
      return "translate(" + i * 65 + ",0)";
    });

  change(groups);

  var rectTr = groups.select("rect").transition(time/2);
  var textTr = groups.select("text").transition(time/2);
  // Setup Animation
  if (current === "Boxes")
    groups.each(moveRects);
  else if (current === "Bars")
    groups.each(moveBars);

  // Execute Animation
  if (current === "Boxes") {
    rectTr
      .attr("y", 0)
      .style("fill", "steelblue");

    textTr
      .attr("y", rHeight/2);
  } else if (current === "Bars") {
    rectTr
      .style("fill", "steelblue");
  }

  // EXIT
  // Remove old elements as needed.
  groups.exit().remove();
}