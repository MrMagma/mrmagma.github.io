$(document).ready(function() {

	const DEG_RAD_CONST = Math.PI * 2;
	const SCROLL_COEFF = 0.05;


	var $window = $(window);

	var $body = $(document.body);

	var $titleContainer = $(".title-container");

	var $head = $(".title");
	var $subhead = $("<p class='title-sub'>Inventor of the potatoe</p>");

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



	var Bubble = Class.extend({
		init: function(cfg) {
			this.$element = $("<div class='bubble'></div>");
			this.$title = $("<p class='bubble-title'>" + cfg.title + "</p>");

			this.$element.append(this.$title);
			$bubbleContainer.append(this.$element);

			this.relPos = {
				x: cfg.x,
				y: cfg.y,
				size: cfg.size
			};

			this.pxPos = {
				x: null,
				y: null,
				size: null
			};

			this.$element.click(this.onClickWrapper.bind(this));

			this.calcPos();

			this.uid = Date.now();
		},
		onClickWrapper: function() {
			this.onClick();
		},
		onClick: function() {

		},
		calcPos: function() {
			this.pxPos.size = this.relPos.size / 100 * parseFloat(this.$element.parent().width());
			this.pxPos.x = this.relPos.x / 100 * parseFloat(this.$element.parent().width()) - this.pxPos.size / 2;
			this.pxPos.y = 0;

			this.$element.css({
				"top": this.pxPos.y + "px",
				"left": this.pxPos.x + "px",
				"width": this.pxPos.size + "px",
				"height": this.pxPos.size + "px"
			});
			this.$title.css({
				"top": this.pxPos.size / 2 - parseFloat(this.$title.css("height")) / 2,
				"left": this.pxPos.size / 2 - parseFloat(this.$title.css("width")) / 2
			});
		},
		update: function() {
			
		}
	});



	var activeFrame = null;



	var LinkBubble = Bubble.extend({
		init: function(cfg) {
			this._super(cfg);

			this.source = cfg.source;

			this.cosSeed = Math.random() * 360 / DEG_RAD_CONST;

			this.frameAppended = false;

			this.$frameWrapper = $("<div class='frame-wrapper'></div>");
			this.$frame = $("<iframe class='frame-content'></iframe>");

			this.$frame.attr({
				/* seamless: "seamless", */
				frameborder: "0",
				scrolling: "no",
				src: this.source
			})

			this.$frameWrapper.append(this.$frame);

			this.$frameContents = this.$frame.contents().find("html");

			this.wrapperTop = parseFloat($frameContainer.css("top"));

			this.$frameWrapper.css({
				"top": this.wrapperTop + "px"
			});

			this.frameScroll = 0;

			this.frameHeight = 0;
		},
		drift: function() {
			this.cosSeed += 0.03;
			this.cosSeed %= 360;
			this.$element.css({
				"top": (this.pxPos.y + Math.cos(this.cosSeed) * this.pxPos.size / 15) + "px"
			});
		},
		onClick: function() {
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
			$titleContainer.css("top", "5em");

			// Magicks!
			this.animateIn();

			$exitFrame.animate({
				"opacity": 1
			}, 1000);
			$exitFrame.css("cursor", "pointer");
		},
		animateIn: function() {
			/* Don't even ask me why this method works. I don't even know, it just works. This scares me */
			if (parseFloat(this.$frameWrapper.css("top")) > 0) {
				this.$frameWrapper.css("top", "0px");
				setTimeout(this.animateIn.bind(this), 1);
			}
		},
		unscroll: function() {
			setTimeout(this._unscroll.bind(this), 1)
		},
		_unscroll: function(times) {
			scrollMomentum = 0;
			times = times + 1 || 0;
			this.frameScroll += 1.2 * times;
			if (-this.frameScroll > 0) {
				setTimeout(this._unscroll.bind(this, times), 7)
			} else {
				console.log("Shtuff!");
				this.frameScroll = 0;
				this.scrolled = false;
				$unscrollFrame.stop().animate({
					"opacity": 0
				}, 1000);
				$unscrollFrame.css("cursor", "default");
			}
		},
		addScroll: function(amount) {
			console.log(this.wrapperTop + " : " + window.innerHeight);
			if (this.wrapperTop + this.frameHeight < window.innerHeight) return;

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
		},
		deactivate: function(instant) {
			instant = instant || false;
			this.$frameWrapper.css("z-index", -1);
			this.unscroll();
			$titleContainer.css("top", "18em");

			setTimeout(this._deactivate.bind(this), 1500 * instant + 1);

			$exitFrame.animate({
				"opacity": 0
			}, 1000);

			$unscrollFrame.stop().animate({
				"opacity": 0
			}, 1000);
			$exitFrame.css("cursor", "default");
		},
		_deactivate: function() {
			this.$frame.animate({
				"opacity": 0
			}, 1000, function() {
				this.$frameWrapper.css({
					"top": window.innerHeight - parseFloat($frameContainer.css("top")) / 2 + "px"
				});
			}.bind(this));
		},
		update: function() {
			var frameDocHeight = this.$frame.contents().find("html").height();

			if (this.frameHeight !== frameDocHeight) {
				this.frameHeight = frameDocHeight;
				this.$frame.height(frameDocHeight);
			}

			this.$frame.css("top", this.frameScroll + "px");

			this.drift();
		}
	});



	var bubbles = [
		new LinkBubble({
			x: 30,
			y: 50,
			size: 7,
			source: "pages/resume.html",
			title: "Resume"
		}),
		new LinkBubble({
			x: 40,
			y: 50,
			size: 7.5,
			source: "pages/about.html",
			title: "About Me"
		}),
		new LinkBubble({
			x: 50,
			y: 50,
			size: 6.5,
			source: "pages/blog.html",
			title: "My Blog"
		}),
		new LinkBubble({
			x: 60,
			y: 50,
			size: 7,
			source: "pages/work.html",
			title: "My Work"
		}),
		new LinkBubble({
			x: 70,
			y: 50,
			size: 7.5,
			source: "pages/contact.html",
			title: "Contact Me"
		})
	];


	$exitFrame.click(function() {
		scrollMomentum = 0;
		if (activeFrame) {
			activeFrame.deactivate();
		}
	});

	$unscrollFrame.click(function() {
		scrollMomentum = 0;
		if (activeFrame && activeFrame.scrolled) {
			activeFrame.unscroll();
		}
	})



	function updatePage() {
		for (var i = 0; i < bubbles.length; i ++) {
			bubbles[i].update();
		}
		if (activeFrame) {
			activeFrame.addScroll(scrollMomentum);
			scrollMomentum *= 0.9;
		}

		setTimeout(updatePage, 10);
	}

	$body.mousewheel(function(event) {
		if (activeFrame) {
			scrollMomentum += event.originalEvent.wheelDelta * SCROLL_COEFF;
		}
	});

	setTimeout(updatePage, 1)
});