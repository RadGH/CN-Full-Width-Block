// limit the height of certain responsive elements so they are not taller than the browser window.
jQuery(function() {

	// Select all elements which use the padding-bottom trick to stay responsive. The immediate child must be positioned absolutely.
	let $videos = jQuery('.cn-full-width');
	if ( $videos.length < 1 ) return;

	$videos.wrap( jQuery('<div>', {class: 'adjustable-video-container'}) );

	let $elements = $videos.parent('.adjustable-video-container');

	let resize_elements = function() {
		// Set a width if the video is too tall
		let window_height = jQuery(window).height() - 10;

		$elements.each(function() {
			let element_height = jQuery(this).outerHeight();
			let element_width = jQuery(this).outerWidth();

			if ( element_height > window_height ) {
				let ratio = element_width / element_height; // 16:9 landscape = 9/16 = 0.5625
				let target_width = window_height * ratio;
				jQuery(this).width( target_width ).addClass('width-adjusted');
			}else{
				jQuery(this).removeClass('width-adjusted');
			}
		});
	};

	let on_browser_resize = function() {
		// Reset width of all videos
		$elements.width('');

		if ( typeof requestAnimationFrame === 'function' ) {
			requestAnimationFrame( resize_elements );
		}else{
			setTimeout( resize_elements, 32 );
		}
	};

	// On resize, debounce any extra resize events for 150ms to prevent calling too frequently.
	// Then do the browser resize when resizing stops.
	let debounce = false;
	jQuery(window).on('resize', function() {
		if ( typeof debounce !== false ) clearTimeout(debounce);
		debounce = setTimeout(function(){ on_browser_resize(); debounce = false; }, 150 );
	});

	// Run on load
	on_browser_resize();
});

