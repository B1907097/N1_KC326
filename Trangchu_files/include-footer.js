import * as JQuery from '/modules/jquery.min.js'


$('#footer').load('/footer/footer.html', (response, status, xhr) => {

	const headerLoaded = new CustomEvent('headerLoaded')
	window.dispatchEvent(headerLoaded)


})
