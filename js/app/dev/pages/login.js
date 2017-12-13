webpackJsonp([0],{

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_app__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils___ = __webpack_require__(1);
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */



'use strict';

( function( doc ) {

	__WEBPACK_IMPORTED_MODULE_0__utils_app__["a" /* default */].init().then( _ => {
		const formLogin = Object(__WEBPACK_IMPORTED_MODULE_1__utils___["a" /* $ */])( '#form-login' );
		const tbUn = Object(__WEBPACK_IMPORTED_MODULE_1__utils___["a" /* $ */])( '[name="username"]' );
		const tbPwd = Object(__WEBPACK_IMPORTED_MODULE_1__utils___["a" /* $ */])( '[name="password"]' );
		const btnLogin = Object(__WEBPACK_IMPORTED_MODULE_1__utils___["a" /* $ */])( '#btn-login' );
		const status = Object(__WEBPACK_IMPORTED_MODULE_1__utils___["a" /* $ */])( '#status' );

		if ( doc.URL.indexOf( '?lgnfail' ) !== -1 ) {
			status.innerHTML = '<p class="error">Login failed, please try again.</p>';
			status.classList.remove( 'hidden' );
		}

		const formKeyPress = e => {
			if ( e.keyCode === 13 ) {
				loginUser( e );
			}
		};

		const loginUser = e => {
			const un = tbUn.value.trim();
			const pwd = tbPwd.value.trim();

			if ( un === '' || pwd === '' ) {
				status.innerHTML = '<p>Both username and password are required.</p>';
				status.classList.remove( 'hidden' );

				if ( un === '' ) {
					tbUn.focus();
				}
				else {
					tbPwd.focus();
				}

				e.preventDefault();
				return;
			}
		};

		tbUn.addEventListener( 'keypress', formKeyPress, false );
		tbPwd.addEventListener( 'keypress', formKeyPress, false );
		btnLogin.addEventListener( 'click', loginUser, false );
		formLogin.addEventListener( 'submit', loginUser, false );
	} );

}( document ) );

/***/ })

},[4]);