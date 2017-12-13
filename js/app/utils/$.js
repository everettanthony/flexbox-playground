//@ts-check
/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
'use strict';

// Polyfill for Array.from
/* eslint-disable */
if ( !Array.from ) { Array.from = function () { var l = Object.prototype.toString, h = function ( c ) { return 'function' === typeof c || '[object Function]' === l.call( c ) }, m = Math.pow( 2, 53 ) - 1; return function ( c ) { var k = Object( c ); if ( null == c ) throw new TypeError( 'Array.from requires an array-like object - not null or undefined' ); var d = 1 < arguments.length ? arguments[1] : void 0, f; if ( 'undefined' !== typeof d ) { if ( !h( d ) ) throw new TypeError( 'Array.from: when provided, the second argument must be a function' ); 2 < arguments.length && ( f = arguments[2] ) } var a; a = Number( k.length ); a = isNaN( a ) ? 0 : 0 !== a && isFinite( a ) ? ( 0 < a ? 1 : -1 ) * Math.floor( Math.abs( a ) ) : a; a = Math.min( Math.max( a, 0 ), m ); for ( var g = h( this ) ? Object( new this( a ) ) : Array( a ), b = 0, e; b < a; )e = k[b], g[b] = d ? 'undefined' === typeof f ? d( e, b ) : d.call( f, e, b ) : e, b += 1; g.length = a; return g } }(); }
/* eslint-enable */

/**
 * @param {any} expr
 * @param {any} context?
 * @returns {HTMLElement} DOM Element matched by expr selector in context
 */
export const $ = ( expr, context ) => typeof expr === 'string' ? ( context || document ).querySelector( expr ) : expr || null;

/**
 * @param {string} expr
 * @param {any} context?
 * @returns {array} Array of DOM Elements from a DOM Nodelist selected by expr selector in context
 */
export const $$ = ( expr, context ) => Array.from( typeof expr === 'string' ? ( context || document ).querySelectorAll( expr ) : expr || null );