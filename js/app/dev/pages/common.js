/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
//@ts-check
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */


'use strict';

class App {
    static init() {
        if ( typeof self.Promise === 'undefined' || !self.Promise ) {
            return {
                then: fn => __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* polyfillPromises */]( _ => this._onInit( fn ) )
            };
        }

        return this._onInit();
    }

    static _onInit( fn ) {
        return new Promise( ( resolve, reject ) => {
            try {
                this._installServiceWorker();
                resolve();

                if ( fn && typeof fn === 'function' ) {
                    fn();
                }
            }
            catch ( err ) {
                console.log( `Error in App.init -> ${err}` );
                reject();
            }
        } );
    }

    static _installServiceWorker() {
        if ( 'serviceWorker' in navigator && document.URL.indexOf( 'localhost' ) === -1 ) {
            navigator.serviceWorker.register( '/js/app/utils/serviceworker.js' )
                .then( registration => console.log( `Serviceworker registered successfully with scope ${registration.scope}` ) )
                .catch( err => console.log( `Unable to register service worker. ${err}` ) );
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿//@ts-check
/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/


// Polyfill for Array.from
/* eslint-disable */
if ( !Array.from ) { Array.from = function () { var l = Object.prototype.toString, h = function ( c ) { return 'function' === typeof c || '[object Function]' === l.call( c ) }, m = Math.pow( 2, 53 ) - 1; return function ( c ) { var k = Object( c ); if ( null == c ) throw new TypeError( 'Array.from requires an array-like object - not null or undefined' ); var d = 1 < arguments.length ? arguments[1] : void 0, f; if ( 'undefined' !== typeof d ) { if ( !h( d ) ) throw new TypeError( 'Array.from: when provided, the second argument must be a function' ); 2 < arguments.length && ( f = arguments[2] ) } var a; a = Number( k.length ); a = isNaN( a ) ? 0 : 0 !== a && isFinite( a ) ? ( 0 < a ? 1 : -1 ) * Math.floor( Math.abs( a ) ) : a; a = Math.min( Math.max( a, 0 ), m ); for ( var g = h( this ) ? Object( new this( a ) ) : Array( a ), b = 0, e; b < a; )e = k[b], g[b] = d ? 'undefined' === typeof f ? d( e, b ) : d.call( f, e, b ) : e, b += 1; g.length = a; return g } }(); }
/* eslint-enable */

/**
 * @param {any} expr
 * @param {any} context?
 * @returns {HTMLElement} DOM Element matched by expr selector in context
 */
const $ = ( expr, context ) => typeof expr === 'string' ? ( context || document ).querySelector( expr ) : expr || null;
/* harmony export (immutable) */ __webpack_exports__["a"] = $;


/**
 * @param {string} expr
 * @param {any} context?
 * @returns {array} Array of DOM Elements from a DOM Nodelist selected by expr selector in context
 */
const $$ = ( expr, context ) => Array.from( typeof expr === 'string' ? ( context || document ).querySelectorAll( expr ) : expr || null );
/* unused harmony export $$ */


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cloneObj */
/* unused harmony export extend */
/* unused harmony export getWindowScrollPosition */
/* unused harmony export loadScript */
/* unused harmony export preloadImage */
/* unused harmony export assert */
/* harmony export (immutable) */ __webpack_exports__["a"] = polyfillPromises;
/* unused harmony export polyfillFetch */
/* unused harmony export mq */
﻿//@ts-check
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */


/**
 * @export
 * @param {any} obj
 * @returns {object}
 */
function cloneObj( obj ) {
	return JSON.parse( JSON.stringify( obj ) );
}

/**
 * @export
 * @param {any} obj1
 * @param {any} obj2
 * @returns {object}
 */
function extend( obj1, obj2 ) {
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
function getWindowScrollPosition() {
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
function loadScript( url, callback ) {
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
function preloadImage( url, callback ) {
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
function assert( predicate, msg ) {
	if ( predicate ) {
		return;
	}

	console.error( msg );
}

/**
 * @export
 * @param {any} fn
 */
function polyfillPromises( fn ) {
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
function polyfillFetch( fn ) {
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
function mq( mediaQuery ) {
	return !( window.matchMedia ) || ( window.matchMedia && window.matchMedia( mediaQuery ).matches );
}

/***/ })
/******/ ]);