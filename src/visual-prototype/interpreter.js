
function getName() {
  return "Insertion Sort";
}
/////////////////////////////////////////////////
// swap - 
//    returns vector with indices of swap
/////////////////////////////////////////////////
function swap(x, y, data) {
  var tmp = data[x];
  data[x] = data[y];
  data[y] = tmp;
  return [x,y];
}

/////////////////////////////////////////////////
// createSteps - 
//    returns the swaps preformed by sorting 
//    algorithm.
/////////////////////////////////////////////////
function createSteps(vector) {
  var stepsBuffer = [];
  var partition = 0;
  for (j = 0; j < vector.length; j++) {
    
    var x = vector[j];
    var k = j - 1;
    while (k >= 0 && x < vector[k]) {
      k--;
    }

    for (n = j; n > k + 1; n--) {
      stepsBuffer.push(swap(n,n-1,vector));
    }
  }
  return stepsBuffer;
}

/////////////////////////////////////////////////
// locals
/////////////////////////////////////////////////
var steps = [];
var data = null;
var i = 0;

/////////////////////////////////////////////////
// step - 
//    take one step of preformed algorithm
/////////////////////////////////////////////////
function step() {
  if ( i >= steps.length ) return;
  
  var i0 = steps[i][0];
  var i1 = steps[i][1];

  swap(i0, i1, data);

  data[i0].swap = true;
  data[i1].swap = true;

  update(data, 500);

  data[i0].swap = false;
  data[i1].swap = false;

  i++;
}

/////////////////////////////////////////////////
// back - 
//    take one step back in preformed algorithm
/////////////////////////////////////////////////
function back() {
  if ( i <= 0 ) return;
  
  i--;

  var i0 = steps[i][0];
  var i1 = steps[i][1];

  swap(i0, i1, data);

  data[i0].swap = true;
  data[i1].swap = true;

  update(data, 500);

  data[i0].swap = false;
  data[i1].swap = false;
}