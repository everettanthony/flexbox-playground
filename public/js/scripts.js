// Mobile Navigation Open and Close

const mblNav = function() {
	const btnMblNav = document.querySelector('.menu-icon');

	btnMblNav.addEventListener( 'click', e => {
		btnMblNav.classList.toggle('active');
		document.body.classList.toggle('nav-in');
	});
}

mblNav();
