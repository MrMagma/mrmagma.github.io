window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";
  this.bookmarksKey     = "bookmarks";
  this.bookmarks = {};
  this.bookmarkKeys = [];
  this.bookMarksLoaded = false;

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};

//Bookmark stuffs
LocalStorageManager.prototype.loadBookmarks = function() {
	if(!this.bookmarksLoaded) {
		var bookmarksJSON = this.storage.getItem(this.bookmarksKey);
		this.bookmarks = bookmarksJSON ? JSON.parse(bookmarksJSON) : {};
		for(var i in this.bookmarks) {
			this.bookmarkKeys.push(i);
		}
	}
	this.bookmarksLoaded = true;
};

LocalStorageManager.prototype.syncBookmarks = function() {
	this.storage.setItem(this.bookmarksKey, JSON.stringify(this.bookmarks));
};

LocalStorageManager.prototype.addBookmark = function(n, gameState) {
	this.bookmarks[n] = JSON.stringify(gameState);
	if(this.bookmarkKeys.indexOf(n) === -1) this.bookmarkKeys.push(n);
	this.syncBookmarks();
};

LocalStorageManager.prototype.loadBookmark = function(n) {
	return JSON.parse(this.bookmarks[n]);
};

LocalStorageManager.prototype.deleteBookmark = function(n) {
	delete this.bookmarks[n];
	this.bookmarkKeys.splice(this.bookmarkKeys.indexOf(n), 1);
	this.syncBookmarks();
};

/*
	this.storageManager.loadBookmarks();
	var bookmarkKeys = this.storageManager.bookmarkKeys;
	var test = document.getElementById("test");
	test.innerHTML = "SAVES<br>"
	for(var i = 0; i < bookmarkKeys.length; i ++) {
		var key = bookmarkKeys[i];
		var el = document.createElement("a");
		el.innerHTML = bookmarkKeys[i] + "<br>";
		el.onclick = (function() {
			this.storageManager.loadBookmark(key);
		}).bind(this);
		test.appendChild(el);
	}
	var snappy = document.getElementById("snap");
	snappy.onclick = (function() {
		this.storageManager.addBookmark("a");
	}).bind(this);
*/