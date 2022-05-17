define( [
  'text!./LandingPage.html',
  './LandingPageApi'
], function ( template, http ) {
	return {
		template: template,
		data: function() {
			return {
				param: {
					from: '',
					to: 'ksumikim@gmail.com',
					subject: '',
					text: ''
				},
				files: []
			}
		},
		mounted: function () {
			this.setEvent();
		},
		methods: {
			setEvent: function() {
				// sliding event
				var sliders = this.$refs.bodyContent.children;

				var appearOptions = {
					threshold: 0,
					rootMargin: '0px 0px -350px 0px'
				};

				var appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
					entries.forEach( function( entry ) {
						if (!entry.isIntersecting) {
							return;
						} else {
							entry.target.classList.add('appear');
							appearOnScroll.unobserve(entry.target);
						}
					});
				}, appearOptions);

				sliders.forEach( function( slide ) {
					appearOnScroll.observe( slide );
				} );

				// typing event
				var typedText = this.$refs.typedText;
				var textsToBeTyped = [ 'My Website', 'Portfolio', 'Playground' ];
				var index = 0, isAdding = true, textToBeTypedIdx = 0;

				function playAnimation() {
					setTimeout(function () {
					  // set the text of typeText to a substring of
					  // the textToBeTyped using index.
					  typedText.innerText = textsToBeTyped[ textToBeTypedIdx ].slice(0, index);
					  if (isAdding) {
						// adding text
						if (index > textsToBeTyped[ textToBeTypedIdx ].length) {
						  // no more text to add
						  isAdding = false;
						  //break: wait 2s before playing again
						  setTimeout( function () {
							playAnimation();
						  }, 2000)
						  return
						} else {
						  // increment index by 1
						  index++;
						}
					  } else {
						// removing text
						if (index === 0) {
						  // no more text to remove
						  isAdding = true;
						  textToBeTypedIdx = (textToBeTypedIdx + 1) % textsToBeTyped.length;
						} else {
						  // decrement index by 1
						  index--;
						}
					  }
					  // call itself
					  playAnimation();
					}, 120)
				  }

				  // start animation
				  playAnimation();
			},
			sendMail: function() {
				var _this = this;

				http.sendMail( this.param, this.files ).then( function() {
					_this.param = {
						from: '',
						to: '',
						subject: '',
						text: ''
					};
					_this.files = [];
				} );
			},
			addTypingEvent: function() {
				var typedText = this.$refs.typedText;
				var textsToBeTyped = [ 'My Website', 'Portfolio', 'Workplace', 'Playground' ];
				var index = 0, isAdding = true, textToBeTypedIdx = 0;

				function playAnimation() {
					setTimeout(function () {
					  // set the text of typeText to a substring of
					  // the textToBeTyped using index.
					  typedText.innerText = textsToBeTyped[ textToBeTypedIdx ].slice(0, index);
					  if (isAdding) {
						// adding text
						if (index > textsToBeTyped[ textToBeTypedIdx ].length) {
						  // no more text to add
						  isAdding = false;
						  //break: wait 2s before playing again
						  setTimeout( function () {
							playAnimation();
						  }, 2000)
						  return
						} else {
						  // increment index by 1
						  index++;
						}
					  } else {
						// removing text
						if (index === 0) {
						  // no more text to remove
						  isAdding = true;
						  textToBeTypedIdx = (textToBeTypedIdx + 1) % textsToBeTyped.length;
						} else {
						  // decrement index by 1
						  index--;
						}
					  }
					  // call itself
					  playAnimation();
					}, 120)
				  }
				  // start animation
				  playAnimation();
			}
		}
	}
} );
