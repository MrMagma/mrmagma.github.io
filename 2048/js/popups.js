var PopupManager = function(gameManager) {
	this.gameManager = gameManager;
	this.popups = {
		overlay:document.getElementById("overlay"),
		alert:document.getElementById("alert"),
		confirm:document.getElementById("confirm"),
		prompt:document.getElementById("prompt"),
		answer:document.getElementById("answer"),
		active:null
	};
	toggleClass("hidden",
		[this.popups.alert,
		this.popups.confirm,
		this.popups.prompt,
		this.popups.overlay]);
		
	this.terminators = {
		alert:(function(result) {
			popups.result = true;
		}).bind(this),
		confirm:(function(result) {
			if(result) this.gameManager.restart();
		}).bind(this),
		prompt:(function(result) {
			if(result) popups.result = this.popups.answer.value;
		}).bind(this)
	};
	
	var yes = this.popups.overlay.getElementsByClassName("yes");
	for(var i = 0; i < yes.length; i ++) {
		yes[i].addEventListener("click", (function() {
			this.terminate(true);
		}).bind(this));
	};
	var no = this.popups.overlay.getElementsByClassName("no");
	for(var i = 0; i < no.length; i ++) {
		no[i].addEventListener("click", (function() {
			this.terminate(false);
		}).bind(this));
	}
};

PopupManager.prototype.activate = function(type) {
	this.popups.active = this.popups[type];
	var el = this.popups.active;
	toggleClass("hidden", [el, this.popups.overlay]);
};

PopupManager.prototype.terminate = function(result) {
	toggleClass("hidden", [this.popups.overlay]);
	this.terminators[this.popups.active.id](result);
	this.popups.active = null;
};
