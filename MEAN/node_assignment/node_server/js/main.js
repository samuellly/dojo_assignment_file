var $Dojo = (function(htmlId) {
	return function(htmlId) {
		var getHtmlId = document.getElementById(htmlId);
		return {
			hover: function(callback1, callback2) {
					getHtmlId.addEventListener('mouseover', function() {
					callback1(htmlId);
				});
					getHtmlId.addEventListener('mouseout', function() {
					callback2(htmlId);
				});
			}
		};
	};
})();

$Dojo('h1Id').hover(function(item) {
	var getP1 = document.getElementById('p1');
	getP1.innerHTML = 'The paragraph ' + item + ' was hovered over!';
}, function(item) {
	var getP1 = document.getElementById('p1');
	getP1.innerHTML = 'The paragraph ' + item + ' was hovered out!';
});