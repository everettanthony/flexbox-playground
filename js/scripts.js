// JS Action

const mblNav = document.querySelector('.menu-icon');
const bWidth = window.innerWidth;

mblNav.addEventListener( 'click', e => {
	mblNav.classList.toggle('active');
	document.body.classList.toggle('nav-in');
});