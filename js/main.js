AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});

jQuery(document).ready(function ($) {

	"use strict";

	$(".loader").delay(1000).fadeOut("slow");
	$("#overlayer").delay(1000).fadeOut("slow");

	const scrollToTop = document.getElementById('scroll-to-top');
	let dataShow = false;
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50 && !dataShow) {
			scrollToTop.setAttribute('data-show', 'true');
			dataShow = true;
		}

		if (window.scrollY <= 50 && dataShow) {
			scrollToTop.setAttribute('data-show', 'false');
			dataShow = false;
		}
	});
	scrollToTop.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	$(".owl-carousel").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		responsive: {
			0: {
				items: 2
			},
			768: {
				items: 4
			},
			900: {
				items: 6
			}
		}
	});

	var siteMenuClone = function () {

		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();

	var siteSticky = function () {
		$(".js-sticky-header").sticky({ topSpacing: 0 });
	};
	siteSticky();

	// // navigation
	// var OnePageNavigation = function () {
	// 	var navToggler = $('.site-menu-toggle');
	// 	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function (e) {
	// 		e.preventDefault();

	// 		var hash = this.hash;

	// 		$('html, body').animate({
	// 			'scrollTop': $(hash).offset().top
	// 		}, 600, 'easeInOutExpo', function () {
	// 			window.location.hash = hash;
	// 		});

	// 	});
	// };
	// OnePageNavigation();

	var siteScroll = function () {
		$(window).scroll(function () {
			var st = $(this).scrollTop();

			if (st > 100) {
				$('.js-sticky-header').addClass('shrink');
			} else {
				$('.js-sticky-header').removeClass('shrink');
			}

		})

	};
	siteScroll();

	// scrollspy
	$('.page').css('height', $(window).height());
	var sections = [];
	var id = false;
	var $navbara = $('#navigation-scrollspy a');

	$navbara.click(function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 180
		}, 100);
		hash($(this).attr('href'));
	});

	$navbara.each(function () {
		sections.push($($(this).attr('href')));
	})

	$(window).scroll(function (e) {
		var scrollTop = $(this).scrollTop() + ($(window).height() / 2);
		for (var i in sections) {
			var section = sections[i];
			if (scrollTop > section.offset().top) {
				var scrolled_id = section.attr('id');
			}
		}
		if (scrolled_id !== id) {
			id = scrolled_id;
			$($navbara).removeClass('current');
			$('#navigation-scrollspy a[href="#' + id + '"]').addClass('current');
		}
	})

	$('.fancybox').on('click', function () {
		var visibleLinks = $('.fancybox');

		$.fancybox.open(visibleLinks, {}, visibleLinks.index(this));

		return false;
	});

});