var PopupManager = function(gameManager) {
	this.gameManager = gameManager;
	this.popups = {
		overlay:document.getElementById("overlay"),
		confirm:document.getElementById("confirm"),
		prompt:document.getElementById("prompt"),
		load:document.getElementById("load-popup"),
		saveAs:document.getElementById("save-as"),
		loadKey:document.getElementById("load-key"),
		active:null
	};
	toggleClass("hidden",
		[this.popups.confirm,
		this.popups.prompt,
		this.popups.overlay,
		this.popups.load]);
		
	this.terminators = {
		alert:(function(result) {
			popups.result = true;
		}).bind(this),
		confirm:(function(result) {
			if(result) this.gameManager.restart();
		}).bind(this),
		prompt:(function(result) {
			if(result) this.gameManager.storageManager.addBookmark(
							this.popups.saveAs.value,
							this.gameManager.storageManager.getGameState());
			this.popups.saveAs.value = "";
		}).bind(this),
		"load-popup":(function(result) {
			if(result) {
				this.gameManager.setState(
						this.gameManager.storageManager.loadBookmark(this.popups.loadKey.value));
			};
		}).bind(this)
	};
	
	this.popups.saveAs.value = "";
	this.popups.loadKey.value = "";
	
	var yes = this.popups.overlay.getElementsByClassName("yes");
	for(var i = 0; i < yes.length; i ++) {
		yes[i].addEventListener("click", (function(event) {
			if(!hasClass(event.target, "no-click")) this.terminate(true);
		}).bind(this));
	};
	var no = this.popups.overlay.getElementsByClassName("no");
	for(var i = 0; i < no.length; i ++) {
		no[i].addEventListener("click", (function() {
			this.terminate(false);
		}).bind(this));
	}
	toggleClass("no-click", this.popups.prompt.getElementsByClassName("yes")[0]);
	this.popups.saveAs.addEventListener("input", (function() {
		var yesButton = this.popups.prompt.getElementsByClassName("yes")[0];
		var noClick = hasClass(yesButton, "no-click");
		if(this.popups.saveAs.value.length > 0 && noClick) {
			toggleClass("no-click", yesButton);
		} else if(this.popups.saveAs.value.length === 0 && !noClick) {
			toggleClass("no-click", yesButton);
		}
	}).bind(this));
	this.popups.loadKey.addEventListener("input", (function() {
		var yesButton = this.popups.load.getElementsByClassName("yes")[0];
		var noClick = hasClass(yesButton, "no-click");
		if(this.gameManager.storageManager.bookmarkKeys.indexOf(this.popups.loadKey.value) !== -1 && noClick) {
			toggleClass("no-click", yesButton);
		} else if(!noClick) {
			toggleClass("no-click", yesButton);
		}
	}).bind(this));
};

PopupManager.prototype.activate = function(type) {
	this.popups.active = this.popups[type];
	if(type === "prompt") this.popups.saveAs.focus();
	var el = this.popups.active;
	toggleClass("hidden", [el, this.popups.overlay]);
};

PopupManager.prototype.terminate = function(result) {
	toggleClass("hidden", [this.popups.overlay, this.popups.active]);
	this.terminators[this.popups.active.id](result);
	this.popups.active = null;
};
