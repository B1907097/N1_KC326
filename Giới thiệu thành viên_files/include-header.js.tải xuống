import * as JQuery from '/modules/jquery.min.js'


$('#header').load('/header/header.html', (response, status, xhr) => {

// 	switch ($('#header').attr("data-active")) {
// 		case 'calc':
// 			$('#calc').addClass("active");
// 			break;
// 		case 'chart':
// 			$('#chart').addClass("active");
// 			break;
// 
// 	}

	const headerLoaded = new CustomEvent('headerLoaded')
	window.dispatchEvent(headerLoaded)


})