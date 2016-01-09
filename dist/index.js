(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(document).ready(function () {

	var DEG_RAD_CONST = Math.PI * 2;
	var SCROLL_COEFF = 0.05;

	var $window = $(window);

	var $body = $(document.body);

	var $titleContainer = $(".title-container");

	var $head = $(".title");
	var $subhead = $("<p class='title-sub'>Inventor of the potato</p>");

	$titleContainer.append($subhead);
	$body.append($titleContainer);

	var $frameContainer = $(".frame-container");

	var $bubbleContainer = $(".bubble-container");

	var $navControls = $(".nav-bar-controls");

	var $exitFrame = $navControls.find("#exit-frame");

	var $unscrollFrame = $navControls.find("#unscroll-frame");

	$exitFrame.css("opacity", "0");
	$unscrollFrame.css("opacity", "0");

	var scrollMomentum = 0;

	var subheadMsg = ["Inventor of the potato", "Homosapien extroardinaire", "Your best nightmare", "Your worst best friend", "LOL", "A cat", "Not an alien", "Java !== JavaScript", "The meta guy", "..."];

	var Bubble = function () {
		function Bubble(cfg) {
			_classCallCheck(this, Bubble);

			this.$element = $("<div class='bubble'></div>");
			this.$title = $("<p class='bubble-title'>" + cfg.title + "</p>");
			this.titleText = cfg.title;

			this.$element.append(this.$title);
			$bubbleContainer.append(this.$element);

			this.relPos = {
				x: cfg.x,
				size: cfg.size
			};

			this.pxPos = {
				x: null,
				y: 0,
				size: null
			};

			this.$element.click(this.onClickWrapper.bind(this));

			this.calcPos();

			this.uid = Date.now();
		}

		_createClass(Bubble, [{
			key: "onClickWrapper",
			value: function onClickWrapper() {
				this.onClick();
			}
		}, {
			key: "onClick",
			value: function onClick() {}
		}, {
			key: "calcPos",
			value: function calcPos() {
				this.pxPos.size = parseFloat(this.$element.width());
				this.pxPos.x = this.relPos.x / 100 * parseFloat(this.$element.parent().width()) - this.pxPos.size / 2;
				this.pxPos.y = 0;

				this.pxPos.x = window.innerWidth / 2 + (this.pxPos.x - window.innerWidth / 2) * (1 + 1 / window.innerWidth * window.innerHeight / 10);

				if (this.index === undefined) {
					this.index = $bubbleContainer.children().length - 1;
				}

				var elementEmWidth = Math.max(Math.min(this.titleText.length + 1, 10), 8);
				if (window.innerWidth < 1100) {
					if (this.index % 2 === 0) {
						this.pxPos.y = window.innerHeight * 0.17;
					}

					this.pxPos.x = window.innerWidth / 2 + (this.pxPos.x - window.innerWidth / 2) * 1.1;
				}

				this.$element.css({
					"top": "0px",
					"left": this.pxPos.x + "px",
					"width": elementEmWidth + "em",
					"height": elementEmWidth + "em"
				});

				var elementSize = parseFloat(this.$element.css("width"));

				this.$title.css({
					"top": elementSize / 2 - parseFloat(this.$title.css("height")) / 2,
					"left": elementSize / 2 - parseFloat(this.$title.css("width")) / 2
				});
			}
		}, {
			key: "update",
			value: function update() {}
		}]);

		return Bubble;
	}();

	var activeFrame = null;

	var LinkBubble = function (_Bubble) {
		_inherits(LinkBubble, _Bubble);

		function LinkBubble(cfg) {
			_classCallCheck(this, LinkBubble);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LinkBubble).call(this, cfg));

			_this.source = cfg.source;

			_this.cosSeed = Math.random() * 360 / DEG_RAD_CONST;

			_this.frameAppended = false;

			_this.$frameWrapper = $("<div class='frame-wrapper'></div>");
			_this.$frame = $("<iframe class='frame-content'></iframe>");

			_this.$frame.attr({
				/* seamless: "seamless", */
				frameborder: "0",
				scrolling: "no",
				src: _this.source
			});

			_this.$frameWrapper.append(_this.$frame);

			_this.$frameContents = _this.$frame.contents().find("html");

			_this.wrapperTop = parseFloat($frameContainer.css("top"));

			_this.$frameWrapper.css({
				"top": _this.wrapperTop + "px"
			});

			_this.frameScroll = 0;

			_this.frameHeight = 0;
			return _this;
		}

		_createClass(LinkBubble, [{
			key: "drift",
			value: function drift() {
				this.cosSeed += 0.03;
				this.cosSeed %= 360;
				this.$element.css({
					"top": this.pxPos.y + Math.cos(this.cosSeed) * this.pxPos.size / 15 + "px"
				});
			}
		}, {
			key: "onClick",
			value: function onClick() {
				this.$frameWrapper.css("z-index", 1);

				if (activeFrame && activeFrame.uid !== this.uid) {
					scrollMomentum = 0;
					activeFrame.deactivate(true);
				}

				activeFrame = this;

				if (!this.frameAppended) {
					$frameContainer.append(this.$frameWrapper);
					this.frameAppended = true;
				}

				this.$frame.stop().animate({
					"opacity": "1"
				}, {
					duration: 1500
				});
				$titleContainer.addClass("up");

				// Magicks!
				this.animateIn();

				$exitFrame.stop().animate({
					"opacity": 1
				}, 1000);
				$exitFrame.css("cursor", "pointer");
			}
		}, {
			key: "animateIn",
			value: function animateIn() {
				/* Don't even ask me why this method works. I don't even know, it just works. This scares me */
				if (parseFloat(this.$frameWrapper.css("top")) > 0) {
					this.$frameWrapper.css("top", "0px");
					setTimeout(this.animateIn.bind(this), 1);
				}
			}
		}, {
			key: "unscroll",
			value: function unscroll() {
				setTimeout(this._unscroll.bind(this), 1);
			}
		}, {
			key: "_unscroll",
			value: function _unscroll(times) {
				scrollMomentum = 0;
				times = times + 1 || 0;
				this.frameScroll += 1.2 * times;
				if (-this.frameScroll > 0) {
					setTimeout(this._unscroll.bind(this, times), 7);
				} else {
					this.frameScroll = 0;
					this.scrolled = false;
					$unscrollFrame.stop().animate({
						"opacity": 0
					}, 1000);
					$unscrollFrame.css("cursor", "default");
				}
			}
		}, {
			key: "addScroll",
			value: function addScroll(amount) {
				if (this.wrapperTop + this.frameHeight < window.innerHeight) return;
				console.log(this.frameScroll);
				if (-this.frameScroll > 500 && $unscrollFrame.css("opacity") === "0") {
					$unscrollFrame.animate({
						"opacity": 1
					}, 1000);
					$unscrollFrame.css("cursor", "pointer");
				}

				if (this.frameScroll + amount >= 0) {
					this.frameScroll = 0;
				} else if (-(this.frameScroll + amount) > this.frameHeight - 500) {
					this.frameScroll = -this.frameHeight + 500;
				} else {
					this.frameScroll += amount;
				}

				if (-this.frameScroll > 0) {
					this.scrolled = true;
				}
			}
		}, {
			key: "deactivate",
			value: function deactivate(instant) {
				instant = instant || false;
				this.$frameWrapper.css("z-index", -1);
				this.unscroll();
				$titleContainer.removeClass("up");

				setTimeout(this._deactivate.bind(this), 1500 * instant + 1);

				$exitFrame.animate({
					"opacity": 0
				}, 1000);

				$unscrollFrame.stop().animate({
					"opacity": 0
				}, 1000);
				$exitFrame.css("cursor", "default");
			}
		}, {
			key: "_deactivate",
			value: function _deactivate() {
				this.$frame.animate({
					"opacity": 0
				}, 1000, function () {
					this.$frameWrapper.css({
						"top": window.innerHeight - parseFloat($frameContainer.css("top")) / 2 + "px"
					});
				}.bind(this));
			}
		}, {
			key: "update",
			value: function update() {
				if (this.frameAppended) {
					var frameDocHeight = this.$frame.contents().find("html").height();

					if (this.frameHeight !== frameDocHeight) {
						this.frameHeight = frameDocHeight;
						this.$frame.height(frameDocHeight);
					}
				}

				this.$frame.css("top", this.frameScroll + "px");

				this.drift();
			}
		}]);

		return LinkBubble;
	}(Bubble);

	var bubbles = [new LinkBubble({
		x: 30,
		size: 7,
		source: "resume.html",
		title: "Resume"
	}), new LinkBubble({
		x: 40,
		size: 7.5,
		source: "about.html",
		title: "About Me"
	}), new LinkBubble({
		x: 50,
		size: 6.5,
		source: "blog/index.html",
		title: "My Blog"
	}), new LinkBubble({
		x: 60,
		size: 7,
		source: "work.html",
		title: "My Work"
	}), new LinkBubble({
		x: 70,
		size: 7.5,
		source: "contact.html",
		title: "Contact Me"
	})];

	$exitFrame.click(function () {
		scrollMomentum = 0;
		if (activeFrame) {
			activeFrame.deactivate();
		}
	});

	$unscrollFrame.click(function () {
		scrollMomentum = 0;
		if (activeFrame && activeFrame.scrolled) {
			activeFrame.unscroll();
		}
	});

	$subhead.click(function () {
		$subhead.text(subheadMsg[Math.floor(Math.random() * subheadMsg.length)]);
	});

	function updatePage() {
		for (var i = 0; i < bubbles.length; i++) {
			bubbles[i].update();
		}
		if (activeFrame) {
			activeFrame.addScroll(scrollMomentum);
			scrollMomentum *= 0.9;
		}

		setTimeout(updatePage, 10);
	}

	$body.mousewheel(function (event) {
		if (activeFrame) {
			scrollMomentum += event.originalEvent.wheelDelta * SCROLL_COEFF;
		}
	});

	setTimeout(updatePage, 1);

	$(window).resize(function () {
		for (var i = 0; i < bubbles.length; i++) {
			bubbles[i].calcPos();
		}
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdHNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBVzs7QUFFNUIsS0FBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEMsS0FBTSxZQUFZLEdBQUcsSUFBSSxDQUFDOztBQUcxQixLQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXhCLEtBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTdCLEtBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU1QyxLQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEIsS0FBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7O0FBRXBFLGdCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRTlCLEtBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU1QyxLQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUU5QyxLQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFMUMsS0FBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFbEQsS0FBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUUxRCxXQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMs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IiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRjb25zdCBERUdfUkFEX0NPTlNUID0gTWF0aC5QSSAqIDI7XHJcblx0Y29uc3QgU0NST0xMX0NPRUZGID0gMC4wNTtcclxuXHJcblxyXG5cdHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG5cclxuXHR2YXIgJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuXHR2YXIgJHRpdGxlQ29udGFpbmVyID0gJChcIi50aXRsZS1jb250YWluZXJcIik7XHJcblxyXG5cdHZhciAkaGVhZCA9ICQoXCIudGl0bGVcIik7XHJcblx0dmFyICRzdWJoZWFkID0gJChcIjxwIGNsYXNzPSd0aXRsZS1zdWInPkludmVudG9yIG9mIHRoZSBwb3RhdG88L3A+XCIpO1xyXG5cclxuXHQkdGl0bGVDb250YWluZXIuYXBwZW5kKCRzdWJoZWFkKTtcclxuXHQkYm9keS5hcHBlbmQoJHRpdGxlQ29udGFpbmVyKTtcclxuXHJcblx0dmFyICRmcmFtZUNvbnRhaW5lciA9ICQoXCIuZnJhbWUtY29udGFpbmVyXCIpO1xyXG5cclxuXHR2YXIgJGJ1YmJsZUNvbnRhaW5lciA9ICQoXCIuYnViYmxlLWNvbnRhaW5lclwiKTtcclxuXHJcblx0dmFyICRuYXZDb250cm9scyA9ICQoXCIubmF2LWJhci1jb250cm9sc1wiKTtcclxuXHJcblx0dmFyICRleGl0RnJhbWUgPSAkbmF2Q29udHJvbHMuZmluZChcIiNleGl0LWZyYW1lXCIpO1xyXG5cclxuXHR2YXIgJHVuc2Nyb2xsRnJhbWUgPSAkbmF2Q29udHJvbHMuZmluZChcIiN1bnNjcm9sbC1mcmFtZVwiKTtcclxuXHJcblx0JGV4aXRGcmFtZS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuXHQkdW5zY3JvbGxGcmFtZS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuXHJcblxyXG5cclxuXHR2YXIgc2Nyb2xsTW9tZW50dW0gPSAwO1xyXG5cclxuXHR2YXIgc3ViaGVhZE1zZyA9IFtcclxuXHRcdFwiSW52ZW50b3Igb2YgdGhlIHBvdGF0b1wiLFxyXG5cdFx0XCJIb21vc2FwaWVuIGV4dHJvYXJkaW5haXJlXCIsXHJcblx0XHRcIllvdXIgYmVzdCBuaWdodG1hcmVcIixcclxuXHRcdFwiWW91ciB3b3JzdCBiZXN0IGZyaWVuZFwiLFxyXG5cdFx0XCJMT0xcIixcclxuXHRcdFwiQSBjYXRcIixcclxuXHRcdFwiTm90IGFuIGFsaWVuXCIsXHJcblx0XHRcIkphdmEgIT09IEphdmFTY3JpcHRcIixcclxuXHRcdFwiVGhlIG1ldGEgZ3V5XCIsXHJcblx0XHRcIi4uLlwiXHJcblx0XTtcclxuXHJcblxyXG5cclxuXHRjbGFzcyBCdWJibGUge1xyXG5cdFx0Y29uc3RydWN0b3IoY2ZnKSB7XHJcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkKFwiPGRpdiBjbGFzcz0nYnViYmxlJz48L2Rpdj5cIik7XHJcblx0XHRcdHRoaXMuJHRpdGxlID0gJChcIjxwIGNsYXNzPSdidWJibGUtdGl0bGUnPlwiICsgY2ZnLnRpdGxlICsgXCI8L3A+XCIpO1xyXG5cdFx0XHR0aGlzLnRpdGxlVGV4dCA9IGNmZy50aXRsZTtcclxuXHJcblx0XHRcdHRoaXMuJGVsZW1lbnQuYXBwZW5kKHRoaXMuJHRpdGxlKTtcclxuXHRcdFx0JGJ1YmJsZUNvbnRhaW5lci5hcHBlbmQodGhpcy4kZWxlbWVudCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlbFBvcyA9IHtcclxuXHRcdFx0XHR4OiBjZmcueCxcclxuXHRcdFx0XHRzaXplOiBjZmcuc2l6ZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5weFBvcyA9IHtcclxuXHRcdFx0XHR4OiBudWxsLFxyXG5cdFx0XHRcdHk6IDAsXHJcblx0XHRcdFx0c2l6ZTogbnVsbFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy4kZWxlbWVudC5jbGljayh0aGlzLm9uQ2xpY2tXcmFwcGVyLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdFx0dGhpcy5jYWxjUG9zKCk7XHJcblxyXG5cdFx0XHR0aGlzLnVpZCA9IERhdGUubm93KCk7XHJcblx0XHR9XHJcblx0XHRvbkNsaWNrV3JhcHBlcigpIHtcclxuXHRcdFx0dGhpcy5vbkNsaWNrKCk7XHJcblx0XHR9XHJcblx0XHRvbkNsaWNrKCkge1xyXG5cclxuXHRcdH1cclxuXHRcdGNhbGNQb3MoKSB7XHJcblx0XHRcdHRoaXMucHhQb3Muc2l6ZSA9IHBhcnNlRmxvYXQodGhpcy4kZWxlbWVudC53aWR0aCgpKTtcclxuXHRcdFx0dGhpcy5weFBvcy54ID0gdGhpcy5yZWxQb3MueCAvIDEwMCAqIHBhcnNlRmxvYXQodGhpcy4kZWxlbWVudC5wYXJlbnQoKS53aWR0aCgpKSAtIHRoaXMucHhQb3Muc2l6ZSAvIDI7XHJcblx0XHRcdHRoaXMucHhQb3MueSA9IDA7XHJcblxyXG5cdFx0XHR0aGlzLnB4UG9zLnggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKyAodGhpcy5weFBvcy54IC0gd2luZG93LmlubmVyV2lkdGggLyAyKSAqICgxICsgMS93aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDEwKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHR0aGlzLmluZGV4ID0gJGJ1YmJsZUNvbnRhaW5lci5jaGlsZHJlbigpLmxlbmd0aCAtIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBlbGVtZW50RW1XaWR0aCA9IE1hdGgubWF4KE1hdGgubWluKHRoaXMudGl0bGVUZXh0Lmxlbmd0aCArIDEsIDEwKSwgOCk7XHJcblx0XHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDExMDApIHtcclxuXHRcdFx0XHRpZiAodGhpcy5pbmRleCAlIDIgPT09IDApIHtcclxuXHRcdFx0XHRcdHRoaXMucHhQb3MueSA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMTc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnB4UG9zLnggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKyAodGhpcy5weFBvcy54IC0gd2luZG93LmlubmVyV2lkdGggLyAyKSAqIDEuMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFwidG9wXCI6IFwiMHB4XCIsXHJcblx0XHRcdFx0XCJsZWZ0XCI6IHRoaXMucHhQb3MueCArIFwicHhcIixcclxuXHRcdFx0XHRcIndpZHRoXCI6IGVsZW1lbnRFbVdpZHRoICsgXCJlbVwiLFxyXG5cdFx0XHRcdFwiaGVpZ2h0XCI6IGVsZW1lbnRFbVdpZHRoICsgXCJlbVwiXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyIGVsZW1lbnRTaXplID0gcGFyc2VGbG9hdCh0aGlzLiRlbGVtZW50LmNzcyhcIndpZHRoXCIpKTtcclxuXHJcblx0XHRcdHRoaXMuJHRpdGxlLmNzcyh7XHJcblx0XHRcdFx0XCJ0b3BcIjogZWxlbWVudFNpemUgLyAyIC0gcGFyc2VGbG9hdCh0aGlzLiR0aXRsZS5jc3MoXCJoZWlnaHRcIikpIC8gMixcclxuXHRcdFx0XHRcImxlZnRcIjogZWxlbWVudFNpemUgLyAyIC0gcGFyc2VGbG9hdCh0aGlzLiR0aXRsZS5jc3MoXCJ3aWR0aFwiKSkgLyAyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0dXBkYXRlKCkge1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblx0dmFyIGFjdGl2ZUZyYW1lID0gbnVsbDtcclxuXHJcblxyXG5cclxuXHRjbGFzcyBMaW5rQnViYmxlIGV4dGVuZHMgQnViYmxlIHtcclxuXHRcdGNvbnN0cnVjdG9yKGNmZykge1xyXG5cdFx0XHRzdXBlcihjZmcpO1xyXG5cclxuXHRcdFx0dGhpcy5zb3VyY2UgPSBjZmcuc291cmNlO1xyXG5cclxuXHRcdFx0dGhpcy5jb3NTZWVkID0gTWF0aC5yYW5kb20oKSAqIDM2MCAvIERFR19SQURfQ09OU1Q7XHJcblxyXG5cdFx0XHR0aGlzLmZyYW1lQXBwZW5kZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlciA9ICQoXCI8ZGl2IGNsYXNzPSdmcmFtZS13cmFwcGVyJz48L2Rpdj5cIik7XHJcblx0XHRcdHRoaXMuJGZyYW1lID0gJChcIjxpZnJhbWUgY2xhc3M9J2ZyYW1lLWNvbnRlbnQnPjwvaWZyYW1lPlwiKTtcclxuXHJcblx0XHRcdHRoaXMuJGZyYW1lLmF0dHIoe1xyXG5cdFx0XHRcdC8qIHNlYW1sZXNzOiBcInNlYW1sZXNzXCIsICovXHJcblx0XHRcdFx0ZnJhbWVib3JkZXI6IFwiMFwiLFxyXG5cdFx0XHRcdHNjcm9sbGluZzogXCJub1wiLFxyXG5cdFx0XHRcdHNyYzogdGhpcy5zb3VyY2VcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlci5hcHBlbmQodGhpcy4kZnJhbWUpO1xyXG5cclxuXHRcdFx0dGhpcy4kZnJhbWVDb250ZW50cyA9IHRoaXMuJGZyYW1lLmNvbnRlbnRzKCkuZmluZChcImh0bWxcIik7XHJcblxyXG5cdFx0XHR0aGlzLndyYXBwZXJUb3AgPSBwYXJzZUZsb2F0KCRmcmFtZUNvbnRhaW5lci5jc3MoXCJ0b3BcIikpO1xyXG5cclxuXHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyLmNzcyh7XHJcblx0XHRcdFx0XCJ0b3BcIjogdGhpcy53cmFwcGVyVG9wICsgXCJweFwiXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5mcmFtZVNjcm9sbCA9IDA7XHJcblxyXG5cdFx0XHR0aGlzLmZyYW1lSGVpZ2h0ID0gMDtcclxuXHRcdH1cclxuXHRcdGRyaWZ0KCkge1xyXG5cdFx0XHR0aGlzLmNvc1NlZWQgKz0gMC4wMztcclxuXHRcdFx0dGhpcy5jb3NTZWVkICU9IDM2MDtcclxuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFwidG9wXCI6IHRoaXMucHhQb3MueSArIChNYXRoLmNvcyh0aGlzLmNvc1NlZWQpICogdGhpcy5weFBvcy5zaXplIC8gMTUpICsgXCJweFwiXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0b25DbGljaygpIHtcclxuXHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyLmNzcyhcInotaW5kZXhcIiwgMSk7XHJcblxyXG5cdFx0XHRpZiAoYWN0aXZlRnJhbWUgJiYgYWN0aXZlRnJhbWUudWlkICE9PSB0aGlzLnVpZCkge1xyXG5cdFx0XHRcdHNjcm9sbE1vbWVudHVtID0gMDtcclxuXHRcdFx0XHRhY3RpdmVGcmFtZS5kZWFjdGl2YXRlKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhY3RpdmVGcmFtZSA9IHRoaXM7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuZnJhbWVBcHBlbmRlZCkge1xyXG5cdFx0XHRcdCRmcmFtZUNvbnRhaW5lci5hcHBlbmQodGhpcy4kZnJhbWVXcmFwcGVyKTtcclxuXHRcdFx0XHR0aGlzLmZyYW1lQXBwZW5kZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLiRmcmFtZS5zdG9wKCkuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XCJvcGFjaXR5XCI6IFwiMVwiXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRkdXJhdGlvbjogMTUwMFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JHRpdGxlQ29udGFpbmVyLmFkZENsYXNzKFwidXBcIik7XHJcblxyXG5cdFx0XHQvLyBNYWdpY2tzIVxyXG5cdFx0XHR0aGlzLmFuaW1hdGVJbigpO1xyXG5cclxuXHRcdFx0JGV4aXRGcmFtZS5zdG9wKCkuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XCJvcGFjaXR5XCI6IDFcclxuXHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdCRleGl0RnJhbWUuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcclxuXHRcdH1cclxuXHRcdGFuaW1hdGVJbigpIHtcclxuXHRcdFx0LyogRG9uJ3QgZXZlbiBhc2sgbWUgd2h5IHRoaXMgbWV0aG9kIHdvcmtzLiBJIGRvbid0IGV2ZW4ga25vdywgaXQganVzdCB3b3Jrcy4gVGhpcyBzY2FyZXMgbWUgKi9cclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQodGhpcy4kZnJhbWVXcmFwcGVyLmNzcyhcInRvcFwiKSkgPiAwKSB7XHJcblx0XHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyLmNzcyhcInRvcFwiLCBcIjBweFwiKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KHRoaXMuYW5pbWF0ZUluLmJpbmQodGhpcyksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR1bnNjcm9sbCgpIHtcclxuXHRcdFx0c2V0VGltZW91dCh0aGlzLl91bnNjcm9sbC5iaW5kKHRoaXMpLCAxKVxyXG5cdFx0fVxyXG5cdFx0X3Vuc2Nyb2xsKHRpbWVzKSB7XHJcblx0XHRcdHNjcm9sbE1vbWVudHVtID0gMDtcclxuXHRcdFx0dGltZXMgPSB0aW1lcyArIDEgfHwgMDtcclxuXHRcdFx0dGhpcy5mcmFtZVNjcm9sbCArPSAxLjIgKiB0aW1lcztcclxuXHRcdFx0aWYgKC10aGlzLmZyYW1lU2Nyb2xsID4gMCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQodGhpcy5fdW5zY3JvbGwuYmluZCh0aGlzLCB0aW1lcyksIDcpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5mcmFtZVNjcm9sbCA9IDA7XHJcblx0XHRcdFx0dGhpcy5zY3JvbGxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdCR1bnNjcm9sbEZyYW1lLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcdFwib3BhY2l0eVwiOiAwXHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdFx0JHVuc2Nyb2xsRnJhbWUuY3NzKFwiY3Vyc29yXCIsIFwiZGVmYXVsdFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0YWRkU2Nyb2xsKGFtb3VudCkge1xyXG5cdFx0XHRpZiAodGhpcy53cmFwcGVyVG9wICsgdGhpcy5mcmFtZUhlaWdodCA8IHdpbmRvdy5pbm5lckhlaWdodCkgcmV0dXJuO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmZyYW1lU2Nyb2xsKTtcclxuXHRcdFx0aWYgKC10aGlzLmZyYW1lU2Nyb2xsID4gNTAwICYmICR1bnNjcm9sbEZyYW1lLmNzcyhcIm9wYWNpdHlcIikgPT09IFwiMFwiKSB7XHJcblx0XHRcdFx0JHVuc2Nyb2xsRnJhbWUuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRcIm9wYWNpdHlcIjogMVxyXG5cdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHRcdCR1bnNjcm9sbEZyYW1lLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmZyYW1lU2Nyb2xsICsgYW1vdW50ID49IDApIHtcclxuXHRcdFx0XHR0aGlzLmZyYW1lU2Nyb2xsID0gMDtcclxuXHRcdFx0fSBlbHNlIGlmICgtKHRoaXMuZnJhbWVTY3JvbGwgKyBhbW91bnQpID4gdGhpcy5mcmFtZUhlaWdodCAtIDUwMCkge1xyXG5cdFx0XHRcdHRoaXMuZnJhbWVTY3JvbGwgPSAtdGhpcy5mcmFtZUhlaWdodCArIDUwMDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmZyYW1lU2Nyb2xsICs9IGFtb3VudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKC10aGlzLmZyYW1lU2Nyb2xsID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuc2Nyb2xsZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRkZWFjdGl2YXRlKGluc3RhbnQpIHtcclxuXHRcdFx0aW5zdGFudCA9IGluc3RhbnQgfHwgZmFsc2U7XHJcblx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlci5jc3MoXCJ6LWluZGV4XCIsIC0xKTtcclxuXHRcdFx0dGhpcy51bnNjcm9sbCgpO1xyXG5cdFx0XHQkdGl0bGVDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJ1cFwiKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQodGhpcy5fZGVhY3RpdmF0ZS5iaW5kKHRoaXMpLCAxNTAwICogaW5zdGFudCArIDEpO1xyXG5cclxuXHRcdFx0JGV4aXRGcmFtZS5hbmltYXRlKHtcclxuXHRcdFx0XHRcIm9wYWNpdHlcIjogMFxyXG5cdFx0XHR9LCAxMDAwKTtcclxuXHJcblx0XHRcdCR1bnNjcm9sbEZyYW1lLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcIm9wYWNpdHlcIjogMFxyXG5cdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0JGV4aXRGcmFtZS5jc3MoXCJjdXJzb3JcIiwgXCJkZWZhdWx0XCIpO1xyXG5cdFx0fVxyXG5cdFx0X2RlYWN0aXZhdGUoKSB7XHJcblx0XHRcdHRoaXMuJGZyYW1lLmFuaW1hdGUoe1xyXG5cdFx0XHRcdFwib3BhY2l0eVwiOiAwXHJcblx0XHRcdH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlci5jc3Moe1xyXG5cdFx0XHRcdFx0XCJ0b3BcIjogd2luZG93LmlubmVySGVpZ2h0IC0gcGFyc2VGbG9hdCgkZnJhbWVDb250YWluZXIuY3NzKFwidG9wXCIpKSAvIDIgKyBcInB4XCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuXHRcdHVwZGF0ZSgpIHtcclxuXHRcdFx0aWYgKHRoaXMuZnJhbWVBcHBlbmRlZCkge1xyXG5cdFx0XHRcdHZhciBmcmFtZURvY0hlaWdodCA9IHRoaXMuJGZyYW1lLmNvbnRlbnRzKCkuZmluZChcImh0bWxcIikuaGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLmZyYW1lSGVpZ2h0ICE9PSBmcmFtZURvY0hlaWdodCkge1xyXG5cdFx0XHRcdFx0dGhpcy5mcmFtZUhlaWdodCA9IGZyYW1lRG9jSGVpZ2h0O1xyXG5cdFx0XHRcdFx0dGhpcy4kZnJhbWUuaGVpZ2h0KGZyYW1lRG9jSGVpZ2h0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuJGZyYW1lLmNzcyhcInRvcFwiLCB0aGlzLmZyYW1lU2Nyb2xsICsgXCJweFwiKTtcclxuXHJcblx0XHRcdHRoaXMuZHJpZnQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblx0dmFyIGJ1YmJsZXMgPSBbXHJcblx0XHRuZXcgTGlua0J1YmJsZSh7XHJcblx0XHRcdHg6IDMwLFxyXG5cdFx0XHRzaXplOiA3LFxyXG5cdFx0XHRzb3VyY2U6IFwicmVzdW1lLmh0bWxcIixcclxuXHRcdFx0dGl0bGU6IFwiUmVzdW1lXCJcclxuXHRcdH0pLFxyXG5cdFx0bmV3IExpbmtCdWJibGUoe1xyXG5cdFx0XHR4OiA0MCxcclxuXHRcdFx0c2l6ZTogNy41LFxyXG5cdFx0XHRzb3VyY2U6IFwiYWJvdXQuaHRtbFwiLFxyXG5cdFx0XHR0aXRsZTogXCJBYm91dCBNZVwiXHJcblx0XHR9KSxcclxuXHRcdG5ldyBMaW5rQnViYmxlKHtcclxuXHRcdFx0eDogNTAsXHJcblx0XHRcdHNpemU6IDYuNSxcclxuXHRcdFx0c291cmNlOiBcImJsb2cvaW5kZXguaHRtbFwiLFxyXG5cdFx0XHR0aXRsZTogXCJNeSBCbG9nXCJcclxuXHRcdH0pLFxyXG5cdFx0bmV3IExpbmtCdWJibGUoe1xyXG5cdFx0XHR4OiA2MCxcclxuXHRcdFx0c2l6ZTogNyxcclxuXHRcdFx0c291cmNlOiBcIndvcmsuaHRtbFwiLFxyXG5cdFx0XHR0aXRsZTogXCJNeSBXb3JrXCJcclxuXHRcdH0pLFxyXG5cdFx0bmV3IExpbmtCdWJibGUoe1xyXG5cdFx0XHR4OiA3MCxcclxuXHRcdFx0c2l6ZTogNy41LFxyXG5cdFx0XHRzb3VyY2U6IFwiY29udGFjdC5odG1sXCIsXHJcblx0XHRcdHRpdGxlOiBcIkNvbnRhY3QgTWVcIlxyXG5cdFx0fSlcclxuXHRdO1xyXG5cclxuXHJcblx0JGV4aXRGcmFtZS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdHNjcm9sbE1vbWVudHVtID0gMDtcclxuXHRcdGlmIChhY3RpdmVGcmFtZSkge1xyXG5cdFx0XHRhY3RpdmVGcmFtZS5kZWFjdGl2YXRlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCR1bnNjcm9sbEZyYW1lLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0c2Nyb2xsTW9tZW50dW0gPSAwO1xyXG5cdFx0aWYgKGFjdGl2ZUZyYW1lICYmIGFjdGl2ZUZyYW1lLnNjcm9sbGVkKSB7XHJcblx0XHRcdGFjdGl2ZUZyYW1lLnVuc2Nyb2xsKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCRzdWJoZWFkLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0JHN1YmhlYWQudGV4dChzdWJoZWFkTXNnW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHN1YmhlYWRNc2cubGVuZ3RoKV0pXHJcblx0fSk7XHJcblxyXG5cclxuXHJcblx0ZnVuY3Rpb24gdXBkYXRlUGFnZSgpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYnViYmxlcy5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0YnViYmxlc1tpXS51cGRhdGUoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVGcmFtZSkge1xyXG5cdFx0XHRhY3RpdmVGcmFtZS5hZGRTY3JvbGwoc2Nyb2xsTW9tZW50dW0pO1xyXG5cdFx0XHRzY3JvbGxNb21lbnR1bSAqPSAwLjk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VGltZW91dCh1cGRhdGVQYWdlLCAxMCk7XHJcblx0fVxyXG5cclxuXHQkYm9keS5tb3VzZXdoZWVsKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZiAoYWN0aXZlRnJhbWUpIHtcclxuXHRcdFx0c2Nyb2xsTW9tZW50dW0gKz0gZXZlbnQub3JpZ2luYWxFdmVudC53aGVlbERlbHRhICogU0NST0xMX0NPRUZGO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRzZXRUaW1lb3V0KHVwZGF0ZVBhZ2UsIDEpO1xyXG5cclxuXHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBidWJibGVzLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRidWJibGVzW2ldLmNhbGNQb3MoKTtcclxuXHRcdH1cclxuXHR9KVxyXG59KTtcclxuIl19
