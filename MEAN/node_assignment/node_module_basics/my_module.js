module.exports = function() {
	return {
		greet: function() {
			console.log('We are testing a module')
		},

		add: function(num1, num2) {
			console.log("the sum is:", num1 + num2);
		}
	}
}

// module.exports = {
// 	greet: function() {
// 		console.log('We are testing a module')
// 	},

// 	add: function(num1, num2) {
// 		console.log("the sum is:", num1 + num2);
// 	}
// }