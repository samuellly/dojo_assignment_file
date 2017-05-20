module.exports = function (){
	return {
		add: function(num1, num2) { 
			console.log("sum:", num1 + num2);
		},
		multiply: function(num1, num2) {
			console.log("product:", num1 * num2);
		},
		square: function(num) {
			console.log("square:", num * num);
		},
		random: function(min, max) {
			console.log("random number:", Math.floor(Math.random() * (max - min + 1) + min));
		}
	}
}();