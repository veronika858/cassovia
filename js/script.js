String.prototype.capitalize = function () {
	return this.charAt().toUpperCase(0) + this.slice(1);

};


(function ($) {

	/*najlepsie produkty/ najnovsie produkty*/


	var menu = $('.menu-products'),
		menuLinks = menu.find('a'),
		gallery = $('.products-card'),
		galleries = $('.products-group');


	galleries.not(':first').hide();


// vytvorime loading class a pridame do galerie
	var loading = $('<div class="container load-wrapp"><div class="line-line"><div class="cssload-main">\n' +
		'\t\t<div class="cssload-heart">\n' +
		'\t\t<span class="cssload-heartL"></span>\n' +
		'\t\t<span class="cssload-heartR"></span>\n' +
		'\t\t<span class="cssload-square"></span>\n' +
		'\t\t</div>\n' +
		'\t\t<div class="cssload-shadow"></div>\n' +
		'\t\t</div></div></div>');
	loading.appendTo(gallery);


	menuLinks.on('click', function (event) {


		event.preventDefault();


		var a = $(this),
			li = a.parent();


		if (li.is('.selected') || loading.is(':visible')) {
			return;
		}

		var href = a.attr('href'),
			currentGallery = gallery.find(galleries);


		li.addClass('selected active')
			.siblings('li').removeClass('selected active');


		var id = href;
		console.log((id));


		if (gallery.find(id).length) {

			currentGallery.hide();
			$(id).fadeIn();

		} else {

			loadNewGallery(href);

		}

		function loadNewGallery(href) {


			currentGallery.hide();
			loading.fadeIn();


			var request = $.ajax({
				url: href
			});

			request.done(function (data) {

				var newGallery = $(data).find('.products-group');
				newGallery.addClass('fadeIn' + selected.data('from').capitalize());

				newGallery
					.hide()
					.appendTo(gallery)
					.delay(550)
					.fadeIn();


				currentGallery.hide();

			});

			request.fail(function () {

				alert('nepodarilo sa:(');

			});


			request.always(function () {

				loading.delay(200).fadeOut();

			});

		}

	});




/*carousel*/

	$('#carousel-example').on('slide.bs.carousel', function (e) {

		var $e = $(e.relatedTarget);
		var idx = $e.index();
		var itemsPerSlide = 5;
		var totalItems = $('#carousel-example').find('.carousel-item');
		var totalItems2 = totalItems.length;


		console.log(totalItems2 + 'item');

		if (idx >= totalItems2-(itemsPerSlide-1)) {
			var it = itemsPerSlide - (totalItems2 - idx);
			console.log(it + 'it');
			for (var i=0; i<it; i++) {

				// append slides to end
				if (e.direction==="left") {
					totalItems.eq(i).appendTo('.carousel1');
				}
				else {
					totalItems.eq(0).appendTo('.carousel1');
				}
			}
		}
	});



	$('#carousel-example2').on('slide.bs.carousel', function (event) {

		var $e2 = $(event.relatedTarget);
		var idx2 = $e2.index();
		var itemsPerSlide2 = 5;
		var totalItems3 = $('.newP');
		var totalItems4 = totalItems3.length;
		console.log(totalItems4 + 'item2');

		if (idx2 >= totalItems4-(itemsPerSlide2-1)) {
			var it2 = itemsPerSlide2 - (totalItems4 - idx2);
			console.log(it2 + 'it2');
			for (var i=0; i<it2; i++) {

				// append slides to end
				if (event.direction==="left") {
					$('.newP').eq(i).appendTo('.carousel2');
				}
				else {
					$('.newP').eq(0).appendTo('.carousel2');
				}
			}
		}
	});


	(function () {

		$('#carousel-example').carousel({interval: 2000});
		$('#carousel-example2').carousel({interval: 3000});
	}());


})(jQuery);
