function toRadians(angle) {
  return angle * (Math.PI / 180);
}

var $rotator = $("#rotator");
var $rotatorTest = $("#rotator-test");
var planets = {
	$els: $(".planet"),
	sizeFrac: 1 / 7
};
planets.radians = toRadians(360 / planets.$els.length);



var updateRotator = (function updateRotator() {
	var rSize = Math.min($rotatorTest.width(), $rotatorTest.height());
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	$rotator.width(rSize);
	$rotator.height(rSize);
	$rotator.css("left", windowWidth / 2 - rSize / 2);
	$rotator.css("top", windowHeight / 2 - rSize / 2);
	planets.$els.width(rSize * planets.sizeFrac);
	planets.$els.height(rSize * planets.sizeFrac);

	planets.$els.each(function(index) {
		var $thisEl = $(this);
		var x = (rSize / 2 + Math.sin(planets.radians * index) * rSize / 2) - rSize * planets.sizeFrac / 2;
		var y = (rSize / 2 - Math.cos(planets.radians * index) * rSize / 2) - rSize * planets.sizeFrac / 2;
		$thisEl.css("left", x);
		$thisEl.css("top", y);
	});

	return updateRotator;
})();

var events = {
	resize: [updateRotator]
};

$(window).resize(function() {
	for (var i = 0; i < events.resize.length; i ++) {
		events.resize[i]();
	}
});