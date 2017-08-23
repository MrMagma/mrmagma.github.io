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

			var _this = _possibleConstructorReturn(this, (LinkBubble.__proto__ || Object.getPrototypeOf(LinkBubble)).call(this, cfg));

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

			_this.$frame.load(_this.$frameLoad.bind(_this));
			return _this;
		}

		_createClass(LinkBubble, [{
			key: "$frameLoad",
			value: function $frameLoad() {
				$(this.$frame.contents()).mousewheel(scrollListener);
			}
		}, {
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
				if (this.wrapperTop + this.frameHeight < window.innerHeight) {
					return;
				}

				if (-this.frameScroll > 500 && $unscrollFrame.css("opacity") === "0") {
					$unscrollFrame.animate({
						"opacity": 1
					}, 1000);
					$unscrollFrame.css("cursor", "pointer");
				}

				this.frameScroll += amount;

				var pos = this.wrapperTop + this.frameScroll + this.frameHeight;

				if (pos < window.innerHeight - 20) {
					console.log("Hi", pos);
					this.frameScroll = window.innerHeight - 20 - this.wrapperTop - this.frameHeight;
				} else if (this.frameScroll > 0) {
					this.frameScroll = 0;
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
					console.log(frameDocHeight);
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

	function scrollListener(event) {
		if (activeFrame) {
			scrollMomentum += event.originalEvent.wheelDelta * SCROLL_COEFF;
		}
	}

	$body.mousewheel(scrollListener);

	setTimeout(updatePage, 1);

	$(window).resize(function () {
		for (var i = 0; i < bubbles.length; i++) {
			bubbles[i].calcPos();
		}
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNjcmlwdHNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBVzs7QUFFNUIsS0FBTSxnQkFBZ0IsS0FBSyxFQUFMLEdBQVUsQ0FBaEM7QUFDQSxLQUFNLGVBQWUsSUFBckI7O0FBR0EsS0FBSSxVQUFVLEVBQUUsTUFBRixDQUFkOztBQUVBLEtBQUksUUFBUSxFQUFFLFNBQVMsSUFBWCxDQUFaOztBQUVBLEtBQUksa0JBQWtCLEVBQUUsa0JBQUYsQ0FBdEI7O0FBRUEsS0FBSSxRQUFRLEVBQUUsUUFBRixDQUFaO0FBQ0EsS0FBSSxXQUFXLEVBQUUsaURBQUYsQ0FBZjs7QUFFQSxpQkFBZ0IsTUFBaEIsQ0FBdUIsUUFBdkI7QUFDQSxPQUFNLE1BQU4sQ0FBYSxlQUFiOztBQUVBLEtBQUksa0JBQWtCLEVBQUUsa0JBQUYsQ0FBdEI7O0FBRUEsS0FBSSxtQkFBbUIsRUFBRSxtQkFBRixDQUF2Qjs7QUFFQSxLQUFJLGVBQWUsRUFBRSxtQkFBRixDQUFuQjs7QUFFQSxLQUFJLGFBQWEsYUFBYSxJQUFiLENBQWtCLGFBQWxCLENBQWpCOztBQUVBLEtBQUksaUJBQWlCLGFBQWEsSUFBYixDQUFrQixpQkFBbEIsQ0FBckI7O0FBRUEsWUFBVyxHQUFYLENBQWUsU0FBZixFQUEwQixHQUExQjtBQUNBLGdCQUFlLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsR0FBOUI7O0FBSUEsS0FBSSxpQkFBaUIsQ0FBckI7O0FBRUEsS0FBSSxhQUFhLENBQ2hCLHdCQURnQixFQUVoQiwyQkFGZ0IsRUFHaEIscUJBSGdCLEVBSWhCLHdCQUpnQixFQUtoQixLQUxnQixFQU1oQixPQU5nQixFQU9oQixjQVBnQixFQVFoQixxQkFSZ0IsRUFTaEIsY0FUZ0IsRUFVaEIsS0FWZ0IsQ0FBakI7O0FBbkM0QixLQWtE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O0FBQ2IscUJBQWtCLE1BQU0sYUFBTixDQUFvQixVQUFwQixHQUFpQyxZQUFuRDtBQUNIO0FBQ0o7O0FBRUosT0FBTSxVQUFOLENBQWlCLGNBQWpCOztBQUVBLFlBQVcsVUFBWCxFQUF1QixDQUF2Qjs7QUFFQSxHQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVc7QUFDM0IsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsTUFBNUIsRUFBb0MsR0FBcEMsRUFBMEM7QUFDekMsV0FBUSxDQUFSLEVBQVcsT0FBWDtBQUNBO0FBQ0QsRUFKRDtBQUtBLENBL1hEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cdGNvbnN0IERFR19SQURfQ09OU1QgPSBNYXRoLlBJICogMjtcblx0Y29uc3QgU0NST0xMX0NPRUZGID0gMC4wNTtcblxuXG5cdHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuXG5cdHZhciAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSk7XG5cblx0dmFyICR0aXRsZUNvbnRhaW5lciA9ICQoXCIudGl0bGUtY29udGFpbmVyXCIpO1xuXG5cdHZhciAkaGVhZCA9ICQoXCIudGl0bGVcIik7XG5cdHZhciAkc3ViaGVhZCA9ICQoXCI8cCBjbGFzcz0ndGl0bGUtc3ViJz5JbnZlbnRvciBvZiB0aGUgcG90YXRvPC9wPlwiKTtcblxuXHQkdGl0bGVDb250YWluZXIuYXBwZW5kKCRzdWJoZWFkKTtcblx0JGJvZHkuYXBwZW5kKCR0aXRsZUNvbnRhaW5lcik7XG5cblx0dmFyICRmcmFtZUNvbnRhaW5lciA9ICQoXCIuZnJhbWUtY29udGFpbmVyXCIpO1xuXG5cdHZhciAkYnViYmxlQ29udGFpbmVyID0gJChcIi5idWJibGUtY29udGFpbmVyXCIpO1xuXG5cdHZhciAkbmF2Q29udHJvbHMgPSAkKFwiLm5hdi1iYXItY29udHJvbHNcIik7XG5cblx0dmFyICRleGl0RnJhbWUgPSAkbmF2Q29udHJvbHMuZmluZChcIiNleGl0LWZyYW1lXCIpO1xuXG5cdHZhciAkdW5zY3JvbGxGcmFtZSA9ICRuYXZDb250cm9scy5maW5kKFwiI3Vuc2Nyb2xsLWZyYW1lXCIpO1xuXG5cdCRleGl0RnJhbWUuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cdCR1bnNjcm9sbEZyYW1lLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cblxuXHR2YXIgc2Nyb2xsTW9tZW50dW0gPSAwO1xuXG5cdHZhciBzdWJoZWFkTXNnID0gW1xuXHRcdFwiSW52ZW50b3Igb2YgdGhlIHBvdGF0b1wiLFxuXHRcdFwiSG9tb3NhcGllbiBleHRyb2FyZGluYWlyZVwiLFxuXHRcdFwiWW91ciBiZXN0IG5pZ2h0bWFyZVwiLFxuXHRcdFwiWW91ciB3b3JzdCBiZXN0IGZyaWVuZFwiLFxuXHRcdFwiTE9MXCIsXG5cdFx0XCJBIGNhdFwiLFxuXHRcdFwiTm90IGFuIGFsaWVuXCIsXG5cdFx0XCJKYXZhICE9PSBKYXZhU2NyaXB0XCIsXG5cdFx0XCJUaGUgbWV0YSBndXlcIixcblx0XHRcIi4uLlwiXG5cdF07XG5cblxuXG5cdGNsYXNzIEJ1YmJsZSB7XG5cdFx0Y29uc3RydWN0b3IoY2ZnKSB7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gJChcIjxkaXYgY2xhc3M9J2J1YmJsZSc+PC9kaXY+XCIpO1xuXHRcdFx0dGhpcy4kdGl0bGUgPSAkKFwiPHAgY2xhc3M9J2J1YmJsZS10aXRsZSc+XCIgKyBjZmcudGl0bGUgKyBcIjwvcD5cIik7XG5cdFx0XHR0aGlzLnRpdGxlVGV4dCA9IGNmZy50aXRsZTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy4kZWxlbWVudC5hcHBlbmQodGhpcy4kdGl0bGUpO1xuXHRcdFx0JGJ1YmJsZUNvbnRhaW5lci5hcHBlbmQodGhpcy4kZWxlbWVudCk7XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMucmVsUG9zID0ge1xuXHRcdFx0XHR4OiBjZmcueCxcblx0XHRcdFx0c2l6ZTogY2ZnLnNpemVcblx0XHRcdH07XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMucHhQb3MgPSB7XG5cdFx0XHRcdHg6IG51bGwsXG5cdFx0XHRcdHk6IDAsXG5cdFx0XHRcdHNpemU6IG51bGxcblx0XHRcdH07XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMuJGVsZW1lbnQuY2xpY2sodGhpcy5vbkNsaWNrV3JhcHBlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy5jYWxjUG9zKCk7XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMudWlkID0gRGF0ZS5ub3coKTtcblx0XHR9XG5cdFx0b25DbGlja1dyYXBwZXIoKSB7XG5cdFx0XHR0aGlzLm9uQ2xpY2soKTtcblx0XHR9XG5cdFx0b25DbGljaygpIHtcbiAgICAgICAgICAgIFxuXHRcdH1cblx0XHRjYWxjUG9zKCkge1xuXHRcdFx0dGhpcy5weFBvcy5zaXplID0gcGFyc2VGbG9hdCh0aGlzLiRlbGVtZW50LndpZHRoKCkpO1xuXHRcdFx0dGhpcy5weFBvcy54ID0gdGhpcy5yZWxQb3MueCAvIDEwMCAqIHBhcnNlRmxvYXQodGhpcy4kZWxlbWVudC5wYXJlbnQoKS53aWR0aCgpKSAtIHRoaXMucHhQb3Muc2l6ZSAvIDI7XG5cdFx0XHR0aGlzLnB4UG9zLnkgPSAwO1xuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLnB4UG9zLnggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKyAodGhpcy5weFBvcy54IC0gd2luZG93LmlubmVyV2lkdGggLyAyKSAqICgxICsgMS93aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDEwKTtcbiAgICAgICAgICAgIFxuXHRcdFx0aWYgKHRoaXMuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLmluZGV4ID0gJGJ1YmJsZUNvbnRhaW5lci5jaGlsZHJlbigpLmxlbmd0aCAtIDE7XG5cdFx0XHR9XG4gICAgICAgICAgICBcblx0XHRcdHZhciBlbGVtZW50RW1XaWR0aCA9IE1hdGgubWF4KE1hdGgubWluKHRoaXMudGl0bGVUZXh0Lmxlbmd0aCArIDEsIDEwKSwgOCk7XG5cdFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCAxMTAwKSB7XG5cdFx0XHRcdGlmICh0aGlzLmluZGV4ICUgMiA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMucHhQb3MueSA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMTc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnB4UG9zLnggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKyAodGhpcy5weFBvcy54IC0gd2luZG93LmlubmVyV2lkdGggLyAyKSAqIDEuMTtcblx0XHRcdH1cbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3Moe1xuXHRcdFx0XHRcInRvcFwiOiBcIjBweFwiLFxuXHRcdFx0XHRcImxlZnRcIjogdGhpcy5weFBvcy54ICsgXCJweFwiLFxuXHRcdFx0XHRcIndpZHRoXCI6IGVsZW1lbnRFbVdpZHRoICsgXCJlbVwiLFxuXHRcdFx0XHRcImhlaWdodFwiOiBlbGVtZW50RW1XaWR0aCArIFwiZW1cIlxuXHRcdFx0fSk7XG4gICAgICAgICAgICBcblx0XHRcdHZhciBlbGVtZW50U2l6ZSA9IHBhcnNlRmxvYXQodGhpcy4kZWxlbWVudC5jc3MoXCJ3aWR0aFwiKSk7XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMuJHRpdGxlLmNzcyh7XG5cdFx0XHRcdFwidG9wXCI6IGVsZW1lbnRTaXplIC8gMiAtIHBhcnNlRmxvYXQodGhpcy4kdGl0bGUuY3NzKFwiaGVpZ2h0XCIpKSAvIDIsXG5cdFx0XHRcdFwibGVmdFwiOiBlbGVtZW50U2l6ZSAvIDIgLSBwYXJzZUZsb2F0KHRoaXMuJHRpdGxlLmNzcyhcIndpZHRoXCIpKSAvIDJcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR1cGRhdGUoKSB7XG4gICAgICAgICAgICBcblx0XHR9XG5cdH1cbiAgICBcbiAgICBcbiAgICBcblx0dmFyIGFjdGl2ZUZyYW1lID0gbnVsbDtcbiAgICBcbiAgICBcbiAgICBcblx0Y2xhc3MgTGlua0J1YmJsZSBleHRlbmRzIEJ1YmJsZSB7XG5cdFx0Y29uc3RydWN0b3IoY2ZnKSB7XG5cdFx0XHRzdXBlcihjZmcpO1xuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLnNvdXJjZSA9IGNmZy5zb3VyY2U7XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMuY29zU2VlZCA9IE1hdGgucmFuZG9tKCkgKiAzNjAgLyBERUdfUkFEX0NPTlNUO1xuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLmZyYW1lQXBwZW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyID0gJChcIjxkaXYgY2xhc3M9J2ZyYW1lLXdyYXBwZXInPjwvZGl2PlwiKTtcblx0XHRcdHRoaXMuJGZyYW1lID0gJChcIjxpZnJhbWUgY2xhc3M9J2ZyYW1lLWNvbnRlbnQnPjwvaWZyYW1lPlwiKTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy4kZnJhbWUuYXR0cih7XG5cdFx0XHRcdC8qIHNlYW1sZXNzOiBcInNlYW1sZXNzXCIsICovXG5cdFx0XHRcdGZyYW1lYm9yZGVyOiBcIjBcIixcblx0XHRcdFx0c2Nyb2xsaW5nOiBcIm5vXCIsXG5cdFx0XHRcdHNyYzogdGhpcy5zb3VyY2Vcblx0XHRcdH0pXG4gICAgICAgICAgICBcblx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlci5hcHBlbmQodGhpcy4kZnJhbWUpO1xuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLiRmcmFtZUNvbnRlbnRzID0gdGhpcy4kZnJhbWUuY29udGVudHMoKS5maW5kKFwiaHRtbFwiKTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy53cmFwcGVyVG9wID0gcGFyc2VGbG9hdCgkZnJhbWVDb250YWluZXIuY3NzKFwidG9wXCIpKTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyLmNzcyh7XG5cdFx0XHRcdFwidG9wXCI6IHRoaXMud3JhcHBlclRvcCArIFwicHhcIlxuXHRcdFx0fSk7XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMuZnJhbWVTY3JvbGwgPSAwO1xuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLmZyYW1lSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy4kZnJhbWUubG9hZCh0aGlzLiRmcmFtZUxvYWQuYmluZCh0aGlzKSlcblx0XHR9XG4gICAgICAgICRmcmFtZUxvYWQoKSB7XG4gICAgICAgICAgICAkKHRoaXMuJGZyYW1lLmNvbnRlbnRzKCkpLm1vdXNld2hlZWwoc2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICB9XG5cdFx0ZHJpZnQoKSB7XG5cdFx0XHR0aGlzLmNvc1NlZWQgKz0gMC4wMztcblx0XHRcdHRoaXMuY29zU2VlZCAlPSAzNjA7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcyh7XG5cdFx0XHRcdFwidG9wXCI6IHRoaXMucHhQb3MueSArIChNYXRoLmNvcyh0aGlzLmNvc1NlZWQpICogdGhpcy5weFBvcy5zaXplIC8gMTUpICsgXCJweFwiXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0b25DbGljaygpIHtcblx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlci5jc3MoXCJ6LWluZGV4XCIsIDEpO1xuICAgICAgICAgICAgXG5cdFx0XHRpZiAoYWN0aXZlRnJhbWUgJiYgYWN0aXZlRnJhbWUudWlkICE9PSB0aGlzLnVpZCkge1xuXHRcdFx0XHRzY3JvbGxNb21lbnR1bSA9IDA7XG5cdFx0XHRcdGFjdGl2ZUZyYW1lLmRlYWN0aXZhdGUodHJ1ZSk7XG5cdFx0XHR9XG4gICAgICAgICAgICBcblx0XHRcdGFjdGl2ZUZyYW1lID0gdGhpcztcbiAgICAgICAgICAgIFxuXHRcdFx0aWYgKCF0aGlzLmZyYW1lQXBwZW5kZWQpIHtcblx0XHRcdFx0JGZyYW1lQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRmcmFtZVdyYXBwZXIpO1xuXHRcdFx0XHR0aGlzLmZyYW1lQXBwZW5kZWQgPSB0cnVlO1xuXHRcdFx0fVxuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLiRmcmFtZS5zdG9wKCkuYW5pbWF0ZSh7XG5cdFx0XHRcdFwib3BhY2l0eVwiOiBcIjFcIlxuXHRcdFx0fSwge1xuXHRcdFx0XHRkdXJhdGlvbjogMTUwMFxuXHRcdFx0fSk7XG5cdFx0XHQkdGl0bGVDb250YWluZXIuYWRkQ2xhc3MoXCJ1cFwiKTtcbiAgICAgICAgICAgIFxuXHRcdFx0Ly8gTWFnaWNrcyFcblx0XHRcdHRoaXMuYW5pbWF0ZUluKCk7XG4gICAgICAgICAgICBcblx0XHRcdCRleGl0RnJhbWUuc3RvcCgpLmFuaW1hdGUoe1xuXHRcdFx0XHRcIm9wYWNpdHlcIjogMVxuXHRcdFx0fSwgMTAwMCk7XG5cdFx0XHQkZXhpdEZyYW1lLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG5cdFx0fVxuXHRcdGFuaW1hdGVJbigpIHtcblx0XHRcdC8qIERvbid0IGV2ZW4gYXNrIG1lIHdoeSB0aGlzIG1ldGhvZCB3b3Jrcy4gSSBkb24ndCBldmVuIGtub3csIGl0IGp1c3Qgd29ya3MuIFRoaXMgc2NhcmVzIG1lICovXG5cdFx0XHRpZiAocGFyc2VGbG9hdCh0aGlzLiRmcmFtZVdyYXBwZXIuY3NzKFwidG9wXCIpKSA+IDApIHtcblx0XHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyLmNzcyhcInRvcFwiLCBcIjBweFwiKTtcblx0XHRcdFx0c2V0VGltZW91dCh0aGlzLmFuaW1hdGVJbi5iaW5kKHRoaXMpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dW5zY3JvbGwoKSB7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuX3Vuc2Nyb2xsLmJpbmQodGhpcyksIDEpXG5cdFx0fVxuXHRcdF91bnNjcm9sbCh0aW1lcykge1xuXHRcdFx0c2Nyb2xsTW9tZW50dW0gPSAwO1xuXHRcdFx0dGltZXMgPSB0aW1lcyArIDEgfHwgMDtcblx0XHRcdHRoaXMuZnJhbWVTY3JvbGwgKz0gMS4yICogdGltZXM7XG5cdFx0XHRpZiAoLXRoaXMuZnJhbWVTY3JvbGwgPiAwKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQodGhpcy5fdW5zY3JvbGwuYmluZCh0aGlzLCB0aW1lcyksIDcpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmZyYW1lU2Nyb2xsID0gMDtcblx0XHRcdFx0dGhpcy5zY3JvbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHQkdW5zY3JvbGxGcmFtZS5zdG9wKCkuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XCJvcGFjaXR5XCI6IDBcblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHRcdCR1bnNjcm9sbEZyYW1lLmNzcyhcImN1cnNvclwiLCBcImRlZmF1bHRcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFkZFNjcm9sbChhbW91bnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndyYXBwZXJUb3AgKyB0aGlzLmZyYW1lSGVpZ2h0IDwgd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG5cdFx0XHRpZiAoLXRoaXMuZnJhbWVTY3JvbGwgPiA1MDAgJiYgJHVuc2Nyb2xsRnJhbWUuY3NzKFwib3BhY2l0eVwiKSA9PT0gXCIwXCIpIHtcblx0XHRcdFx0JHVuc2Nyb2xsRnJhbWUuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XCJvcGFjaXR5XCI6IDFcblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHRcdCR1bnNjcm9sbEZyYW1lLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG5cdFx0XHR9XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgdGhpcy5mcmFtZVNjcm9sbCArPSBhbW91bnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndyYXBwZXJUb3AgKyB0aGlzLmZyYW1lU2Nyb2xsICsgdGhpcy5mcmFtZUhlaWdodDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBvcyA8IHdpbmRvdy5pbm5lckhlaWdodCAtIDIwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJIaVwiLCBwb3MpXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZVNjcm9sbCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDIwIC0gdGhpcy53cmFwcGVyVG9wIC0gdGhpcy5mcmFtZUhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5mcmFtZVNjcm9sbCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lU2Nyb2xsID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG5cdFx0XHRpZiAoLXRoaXMuZnJhbWVTY3JvbGwgPiAwKSB7XG5cdFx0XHRcdHRoaXMuc2Nyb2xsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRkZWFjdGl2YXRlKGluc3RhbnQpIHtcblx0XHRcdGluc3RhbnQgPSBpbnN0YW50IHx8IGZhbHNlO1xuXHRcdFx0dGhpcy4kZnJhbWVXcmFwcGVyLmNzcyhcInotaW5kZXhcIiwgLTEpO1xuXHRcdFx0dGhpcy51bnNjcm9sbCgpO1xuXHRcdFx0JHRpdGxlQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwidXBcIik7XG4gICAgICAgICAgICBcblx0XHRcdHNldFRpbWVvdXQodGhpcy5fZGVhY3RpdmF0ZS5iaW5kKHRoaXMpLCAxNTAwICogaW5zdGFudCArIDEpO1xuICAgICAgICAgICAgXG5cdFx0XHQkZXhpdEZyYW1lLmFuaW1hdGUoe1xuXHRcdFx0XHRcIm9wYWNpdHlcIjogMFxuXHRcdFx0fSwgMTAwMCk7XG4gICAgICAgICAgICBcblx0XHRcdCR1bnNjcm9sbEZyYW1lLnN0b3AoKS5hbmltYXRlKHtcblx0XHRcdFx0XCJvcGFjaXR5XCI6IDBcblx0XHRcdH0sIDEwMDApO1xuXHRcdFx0JGV4aXRGcmFtZS5jc3MoXCJjdXJzb3JcIiwgXCJkZWZhdWx0XCIpO1xuXHRcdH1cblx0XHRfZGVhY3RpdmF0ZSgpIHtcblx0XHRcdHRoaXMuJGZyYW1lLmFuaW1hdGUoe1xuXHRcdFx0XHRcIm9wYWNpdHlcIjogMFxuXHRcdFx0fSwgMTAwMCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMuJGZyYW1lV3JhcHBlci5jc3Moe1xuXHRcdFx0XHRcdFwidG9wXCI6IHdpbmRvdy5pbm5lckhlaWdodCAtIHBhcnNlRmxvYXQoJGZyYW1lQ29udGFpbmVyLmNzcyhcInRvcFwiKSkgLyAyICsgXCJweFwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0dXBkYXRlKCkge1xuXHRcdFx0aWYgKHRoaXMuZnJhbWVBcHBlbmRlZCkge1xuXHRcdFx0XHR2YXIgZnJhbWVEb2NIZWlnaHQgPSB0aGlzLiRmcmFtZS5jb250ZW50cygpLmZpbmQoXCJodG1sXCIpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZyYW1lRG9jSGVpZ2h0KVxuXHRcdFx0XHRpZiAodGhpcy5mcmFtZUhlaWdodCAhPT0gZnJhbWVEb2NIZWlnaHQpIHtcblx0XHRcdFx0XHR0aGlzLmZyYW1lSGVpZ2h0ID0gZnJhbWVEb2NIZWlnaHQ7XG5cdFx0XHRcdFx0dGhpcy4kZnJhbWUuaGVpZ2h0KGZyYW1lRG9jSGVpZ2h0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLiRmcmFtZS5jc3MoXCJ0b3BcIiwgdGhpcy5mcmFtZVNjcm9sbCArIFwicHhcIik7XG4gICAgICAgICAgICBcblx0XHRcdHRoaXMuZHJpZnQoKTtcblx0XHR9XG5cdH1cbiAgICBcblxuICAgIFxuXHR2YXIgYnViYmxlcyA9IFtcblx0XHRuZXcgTGlua0J1YmJsZSh7XG5cdFx0XHR4OiAzMCxcblx0XHRcdHNpemU6IDcsXG5cdFx0XHRzb3VyY2U6IFwicmVzdW1lLmh0bWxcIixcblx0XHRcdHRpdGxlOiBcIlJlc3VtZVwiXG5cdFx0fSksXG5cdFx0bmV3IExpbmtCdWJibGUoe1xuXHRcdFx0eDogNDAsXG5cdFx0XHRzaXplOiA3LjUsXG5cdFx0XHRzb3VyY2U6IFwiYWJvdXQuaHRtbFwiLFxuXHRcdFx0dGl0bGU6IFwiQWJvdXQgTWVcIlxuXHRcdH0pLFxuXHRcdG5ldyBMaW5rQnViYmxlKHtcblx0XHRcdHg6IDUwLFxuXHRcdFx0c2l6ZTogNi41LFxuXHRcdFx0c291cmNlOiBcImJsb2cvaW5kZXguaHRtbFwiLFxuXHRcdFx0dGl0bGU6IFwiTXkgQmxvZ1wiXG5cdFx0fSksXG5cdFx0bmV3IExpbmtCdWJibGUoe1xuXHRcdFx0eDogNjAsXG5cdFx0XHRzaXplOiA3LFxuXHRcdFx0c291cmNlOiBcIndvcmsuaHRtbFwiLFxuXHRcdFx0dGl0bGU6IFwiTXkgV29ya1wiXG5cdFx0fSksXG5cdFx0bmV3IExpbmtCdWJibGUoe1xuXHRcdFx0eDogNzAsXG5cdFx0XHRzaXplOiA3LjUsXG5cdFx0XHRzb3VyY2U6IFwiY29udGFjdC5odG1sXCIsXG5cdFx0XHR0aXRsZTogXCJDb250YWN0IE1lXCJcblx0XHR9KVxuXHRdO1xuICAgIFxuICAgIFxuXHQkZXhpdEZyYW1lLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdHNjcm9sbE1vbWVudHVtID0gMDtcblx0XHRpZiAoYWN0aXZlRnJhbWUpIHtcblx0XHRcdGFjdGl2ZUZyYW1lLmRlYWN0aXZhdGUoKTtcblx0XHR9XG5cdH0pO1xuICAgIFxuXHQkdW5zY3JvbGxGcmFtZS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRzY3JvbGxNb21lbnR1bSA9IDA7XG5cdFx0aWYgKGFjdGl2ZUZyYW1lICYmIGFjdGl2ZUZyYW1lLnNjcm9sbGVkKSB7XG5cdFx0XHRhY3RpdmVGcmFtZS51bnNjcm9sbCgpO1xuXHRcdH1cblx0fSk7XG4gICAgXG5cdCRzdWJoZWFkLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdCRzdWJoZWFkLnRleHQoc3ViaGVhZE1zZ1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdWJoZWFkTXNnLmxlbmd0aCldKVxuXHR9KTtcbiAgICBcbiAgICBcbiAgICBcblx0ZnVuY3Rpb24gdXBkYXRlUGFnZSgpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJ1YmJsZXMubGVuZ3RoOyBpICsrKSB7XG5cdFx0XHRidWJibGVzW2ldLnVwZGF0ZSgpO1xuXHRcdH1cbiAgICAgICAgXG5cdFx0aWYgKGFjdGl2ZUZyYW1lKSB7XG5cdFx0XHRhY3RpdmVGcmFtZS5hZGRTY3JvbGwoc2Nyb2xsTW9tZW50dW0pO1xuXHRcdFx0c2Nyb2xsTW9tZW50dW0gKj0gMC45O1xuXHRcdH1cbiAgICAgICAgXG5cdFx0c2V0VGltZW91dCh1cGRhdGVQYWdlLCAxMCk7XG5cdH1cbiAgICBcbiAgICBmdW5jdGlvbiBzY3JvbGxMaXN0ZW5lcihldmVudCkge1xuICAgICAgICBpZiAoYWN0aXZlRnJhbWUpIHtcbiAgICAgICAgICAgIHNjcm9sbE1vbWVudHVtICs9IGV2ZW50Lm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSAqIFNDUk9MTF9DT0VGRjtcbiAgICAgICAgfVxuICAgIH1cblxuXHQkYm9keS5tb3VzZXdoZWVsKHNjcm9sbExpc3RlbmVyKTtcblxuXHRzZXRUaW1lb3V0KHVwZGF0ZVBhZ2UsIDEpO1xuICAgIFxuXHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYnViYmxlcy5sZW5ndGg7IGkgKyspIHtcblx0XHRcdGJ1YmJsZXNbaV0uY2FsY1BvcygpO1xuXHRcdH1cblx0fSk7XG59KTtcbiJdfQ==
