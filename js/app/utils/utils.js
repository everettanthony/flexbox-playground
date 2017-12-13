//@ts-check
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */
'use strict';

/**
 * @export
 * @param {any} obj
 * @returns {object}
 */
export function cloneObj( obj ) {
	return JSON.parse( JSON.stringify( obj ) );
}

/**
 * @export
 * @param {any} obj1
 * @param {any} obj2
 * @returns {object}
 */
export function extend( obj1, obj2 ) {
	var obj = obj1;

	for ( var key in obj2 ) {
		obj[key] = obj2[key];
	}

	return obj;
}

/**
 * @export
 * @returns {number} - The current scroll position of the window
 */
export function getWindowScrollPosition() {
	if ( typeof window.scrollY === 'undefined' ) {
		return document.documentElement.scrollTop;
	}
	else {
		return window.scrollY;
	}
}

/**
 * @export
 * @param {string} url
 * @param {any} callback
 * @returns {Promise}
 */
export function loadScript( url, callback ) {
	if ( typeof self.Promise === 'undefined' || !self.Promise ) {
		return {
			then: fn => polyfillPromises( _ => loadScript( url, fn ) )
		};
	}

	return new Promise( ( resolve, reject ) => {
		const script = document.createElement( 'script' );
		script.src = url;
		script.async = true;

		script.onload = _ => {
			resolve( script );

			if ( callback && typeof callback === 'function' ) {
				callback( script );
			}
		};

		script.onerror = reject;

		document.body.appendChild( script );
	} );
}

/**
 * @export
 * @param {string} url
 * @param {any} callback
 * @returns {Promise}
 */
export function preloadImage( url, callback ) {
	if ( typeof self.Promise === 'undefined' || !self.Promise ) {
		return {
			then: fn => polyfillPromises( _ => preloadImage( url, fn ) )
		};
	}

	return new Promise( ( resolve, reject ) => {
		const img = new Image();
		img.src = url;
		img.addEventListener( 'onload', _ = resolve() );
		img.addEventListener( 'onerror', _ = reject() );

		if ( callback && typeof callback === 'function' ) {
			console.log( 'not here?' );
			callback();
		}
	} );
}

/**
 * @export
 * @param {any} predicate
 * @param {string} msg
 * @returns {boolean}
 */
export function assert( predicate, msg ) {
	if ( predicate ) {
		return;
	}

	console.error( msg );
}

/**
 * @export
 * @param {any} fn
 */
export function polyfillPromises( fn ) {
	const script = document.createElement( 'script' );
	script.src = '/bower_components/es6-promise/promise.min.js';
	script.async = true;
	script.onload = fn;
	document.body.appendChild( script );
}

/**
 * @export
 * @param {any} fn
 */
export function polyfillFetch( fn ) {
	const script = document.createElement( 'script' );
	script.src = '/bower_components/fetch/fetch.min.js';
	script.async = true;
	script.onload = fn;
	document.body.appendChild( script );
}

/**
 * @export
 * @param {string} mediaQuery
 * @returns {boolean}
 */
export function mq( mediaQuery ) {
	return !( window.matchMedia ) || ( window.matchMedia && window.matchMedia( mediaQuery ).matches );
}