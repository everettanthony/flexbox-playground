/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */
import App from '../utils/app';
import { $ } from '../utils/$';

'use strict';

( function( doc ) {

	App.init().then( _ => {
		const formLogin = $( '#form-login' );
		const tbUn = $( '[name="username"]' );
		const tbPwd = $( '[name="password"]' );
		const btnLogin = $( '#btn-login' );
		const status = $( '#status' );

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