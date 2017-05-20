// 1. Create a program that goes through each value in array x, where x is [3,5,'Dojo', 'rocks', {name: 'Michael', title: 'Sensei'}]. Have it display each value of the array as well as the type of each value. For example, it should say or log "3: 'number', 5: 'number', 'rocks': 'string', ...".
var x = [3,5,'Dojo', 'rocks', 'Michael', 'Sensei'];
for(var i = 0; i < x.length; i++) {
console.log(x[i]+': '+typeof(x[i]));
}


// 2. Add a new value in the array x using a push method. New value you should add is 100.
x.push(100);
console.log(x);


// 3. Add a new array as the last member of the array then log x in the console and analyze how x looks.
x.push(["hello", "world", "JavaScript is Fun"]);
console.log(x);


// 4. Create a simple for loop that sums all the numbers between 1 to 500. Have console log the final sum.
var sum = 0;
for (var i = 1; i <= 500; i++) {
    sum += i;
     }
console.log(sum);
//Write a loop that will go through the array [1, 5, 90, 25, -3, 0], find the minimum value, and then print it
function minVal(arr){
  for(var i=0; i<arr.length; i+=1){
    if (arr[i] < arr[i+1]) {
      var min = arr[i]
    }
  }
  return console.log(min)
}
var x = [1, 5, 90, 25, -3, 0]
minVal(x)

function avgVal(arr){}


//Write a loop that will go through the array [1, 5, 90, 25, -3, 0], find the average of all of the values, and then print it
function avgVal(arr){
  var sum = 0
  for(var i=0; i<arr.length; i+=1){
    sum += arr[i];
  }
  var avg = sum / arr.length
  return console.log(avg)
}
var x = [1, 5, 90, 25, -3, 0]
avgVal(x)

var newNinja = {

    name: 'Jessica',
    profession: 'coder',
    favorite_language: 'JavaScript',
    dojo: 'Dallas'

}

for (var key in newNinja) {

    console.log(key, ":", newNinja[key]);

}