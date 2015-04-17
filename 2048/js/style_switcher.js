function changeFavicon(href) {
	var el = document.getElementById('favicon');
	el.href = href;
	el.id = 'favicon'
}

var modeStates = {};
var modes = [];
function toggleClass(c) {
	if(!modeStates[c]) {
		if(typeof modeStates[c] === 'undefined') modes.push(c);
		modeStates[c] = true;
		changeFavicon('night-favicon.ico');
	} else {
		modeStates[c] = false;
		changeFavicon('favicon.ico');
	}
	var elements = document.getElementsByTagName('*');
	var regExpString = '';
	for(var i = 0; i < c.length; i ++) {
		if(i < c.length - 1) {
			regExpString += c.substr(i, 1) + '+';
			continue;
		}
		regExpString += c.substr(i, 1);
	}
	var classMatcher = new RegExp(regExpString, 'm');
	for(var i = 0; i < elements.length; i ++) {
		var el = elements[i];
		var className = el.className;
		var ind = className.indexOf(c);
		if(ind !== -1) {
			className = className.replace(classMatcher, '');
		} 
		if(modeStates[c]) {
			className += ' ' + c;
		}
		className.trim();
		el.className = className;
	}
}

function addClasses(el) {
	var className = el.className;
	for(var i = 0; i < modes.length; i ++) {
		if(modeStates[modes[i]]) className += ' ' + modes[i];
	}
	className.trim();
	el.className = className;
}

/*var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function (mutation) {
      for(var i = 0; i < mutation.addedNodes.length; i ++) {
		  for(var n = 0; n < modes.length; n ++) {
			  if(modeStates[modes[n]]) mutation.addedNodes[i].className += ' ' + modes[n];
		  }
	  }
    }); 
});

var target = document.getElementsByClassName('game-container')[0];

observer.observe(target, { childList:true, subtree:true });*/