webpackJsonp([0],[
/* 0 */
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
/* harmony export (immutable) */ __webpack_exports__["b"] = $$;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cloneObj;
/* harmony export (immutable) */ __webpack_exports__["b"] = extend;
/* harmony export (immutable) */ __webpack_exports__["c"] = getWindowScrollPosition;
/* harmony export (immutable) */ __webpack_exports__["d"] = loadScript;
/* unused harmony export preloadImage */
/* unused harmony export assert */
/* harmony export (immutable) */ __webpack_exports__["g"] = polyfillPromises;
/* harmony export (immutable) */ __webpack_exports__["f"] = polyfillFetch;
/* harmony export (immutable) */ __webpack_exports__["e"] = mq;
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = doFetch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(1);
﻿/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/




function doFetch( url, options, type, callbackFn ) {
	var opts, headers;

	// if no url was passed in break now
	if ( !url ) {
		console.warn( 'No url provided to fetch' );
		return;
	}

	// if the promise polyfill hasn't loaded yet
	//   overwrite .then and wait 100 milliseconds then try again.
	if ( typeof self.Promise === 'undefined' || !self.Promise ) {
		return {
			then: fn => __WEBPACK_IMPORTED_MODULE_0__utils_utils__["g" /* polyfillPromises */]( _ => doFetch( url, options, type, fn ) )
		};
	}

	// if the fetch polyfill hasn't loaded yet
	//   overwrite .then and wait 100 milliseconds then try again.
	if ( !self.fetch ) {
		return {
			then: fn => __WEBPACK_IMPORTED_MODULE_0__utils_utils__["f" /* polyfillFetch */]( _ => doFetch( url, options, type, fn ) )
		};
	}
	else {
		// init options to empty object if none were passed in
		if ( !options ) {
			options = {};
		}

		// check fetch request type -- assuming this would a POST request
		if ( !type || type !== 'GET' ) {
			// if additional headers need to be added
			headers = __WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* extend */]( {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}, options.headers || {} );

			// setup some default options for a POST request
			//  and extend to include any options that were passed in
			//  specifically the body property for webservice parameters
			opts = __WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* extend */]( {
				url: url,
				body: '',
				method: 'POST'
			}, options );

			// make sure we include all of the needed headers
			opts.headers = headers;

			// make sure the body property has been stringified
			if ( opts.body && typeof opts.body !== 'string' && opts.body !== {} ) {
				opts.body = JSON.stringify( opts.body );
			}

			// make the fetch call
			return fetch( url, opts )
				.then( rsp => rsp.json() )
				.then( data => {
					if ( callbackFn ) {
						callbackFn( JSON.parse( data.d ) );
					}
					else {
						return data.d;
					}
				} )
				.then( rsp => JSON.parse( rsp ) );
		}
		else {
			// if additional headers need to be added
			headers = __WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* extend */]( {
				'Content-Type': 'text/plain'
			}, options.headers || {} );

			// setup default options for a GET request
			//  expecting text/plain content type by default
			opts = __WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* extend */]( {
				method: 'GET'
			}, options );

			// make sure we include all of the needed headers
			opts.headers = headers;

			// make the fetch call
			return fetch( url, opts )
				.then( rsp => rsp.text() )
				.then( rsp => {
					if ( callbackFn ) {
						callbackFn( rsp );
					}
					else {
						return rsp;
					}
				} );
		}
	}
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
* dependencyLibs/inputmask.dependencyLib.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

!function( factory ) {
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(4), __webpack_require__(5) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == typeof exports ? module.exports = factory( require( '../global/window' ), require( '../global/document' ) ) : window.dependencyLib = factory( window, document );
}( function( window, document ) {
    function indexOf( list, elem ) {
        for ( var i = 0, len = list.length; i < len; i++ ) if ( list[i] === elem ) return i;
        return -1;
    }
    function type( obj ) {
        return null == obj ? obj + '' : 'object' == typeof obj || 'function' == typeof obj ? class2type[class2type.toString.call( obj )] || 'object' : typeof obj;
    }
    function isWindow( obj ) {
        return null != obj && obj === obj.window;
    }
    function isArraylike( obj ) {
        var length = 'length' in obj && obj.length, ltype = type( obj );
        return 'function' !== ltype && !isWindow( obj ) && ( !( 1 !== obj.nodeType || !length ) || ( 'array' === ltype || 0 === length || 'number' == typeof length && length > 0 && length - 1 in obj ) );
    }
    function isValidElement( elem ) {
        return elem instanceof Element;
    }
    function DependencyLib( elem ) {
        return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void ( void 0 !== elem && null !== elem && elem !== window && ( this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector( elem ), 
        void 0 !== this[0] && null !== this[0] && ( this[0].eventRegistry = this[0].eventRegistry || {} ) ) ) : new DependencyLib( elem );
    }
    for ( var class2type = {}, classTypes = 'Boolean Number String Function Array Date RegExp Object Error'.split( ' ' ), nameNdx = 0; nameNdx < classTypes.length; nameNdx++ ) class2type['[object ' + classTypes[nameNdx] + ']'] = classTypes[nameNdx].toLowerCase();
    return DependencyLib.prototype = {
        on: function( events, handler ) {
            if ( isValidElement( this[0] ) ) for ( var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split( ' ' ), endx = 0; endx < _events.length; endx++ ) {
                var nsEvent = _events[endx].split( '.' );
                !function( ev, namespace ) {
                    elem.addEventListener ? elem.addEventListener( ev, handler, !1 ) : elem.attachEvent && elem.attachEvent( 'on' + ev, handler ), 
                    eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], 
                    eventRegistry[ev][namespace].push( handler );
                }( nsEvent[0], nsEvent[1] || 'global' );
            }
            return this;
        },
        off: function( events, handler ) {
            if ( isValidElement( this[0] ) ) for ( var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split( ' ' ), endx = 0; endx < _events.length; endx++ ) for ( var nsEvent = _events[endx].split( '.' ), offEvents = function( ev, namespace ) {
                var hndx, hndL, evts = [];
                if ( ev.length > 0 ) if ( void 0 === handler ) for ( hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++ ) evts.push( {
                    ev: ev,
                    namespace: namespace && namespace.length > 0 ? namespace : 'global',
                    handler: eventRegistry[ev][namespace][hndx]
                } ); else evts.push( {
                    ev: ev,
                    namespace: namespace && namespace.length > 0 ? namespace : 'global',
                    handler: handler
                } ); else if ( namespace.length > 0 ) for ( var evNdx in eventRegistry ) for ( var nmsp in eventRegistry[evNdx] ) if ( nmsp === namespace ) if ( void 0 === handler ) for ( hndx = 0, 
                hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++ ) evts.push( {
                    ev: evNdx,
                    namespace: nmsp,
                    handler: eventRegistry[evNdx][nmsp][hndx]
                } ); else evts.push( {
                    ev: evNdx,
                    namespace: nmsp,
                    handler: handler
                } );
                return evts;
            }( nsEvent[0], nsEvent[1] ), i = 0, offEventsL = offEvents.length; i < offEventsL; i++ ) !function( ev, namespace, handler ) {
                if ( ev in eventRegistry == 1 ) if ( elem.removeEventListener ? elem.removeEventListener( ev, handler, !1 ) : elem.detachEvent && elem.detachEvent( 'on' + ev, handler ), 
                'global' === namespace ) for ( var nmsp in eventRegistry[ev] ) eventRegistry[ev][nmsp].splice( eventRegistry[ev][nmsp].indexOf( handler ), 1 ); else eventRegistry[ev][namespace].splice( eventRegistry[ev][namespace].indexOf( handler ), 1 );
            }( offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler );
            return this;
        },
        trigger: function( events ) {
            if ( isValidElement( this[0] ) ) for ( var eventRegistry = this[0].eventRegistry, elem = this[0], _events = 'string' == typeof events ? events.split( ' ' ) : [ events.type ], endx = 0; endx < _events.length; endx++ ) {
                var nsEvent = _events[endx].split( '.' ), ev = nsEvent[0], namespace = nsEvent[1] || 'global';
                if ( void 0 !== document && 'global' === namespace ) {
                    var evnt, i, params = {
                        bubbles: !0,
                        cancelable: !0,
                        detail: Array.prototype.slice.call( arguments, 1 )
                    };
                    if ( document.createEvent ) {
                        try {
                            evnt = new CustomEvent( ev, params );
                        } catch ( e ) {
                            ( evnt = document.createEvent( 'CustomEvent' ) ).initCustomEvent( ev, params.bubbles, params.cancelable, params.detail );
                        }
                        events.type && DependencyLib.extend( evnt, events ), elem.dispatchEvent( evnt );
                    } else ( evnt = document.createEventObject() ).eventType = ev, events.type && DependencyLib.extend( evnt, events ), 
                    elem.fireEvent( 'on' + evnt.eventType, evnt );
                } else if ( void 0 !== eventRegistry[ev] ) if ( arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event( arguments[0] ), 
                'global' === namespace ) for ( var nmsp in eventRegistry[ev] ) for ( i = 0; i < eventRegistry[ev][nmsp].length; i++ ) eventRegistry[ev][nmsp][i].apply( elem, arguments ); else for ( i = 0; i < eventRegistry[ev][namespace].length; i++ ) eventRegistry[ev][namespace][i].apply( elem, arguments );
            }
            return this;
        }
    }, DependencyLib.isFunction = function( obj ) {
        return 'function' === type( obj );
    }, DependencyLib.noop = function() {}, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function( elem, arr, i ) {
        return null == arr ? -1 : indexOf( arr, elem );
    }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function( obj ) {
        return 'object' === type( obj ) && !obj.nodeType && !isWindow( obj ) && !( obj.constructor && !class2type.hasOwnProperty.call( obj.constructor.prototype, 'isPrototypeOf' ) );
    }, DependencyLib.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ( 'boolean' == typeof target && ( deep = target, target = arguments[i] || {}, 
        i++ ), 'object' == typeof target || DependencyLib.isFunction( target ) || ( target = {} ), 
        i === length && ( target = this, i-- ); i < length; i++ ) if ( null != ( options = arguments[i] ) ) for ( name in options ) src = target[name], 
        target !== ( copy = options[name] ) && ( deep && copy && ( DependencyLib.isPlainObject( copy ) || ( copyIsArray = DependencyLib.isArray( copy ) ) ) ? ( copyIsArray ? ( copyIsArray = !1, 
        clone = src && DependencyLib.isArray( src ) ? src : [] ) : clone = src && DependencyLib.isPlainObject( src ) ? src : {}, 
        target[name] = DependencyLib.extend( deep, clone, copy ) ) : void 0 !== copy && ( target[name] = copy ) );
        return target;
    }, DependencyLib.each = function( obj, callback ) {
        var i = 0;
        if ( isArraylike( obj ) ) for ( var length = obj.length; i < length && !1 !== callback.call( obj[i], i, obj[i] ); i++ ) ; else for ( i in obj ) if ( !1 === callback.call( obj[i], i, obj[i] ) ) break;
        return obj;
    }, DependencyLib.map = function( elems, callback ) {
        var value, i = 0, length = elems.length, ret = [];
        if ( isArraylike( elems ) ) for ( ;i < length; i++ ) null != ( value = callback( elems[i], i ) ) && ret.push( value ); else for ( i in elems ) null != ( value = callback( elems[i], i ) ) && ret.push( value );
        return [].concat( ret );
    }, DependencyLib.data = function( owner, key, value ) {
        if ( void 0 === value ) return owner.__data ? owner.__data[key] : null;
        owner.__data = owner.__data || {}, owner.__data[key] = value;
    }, 'function' == typeof window.CustomEvent ? DependencyLib.Event = window.CustomEvent : ( DependencyLib.Event = function( event, params ) {
        params = params || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var evt = document.createEvent( 'CustomEvent' );
        return evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail ), 
        evt;
    }, DependencyLib.Event.prototype = window.Event.prototype ), DependencyLib;
} );

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
* global/window.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

 true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return window;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == typeof exports && ( module.exports = window );

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
* global/document.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

 true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return document;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == typeof exports && ( module.exports = document );

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_fetch__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form__ = __webpack_require__(7);
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */




( function( doc ) {
    'use strict';

    const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
    let roleId = -1;
    let userId = GUID_EMPTY;

    let adminForm = new __WEBPACK_IMPORTED_MODULE_2__form__["a" /* default */]( {
        labelItemText: '',
        labelItemsText: '',
        loadItems: {
            fn: 'profilesGetJsonForAdmin',
            params: _ => {
                return {
                    profileId: -1,
                    userId: '',
                    roleId: roleId,
                    mlsId: '',
                    mlsOfficeId: '',
                    isActive: false
                };
            },
            rowTmpl: '<div class="admin-grid-row{{rowClass}}" data-id="{{profileId}}">' +
                     '<div class="admin-grid-col admin-grid-col-primary">{{displayName}}</div>' +
                     '<div class="admin-grid-col admin-grid-col-primary">{{role}}</div>' +
                     '<div class="admin-grid-col admin-grid-col-primary">{{isActive}}</div>' +
                     '<div class="admin-grid-col"><button class="btn btn-ripple btn-edit">Edit</button><button class="btn btn-ripple btn-delete">Delete</button></div>' +
                     '</div>',
            rowTmplHeaders: ['', 'Name', 'Role', 'Is Active'],
            rowTmplProps: ['profileId', 'displayName', 'role', 'isActive']
        },
        dragDropForOrder: false,
        editItem: {
            fn: 'profilesGetJsonForAdmin',
            params: {
                profileId: -1,
                userId: '',
                roleId: roleId,
                mlsId: '',
                mlsOfficeId: '',
                isActive: false
            },
            itemId: 'profileId',
            callback: editItemCallback
        },
        saveItem: {
            fn: 'profileSave',
            itemId: 'profileId',
            sendAsString: true,
            updateSortOrderFn: '',
            callback: saveItemCallback
        },
        deleteItem: {
            fn: 'profileDelete',
            itemId: 'profileId'
        },
        back: {
            fn: back
        },
        additionalProperties: {
            userId: GUID_EMPTY,
            profilePic: ''
        }
    } );

    const ddlFilterRole = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#ddl-filter-role' );
    const tbPwdConfirm = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#tb-pwd-confirm' );
    const ddlRole = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#ddl-role' );

    ddlFilterRole.Select.setChangeEvent( _ => {
        roleId = parseInt( ddlFilterRole.Select.getValue() );

        if ( roleId === -999 ) {
            roleId = -1;
        }

        adminForm.loadItems();
    } );

    async function editItemCallback( obj ) {
        try {
            tbPwdConfirm.value = obj.pwd;
            adminForm.formEdit.checkActiveInputs();

            userId = obj.userId;

            const rsp = await Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( '/api/membership/rolesGetJson', {
                body: {
                    roleId: -1,
                    role: '',
                    userId: userId
                }
            } );

            if ( rsp.success ) {
                const data = rsp.obj;

                if ( data.length === 1 ) {
                    const role = data[0];
                    ddlRole.Select.setValue( role.roleId );
                }
            }
            else {
                console.log( `Error loading user role ${rsp.msg}` );
            }
        }
        catch ( err ) {
            console.log( `Error loading user role ${err}` );
        }
    }

    async function saveItemCallback( fn ) {
        try {
            const rid = parseInt( ddlRole.Select.getValue() );

            const rsp = await Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( '/api/membership/userAssignRoleByProfile', {
                body: {
                    profileId: adminForm.itemId,
                    roleId: rid
                }
            } );

            if ( rsp.success ) {
                if ( fn && typeof fn === 'function' ) {
                    fn();
                }
            }
            else {
                console.log( `Error saving user role - ${rsp.msg}` );
            }
        }
        catch ( err ) {
            console.log( `Error saving user role - ${err}` );
        }
    }

    function back() {
        userId = GUID_EMPTY;
    }

}( document ) );

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_fetch__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_alert__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_toast__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forms_form__ = __webpack_require__(11);
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1
 *
 * Configuration/Info
 *
 * Label for item has class lbl-item
 * Label for items has class lbl-items
 * For grid, expects grid container to have ID grid-container
 * Expects form-grid for item listing
 * Expects form-edit for manipulating item data
 *
 * Expects add new button with ID btn-new
 */







'use strict';

let config = {
	btnBack: 'btn-back',
	btnDelete: 'btn-delete',
	btnNew: 'btn-new',
	btnSave: 'btn-save',
	formGrid: 'form-grid',
	formEdit: 'form-edit',
	gridContainerId: 'grid-container',
	gridRowClass: 'admin-grid-row',
	hiddenClass: 'hidden',
	lblItem: 'lbl-item',
	lblItems: 'lbl-items',
	wsUrl: '/api/'
};

const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';

const toast = new __WEBPACK_IMPORTED_MODULE_4__components_toast__["a" /* default */]();
const alert = new __WEBPACK_IMPORTED_MODULE_3__components_alert__["a" /* default */]();
const defaultUrl = window.location.pathname;

class AdminForm {
	constructor( options ) {
		// extract data from options
		this.options = options;

		this.labelItemText = options.labelItemText;
		this.labelItemsText = options.labelItemsText;

		// user custom wsURL path
		this.wsUrl = options.wsPath;

		if ( this.wsUrl ) {
			config.wsUrl = this.wsUrl;
		}

		// init new item
		this.initItemFn = options.initItem ? options.initItem.callback : null;

		// load items information
		this.loadItemsFn = options.loadItems.fn;
		this.loadItemsParams = options.loadItems.params;
		this.loadItemsRowHTML = options.loadItems.rowTmpl;
		this.loadItemsRowHeaders = options.loadItems.rowTmplHeaders;
		this.loadItemsRowProps = options.loadItems.rowTmplProps;

		// edit item options
		this.editItemFn = options.editItem.fn;
		this.editItemParams = options.editItem.params;
		this.editItemItemId = options.editItem.itemId;
		this.editItemCallback = options.editItem.callback;

		// save item
		this.saveItemFn = options.saveItem.fn;
		this.saveItemId = options.saveItem.itemId;
		this.saveItemIsGuid = options.saveItem.isGuid || false;
		this.sendAsString = options.saveItem.sendAsString || false;
		this.saveCallback = options.saveItem.callback;
		this.updateSortOrderFn = options.saveItem.updateSortOrderFn;

		// delete item
		this.deleteItemFn = options.deleteItem.fn;
		this.deleteItemItemId = options.deleteItem.itemId;

		// back to options callback
		this.backToGridCallback = options.back.fn;

		// items
		this.items = [];

		// initialize our form objects
		this.formGrid = new __WEBPACK_IMPORTED_MODULE_5__forms_form__["a" /* default */]( Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.formGrid ) );
		this.formEdit = new __WEBPACK_IMPORTED_MODULE_5__forms_form__["a" /* default */]( Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.formEdit ) );

		// do we want to have drag/drop for sort order
		this.dragDropForOrder = options.dragDropForOrder || false;

		// buttons
		this.btnNew = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.btnNew );
		this.btnBack = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.btnBack );
		this.btnDelete = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.btnDelete );
		this.btnSave = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.btnSave );

		// tracking data
		this.itemId = -1;
		this.additionadditionalPropertiesDefault = __WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* cloneObj */]( options.additionalProperties || {} );
		this.additionalProperties = __WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* cloneObj */]( options.additionalProperties || {} );

		// bind this to our functions
		this.setLabels = this.setLabels.bind( this );
		this.loadItems = this.loadItems.bind( this );
		this.buildGrid = this.buildGrid.bind( this );
		this.initNewItem = this.initNewItem.bind( this );
		this.editData = this.editData.bind( this );
		this.saveItem = this.saveItem.bind( this );
		this.backToGrid = this.backToGrid.bind( this );
		this.btnDeleteClickHandler = this.btnDeleteClickHandler.bind( this );
		this.deleteItem = this.deleteItem.bind( this );
		this.popstateHanlder = this.popstateHanlder.bind( this );

		// set display labels
		this.setLabels();

		// assign event listeners
		this.addEventListeners();

		// load current database items
		this.loadItems();
	}

	setLabels() {
		Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.' + config.lblItem ).forEach( el => el.textContent = this.labelItemText );
		Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.' + config.lblItems ).forEach( el => el.textContent = this.labelItemsText );
	}

	addEventListeners() {
		this.btnNew.addEventListener( 'click', this.initNewItem, false );
		this.btnBack.addEventListener( 'click', this.backToGrid, false );
		this.btnSave.addEventListener( 'click', this.saveItem, false );
		this.btnDelete.addEventListener( 'click', this.btnDeleteClickHandler, false );
		window.addEventListener( 'popstate', this.popstateHanlder, false );
	}

	async loadItems() {
		try {
			let params = {};

			if ( typeof this.loadItemsParams === 'function' ) {
				params = this.loadItemsParams();
			}
			else {
				params = this.loadItemsParams;
			}

			const rsp = await Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( config.wsUrl + this.loadItemsFn, {
				body: params
			} );

			if ( rsp.success ) {
				this.items = rsp.obj;
				const type = ( typeof this.items ).toLowerCase();

				if ( type === 'string' ) {
					this.items = JSON.parse( this.items );
				}

				this.buildGrid();
			}
			else {
				console.log( `Error loading items: ${rsp.msg}` );
			}
		}
		catch ( err ) {
			console.log( `Error loading items: ${err}` );
		}
	}

	buildGrid() {
		const me = this;
		let html = '';
		let rowHtml = '';

		// add the header row
		rowHtml = this.loadItemsRowHTML;
		for ( let i = 0; i < this.loadItemsRowHeaders.length; i++ ) {
			let hdr = this.loadItemsRowHeaders[i];
			let itemProp = this.loadItemsRowProps[i];
			rowHtml = rowHtml.replace( '{{' + itemProp + '}}', hdr );
		}

		rowHtml = rowHtml.replace( '{{rowClass}}', ' hdr' );
		html += rowHtml;

		// loop through all of the items and add them
		for ( let i = 0; i < this.items.length; i++ ) {
			let item = this.items[i];
			rowHtml = this.loadItemsRowHTML.replace( '{{rowClass}}', '' );

			for ( let j = 0; j < this.loadItemsRowProps.length; j++ ) {
				let itemProp = this.loadItemsRowProps[j];
				let val = item[itemProp];

				if ( itemProp === 'active' || itemProp === 'isActive' ) {
					val = val === true ? 'Active' : 'Not Active';
				}
				else if ( itemProp === 'isFeatured' ) {
					val = val === true ? 'Yes' : 'No';
				}
				else if ( itemProp === 'isAdmin' ) {
					val = val === true ? 'Yes' : 'No';
				}

				rowHtml = rowHtml.replace( '{{' + itemProp + '}}', val );
			}

			html += rowHtml;
		}

		Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.gridContainerId ).innerHTML = html;

		requestAnimationFrame( _ => {
			this.initRows().then( _ => {
				if ( this.dragDropForOrder && this.rows.length ) {
					this.initDragDrop();
				}
			} );
		} );
	}

	initRows() {
		return new Promise( ( resolve, reject ) => {
			const me = this;
			this.rows = [];

			Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( `.${config.gridRowClass}` ).forEach( row => this.rows.push( new FormRow( row, me ) ) );

			resolve();
		} );
	}

	initDragDrop() {
		dragula( [Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( '#' + config.gridContainerId )], {
			isContainer: el => false,
			moves: ( el, source, handle, sibling ) => handle.classList.contains( 'btn-reorder' ),
			accepts: ( el, target, source, sibling ) => true,
			invalid: ( el, handle ) => false,
			direction: 'vertical',
			copy: false,
			copySortSource: false,
			revertOnSpill: false,
			removeOnSpill: false,
			mirrorContainer: document.body,
			ignoreInputTextSelect: true
		} ).on( 'drop', ( el, target, source, sibling ) => {
			const id = parseInt( el.getAttribute( 'data-id' ), 10 );
			const sortedRowIds = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.admin-grid-row:not(.hdr)' ).map( el => parseInt( el.getAttribute( 'data-id' ), 10 ) );
			const index = sortedRowIds.findIndex( elId => elId === id );

			Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( config.wsUrl + this.updateSortOrderFn, {
				body: {
					id: id,
					sortOrder: index + 1
				}
			} ).then( rsp => {
				if ( rsp.success ) {
					toast.show( 'Display order updated.' );
				}
			} );
		} );
	}

	initNewItem() {
		this.itemId = -1;

		if ( this.formEdit.container.querySelector( '#tb-sort-order' ) ) {
			this.formEdit.container.querySelector( '#tb-sort-order' ).value = this.items.length + 1;
		}

		this.formGrid.hide();
		this.formEdit.show();
		this.btnDelete.classList.add( config.hiddenClass );

		if ( this.initItemFn && typeof this.initItemFn === 'function' ) {
			this.initItemFn();
		}

		history.pushState( { page: 'edit' }, 'Edit', '?edit' );
	}

	editData( id ) {
		toast.show( 'Loading item details...', -1 );
		this.itemId = id;
		this.editItemParams[this.editItemItemId] = this.itemId;

		Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( config.wsUrl + this.editItemFn, {
			body: this.editItemParams
		} ).then( rsp => {
			let obj;

			if ( rsp.success && rsp.obj.length ) {
				obj = rsp.obj[0];
				this.formEdit.setFieldValues( obj );
				this.formEdit.show();
				this.formGrid.hide();
				this.btnDelete.classList.remove( config.hiddenClass );

				if ( this.additionalProperties ) {
					Object.getOwnPropertyNames( this.additionalProperties ).forEach( val => {
						this.additionalProperties[val] = obj[val];
					} );
				}

				window.scrollTo( 0, 0 );
				toast.hide( true );

				if ( this.editItemCallback && typeof this.editItemCallback === 'function' ) {
					this.editItemCallback( obj );
				}

				history.pushState( { page: 'edit' }, 'Edit', '?edit' );
			}
		} ).catch( rsp => {
			console.log( rsp );
		} );
	}

	saveItem() {
		const me = this;
		let isValid = this.formEdit.validateFields();
		let params = {};

		if ( !isValid ) {
			toast.show( 'Fields marked with * are required.' );
			return;
		}

		toast.show( 'Saving data, please wait...' );

		params = this.formEdit.collectData();

		if ( this.additionalProperties ) {
			Object.getOwnPropertyNames( this.additionalProperties ).forEach( val => {
				params[val] = this.additionalProperties[val];
			} );
		}

		params[this.saveItemId] = this.itemId;

		if ( this.saveItemIsGuid && this.itemId === -1 ) {
			params[this.saveItemId] = GUID_EMPTY;
		}

		if ( this.sendAsString ) {
			params = {
				data: JSON.stringify( params )
			};
		}

		Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( config.wsUrl + this.saveItemFn, {
			body: params
		} ).then( rsp => {
			if ( rsp.success ) {
				toast.show( 'Data saved successfully.', 2000 );

				if ( this.itemId === -1 ) {
					this.itemId = rsp.obj;
				}

				if ( this.saveCallback && typeof this.saveCallback === 'function' ) {
					this.saveCallback( _ => {
						me.loadItems();
						me.backToGrid();
					} );
				}
				else {
					me.loadItems();
					setTimeout( _ => me.backToGrid(), 1500 );
				}
			}
			else {
				toast.show( 'Unable to save at this time, please try again. ' + rsp.msg, -1 );
				console.log( 'Error:', rsp.msg || 'No error data.' );
			}
		} ).catch( rsp => {
			toast.show( 'Unable to save at this time, please try again.', -1 );
			console.log( 'Error:', rsp || 'No error data.' );
		} );
	}

	backToGrid() {
		this.formEdit.hide();
		this.formEdit.clearForm();
		this.formGrid.show();

		// reset tracked data
		this.itemId = -1;

		if ( this.additionalProperties ) {
			Object.getOwnPropertyNames( this.additionalProperties ).forEach( val => {
				this.additionalProperties[val] = this.additionadditionalPropertiesDefault[val];
			} );
		}

		if ( this.backToGridCallback && typeof this.backToGridCallback === 'function' ) {
			this.backToGridCallback();
		}

		window.scrollTo( 0, 0 );

		history.pushState( { page: '' }, 'Options', defaultUrl );

		this.formEdit.clearForm();
	}

	btnDeleteClickHandler() {
		this.deleteItem( this.itemId );
	}

	deleteItem( id ) {
		const me = this;

		let params = {};
		params[this.deleteItemItemId] = id;

		alert.promptAlert( 'Confirm Delete', '<p>Are you sure you want to delete this item?', 'Delete', 'Cancel', evt => {
			alert.dismissAlert();
			toast.show( 'Deleting item...' );

			Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetch__["a" /* default */])( config.wsUrl + this.deleteItemFn, {
				body: params
			} ).then( rsp => {
				if ( rsp.success ) {
					toast.show( 'Item successfully deleted.', 2500 );
					me.loadItems();

					setTimeout( _ => me.backToGrid(), 1000 );
				}
				else {
					toast.show( 'Unable to delete at this time. Please try again.' );
					console.log( 'Error:', rsp.msg || 'No error data' );
				}
			} ).catch( rsp => {
				toast.show( 'Unable to delete at this time. Please try again.' );
				console.log( 'Error:', rsp || 'No error data' );
			} );

			evt.preventDefault();
		}, evt => {
			alert.dismissAlert();
			evt.preventDefault();
		} );
	}

	setAdditionalPropertyData( key, val ) {
		this.additionalProperties[key] = val;
	}

	getAdditionalPropertyData( key ) {
		return this.additionalProperties[key];
	}

	popstateHanlder( e ) {
		if ( !e.state || e.state.page === '' ) {
			this.backToGrid();
		}
	}

	// helper function to handle image uploads
	//   @file - the file to be uploaded
	//   @isImg - boolean if uploading an image
	//   @handler - the ashx file to handle the file upload
	//   @fn - optional - callback function to run after the image has been uploaded
	uploadHelper( file, isImg, handler, headers, fn ) {
		let fileName = file.name;
		let fileType = file.type;
		let fReader = new FileReader();

		// confirm this file is allowed
		if ( !isImg || /^image\//.test( fileType ) ) {
			toast.show( 'Uploading file, please wait...', -1 );

			fReader.onload = function( e ) {
				let xhr = new XMLHttpRequest();

				// set the handler and all headers
				xhr.open( 'post', handler, true );
				xhr.setRequestHeader( 'X-File-Name', fileName );
				xhr.setRequestHeader( 'X-File-Size', file.size );
				xhr.setRequestHeader( 'X-File-Type', fileType );

				for ( const key in headers ) {
					xhr.setRequestHeader( key, headers[key] );
				}

				// callback of xhr load
				xhr.addEventListener( 'load', function( response ) {
					// when the request is complete
					if ( response.target.response ) {
						let rsp = JSON.parse( response.target.response );

						// if the upload was successful
						if ( rsp.success ) {
							toast.show( 'The file was successfully uploaded.' );
							setTimeout( _ => {
								toast.hide( true );
							}, 1000 );

							if ( fn && typeof fn === 'function' ) {
								fn( rsp.obj );
							}
						}
						else {
							toast.show( 'Unable to upload the file, please try again.', -1 );
							console.log( 'Error:', rsp.msg || 'No error data.' );
						}
					}
				}, false );

				xhr.send( file );
			};

			// begin the read operation
			fReader.readAsDataURL( file );
		}
		else {
			toast.show( 'Only .jpg, .jpeg, and .png files are allowed.', -1 );
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AdminForm;


class FormRow {
	constructor( row, form ) {
		this.container = row;
		this.AdminForm = form;
		this.id = row.getAttribute( 'data-id' );
		this.btnEdit = row.querySelector( '.btn-edit' );
		this.btnDelete = row.querySelector( '.btn-delete' );

		this.btnDrag = row.querySelector( '.btn-reorder' );
		this.dragOver = false;

		this.editItem = this.editItem.bind( this );
		this.deleteItem = this.deleteItem.bind( this );

		this.addEventListeners();
	}

	addEventListeners() {
		this.btnEdit.addEventListener( 'click', this.editItem, false );
		this.btnDelete.addEventListener( 'click', this.deleteItem, false );
	}

	editItem() {
		this.AdminForm.editData( this.id );
	}

	deleteItem() {
		this.AdminForm.deleteItem( this.id );
	}

	setId() {
		this.id = this.container.getAttribute( 'data-id' );
	}
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_materialButton__ = __webpack_require__(9);
﻿/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/

'use strict';

const ROOT = 'alert';
let activeAlert = null;

class Alert {
	static get cssClasses() {
		return {
			ROOT,
			ALERT_ACTIVE: `${ROOT}-is-active`,
			ALERT_EL: `${ROOT}-el`,
			ALERT_HDR: `${ROOT}-header`,
			ALERT_INFO: `${ROOT}-info`,
			BTN: `${ROOT}-btn`,
			BTN_CONFIRM: `${ROOT}-btn-confirm`,
			BTN_CONTAINER: `${ROOT}-btn-container`,
			BTN_DISMISS: `${ROOT}-btn-dismiss,`,
			CONTAINER: `${ROOT}-container`
		};
	}

	static get numbers() {
		return {
			ESCAPE_KEY: 27
		};
	}

	constructor() {
		this.root_ = document.body;

		this.container = this._createAlertElements();
		this.root_.appendChild( this.container );

		this.onConfirm = function() { };
		this.onDismiss = function() { };

		this.addEventListeners();

		activeAlert = this;
	}

	_createAlertElements() {
		const el = document.createElement( 'div' );
		el.classList.add( Alert.cssClasses.CONTAINER );

		this.alertEl = document.createElement( 'div' );
		this.alertEl.classList.add( Alert.cssClasses.ALERT_EL );

		this.alertHeader = document.createElement( 'h3' );
		this.alertHeader.classList.add( Alert.cssClasses.ALERT_HDR );

		this.alertInfo = document.createElement( 'div' );
		this.alertInfo.classList.add( Alert.cssClasses.ALERT_INFO );

		this.btnContainer = document.createElement( 'div' );
		this.btnContainer.classList.add( Alert.cssClasses.BTN_CONTAINER );

		this.btnDismiss = document.createElement( 'button' );
		this.btnDismiss.classList.add( Alert.cssClasses.BTN );
		this.btnDismiss.classList.add( Alert.cssClasses.BTN_DISMISS );
		this.btnDismiss.classList.add( 'btn-ripple' );
		this.btnDismiss.textContent = 'Dismiss';

		this.btnConfirm = document.createElement( 'button' );
		this.btnConfirm.classList.add( Alert.cssClasses.BTN );
		this.btnConfirm.classList.add( Alert.cssClasses.BTN_CONFIRM );
		this.btnConfirm.classList.add( 'btn-ripple' );
		this.btnConfirm.textContent = 'Confirm';

		this.btnContainer.appendChild( this.btnDismiss );
		this.btnContainer.appendChild( this.btnConfirm );

		this.alertEl.appendChild( this.alertHeader );
		this.alertEl.appendChild( this.alertInfo );
		this.alertEl.appendChild( this.btnContainer );

		el.appendChild( this.alertEl );

		return el;
	}

	addEventListeners() {
		this.btnConfirm.addEventListener( 'click', this.onConfirm, false );
		this.btnDismiss.addEventListener( 'click', this.onDismiss, false );
	}

	promptAlert( hdr, content, btnConfirmText, btnDismissText, fnConfirm, fnDismiss ) {
		this.alertHeader.textContent = hdr;
		this.alertInfo.innerHTML = content;
		this.updateButtons( btnConfirmText, btnDismissText, fnConfirm, fnDismiss );
		this.showAlert();

		document.body.addEventListener( 'keydown', this.handleKeyDown, false );
	}

	updateButtons( btnConfirmText, btnDismissText, fnConfirm, fnDismiss ) {
		this.btnConfirm.textContent = btnConfirmText;
		this.btnDismiss.textContent = btnDismissText;

		//this.btnDismiss.MaterialButton = new MaterialButton( this.btnDismiss );
		//this.btnConfirm.MaterialButton = new MaterialButton( this.btnConfirm );

		this.btnConfirm.removeEventListener( 'click', this.onConfirm, false );
		this.btnDismiss.removeEventListener( 'click', this.onDismiss, false );

		this.onConfirm = fnConfirm;
		this.onDismiss = fnDismiss;

		this.btnConfirm.addEventListener( 'click', this.onConfirm, false );
		this.btnDismiss.addEventListener( 'click', this.onDismiss, false );
	}

	showAlert() {
		document.body.classList.add( Alert.cssClasses.ALERT_ACTIVE );
	}

	handleKeyDown( e ) {
		if ( e.keyCode === Alert.numbers.ESCAPE_KEY ) {
			this.onDismiss();
		}
	}

	dismissAlert() {
		document.body.classList.remove( Alert.cssClasses.ALERT_ACTIVE );
		document.body.removeEventListener( 'keydown', this.handleKeyPress, false );
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Alert;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MaterialButton */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils___ = __webpack_require__(0);
﻿/**
 * Copyright 2015 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.0
 */

'use strict';

var MaterialButton = function MaterialButton( element ) {
	this.element_ = element;
	this.init();
};

// Definte css classes
MaterialButton.prototype.cssClasses_ = {
	RIPPLE_BUTTON: 'btn-ripple',
	RIPPLE_CONTAINER: 'btn-ripple-container',
	RIPPLE: 'btn-ripple-element',
	RIPPLE_CENTER: 'btn-ripple-center',
	RIPPLE_IS_ANIMATING: 'is-animating',
	RIPPLE_IS_VISIBLE: 'is-visible'
};

MaterialButton.prototype.RippleConstant = {
	INITIAL_SCALE: 'scale(0.0001, 0.0001)',
	INITIAL_SIZE: '1px',
	INITIAL_OPACITY: '0.4',
	FINAL_OPACITY: '0',
	FINAL_SCALE: ''
};

// initialize the element
MaterialButton.prototype.init = function() {
	if ( this.element_ ) {

		// if this button needs the ripple effect
		//   add the necessary ripple elements and events
		if ( this.element_.classList.contains( this.cssClasses_.RIPPLE_BUTTON ) ) {
			this.initRipple();
		}
	}
};

MaterialButton.prototype.initRipple = function() {
	var recentering;

	// first add the elements
	this.addRippleElements();

	// set defaults and add event handlers
	recentering = this.element_.classList.contains( this.cssClasses_.RIPPLE_CENTER );
	this.frameCount_ = 0;
	this.rippleSize_ = 0;
	this.x_ = 0;
	this.y_ = 0;

	// Touch start produces a compat mouse down event, which would cause a
	// second ripple. To avoid that, we use this property to ignore the first
	// mouse down after a touch start.
	this.ignoringMouseDown_ = false;

	this.boundDownHandler = this.downHandler_.bind( this );
	this.element_.addEventListener( 'mousedown', this.boundDownHandler, false );
	this.element_.addEventListener( 'touchstart', this.boundDownHandler, false );

	this.boundUpHandler = this.upHandler_.bind( this );
	this.element_.addEventListener( 'mouseup', this.boundUpHandler, false );
	this.element_.addEventListener( 'mouseleave', this.boundUpHandler, false );
	this.element_.addEventListener( 'touchend', this.boundUpHandler, false );
	this.element_.addEventListener( 'blur', this.boundUpHandler, false );

	// helpers
	this.getFrameCount = function() {
		return this.frameCount_;
	};

	this.setFrameCount = function( fC ) {
		this.frameCount_ = fC;
	};

	this.getRippleElement = function() {
		return this.rippleElement_;
	};

	this.setRippleXY = function( newX, newY ) {
		this.x_ = newX;
		this.y_ = newY;
	};

	// styles
	this.setRippleStyles = function( start ) {
		if ( this.rippleElement_ !== null ) {
			var transformString, scale, size,
				offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';

			if ( start ) {
				scale = this.RippleConstant.INITIAL_SCALE;
				size = this.RippleConstant.INITIAL_SIZE;
			}
			else {
				scale = this.RippleConstant.FINAL_SCALE;
				size = this.rippleSize_ + 'px';

				if ( recentering ) {
					offset = 'translate(' + this.boundWidth / 2 + 'px, ' + this.boundHeight / 2 + 'px)';
				}
			}

			transformString = 'translate(-50%, -50%) ' + offset + scale;

			this.rippleElement_.style.webkitTransform = transformString;
			this.rippleElement_.style.msTransform = transformString;
			this.rippleElement_.style.transform = transformString;

			if ( start ) {
				this.rippleElement_.classList.remove( this.cssClasses_.RIPPLE_IS_ANIMATING );
			}
			else {
				this.rippleElement_.classList.add( this.cssClasses_.RIPPLE_IS_ANIMATING );
			}
		}
	};

	// RAF
	this.animFrameHandler = function() {
		if ( this.frameCount_-- > 0 ) {
			requestAnimationFrame( this.animFrameHandler.bind( this ) );
		}
		else {
			this.setRippleStyles( false );
		}
	};
};

MaterialButton.prototype.addRippleElements = function() {
	var container = document.createElement( 'span' );
	container.classList.add( this.cssClasses_.RIPPLE_CONTAINER );

	this.rippleElement_ = document.createElement( 'span' );
	this.rippleElement_.classList.add( this.cssClasses_.RIPPLE );

	container.appendChild( this.rippleElement_ );

	this.boundRippleBlurHandler = this.blurHandler_.bind( this );
	this.rippleElement_.addEventListener( 'mouseup', this.boundRippleBlurHandler );
	this.element_.appendChild( container );
};

// blur event handler
MaterialButton.prototype.blurHandler_ = function( e ) {
	if ( e ) {
		this.element_.blur();
	}
};

// disable the button
MaterialButton.prototype.disable = function() {
	this.element_.disabled = true;
};

// button downHandler
MaterialButton.prototype.downHandler_ = function( e ) {
	var bound, x, y, clientX, clientY;

	if ( !this.rippleElement_.style.width && !this.rippleElement_.style.height ) {
		var rect = this.element_.getBoundingClientRect();
		this.boundHeight = rect.height;
		this.boundWidth = rect.width;
		this.rippleSize_ = Math.sqrt( rect.width * rect.width + rect.height * rect.height ) * 2 + 2;
		this.rippleElement_.style.width = this.rippleSize_ + 'px';
		this.rippleElement_.style.height = this.rippleSize_ + 'px';
	}

	this.rippleElement_.classList.add( this.cssClasses_.RIPPLE_IS_VISIBLE );

	if ( e.type === 'mousedown' && this.ignoringMouseDown_ ) {
		this.ignoringMouseDown_ = false;
	}
	else {
		if ( e.type === 'touchstart' ) {
			this.ignoringMouseDown_ = true;
		}

		var frameCount = this.getFrameCount();
		if ( frameCount > 0 ) {
			return;
		}

		this.setFrameCount( 1 );

		bound = e.currentTarget.getBoundingClientRect();

		// Check if we are handling a keyboard click.
		if ( e.clientX === 0 && e.clientY === 0 ) {
			x = Math.round( bound.width / 2 );
			y = Math.round( bound.height / 2 );
		} else {
			clientX = e.clientX ? e.clientX : e.touches[0].clientX;
			clientY = e.clientY ? e.clientY : e.touches[0].clientY;
			x = Math.round( clientX - bound.left );
			y = Math.round( clientY - bound.top );
		}

		this.setRippleXY( x, y );
		this.setRippleStyles( true );

		window.requestAnimationFrame( this.animFrameHandler.bind( this ) );
	}
};

// button upHandler
MaterialButton.prototype.upHandler_ = function( e ) {
	// Don't fire for the artificial "mouseup" generated by a double-click.
	if ( e && e.detail !== 2 ) {
		this.rippleElement_.classList.remove( this.cssClasses_.RIPPLE_IS_VISIBLE );
	}

	// Allow a repaint to occur before removing this class, so the animation
	// shows for tap events, which seem to trigger a mouseup too soon after mousedown.
	window.setTimeout( function() {
		this.rippleElement_.classList.remove( this.cssClasses_.RIPPLE_IS_VISIBLE );
	}.bind( this ), 0 );
};

// enable the button
MaterialButton.prototype.enable = function() {
	this.element_.disabled = false;
};

//$$( '.btn-ripple' ).forEach( btn => btn.MaterialButton = new MaterialButton( btn ) );

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/


const ROOT = 'toast';

class Toast {
	static get cssClasses() {
		return {
			ROOT,
			VISIBLE: `${ROOT}-is-visible`,
		};
	}

	static get numbers() {
		return {
			DEFAULT_DURATION: 3000
		};
	}

	constructor( root ) {
		this.root_ = document.body;
		this.container = this._createToast();
	}

	show( msg, duration ) {
		this.removeToasts();

		this.container.textContent = msg;
		this.container.classList.add( Toast.cssClasses.VISIBLE );

		this.root_.appendChild( this.container );

		if ( !duration && duration !== -1 ) {
			duration = Toast.numbers.DEFAULT_DURATION;
		}

		if ( duration !== -1 ) {
			setTimeout( _ => this.hide(), duration );
		}
	}

	_createToast() {
		const container = document.createElement( 'div' );
		container.classList.add( Toast.cssClasses.ROOT );
		return container;
	}

	hide() {
		this.container.classList.remove( Toast.cssClasses.VISIBLE );
	}

	removeToasts() {
		const toast = document.querySelector( '.' + Toast.cssClasses.ROOT );

		if ( toast ) {
			toast.parentNode.removeChild( toast );
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Toast;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__textBox__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select__ = __webpack_require__(15);
﻿/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1.0
 */





'use strict';

let ckEditorSettings = {
	allowedContent: true,
	height: 350,
	toolbar: 'Simple'
};

let mediumEditorSettings = {
	placeholder: {
		text: ''
	},
	toolbar: {
		buttons: [
			'bold',
			'italic',
			'underline',
			'anchor',
			'h2',
			'h3',
			'unorderedlist',
			'orderedlist'
		]
	},
	anchor: {
		targetCheckbox: true,
		targetCheckboxText: 'Open in New Tab?'
	}
};

const SCRIPT_PIKADAY = '/js/app/libs/pikaday.js';
const SCRIPT_MOMENT = '/js/app/libs/moment.js';

const formCssClasses = {
	chosenSelect: 'chosen-select',
	ckeditor: 'use-ckeditor',
	errorLabel: 'error-label',
	hidden: 'hidden',
	inputField: 'input-field',
	invalid: 'invalid',
	mediumEditor: 'use-medium-editor',
	quillEditor: 'use-quill-editor',
	required: 'req'
};

class Form {
	// When creating a new Form, we can pass in a selected element (i.e. document.querySelect( '#form' ))
	// or we can pass in a selector (i.e. '#form' )
	constructor( el, editorOptions ) {
		if ( typeof el === 'string' ) {
			el = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["a" /* $ */])( el );
		}

		this.container = el;
		this.editorOptions = editorOptions;
		this.fields = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( 'input:not([type="file"]),textarea,.use-medium-editor,select', el );
		this.reqFields = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.' + formCssClasses.required, el );
		this.inputFields = Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.' + formCssClasses.inputField + ',.text-editor', el );

		this.initFormElements = this.initFormElements.bind( this );
		this.initEditors = this.initEditors.bind( this );
		this.checkActiveInputs = this.checkActiveInputs.bind( this );
		this.validateFields = this.validateFields.bind( this );
		this.collectData = this.collectData.bind( this );
		this.setFieldValues = this.setFieldValues.bind( this );
		this.clearForm = this.clearForm.bind( this );

		this.initFormElements();
		this.initEditors();
	}

	// This function will loop through all input field elements to check for
	// inputs and select elements to create our custom TextBox or Select objects
	initFormElements() {
		this.inputFields.forEach( container => {
			let select = container.querySelector( 'select' );
			let input = container.querySelector( 'input' );

			if ( select && !select.Select ) {
				select.Select = new __WEBPACK_IMPORTED_MODULE_3__select__["a" /* default */]( select );
			}

			if ( !input ) {
				input = container.querySelector( 'textarea' );
			}

			if ( !input ) {
				input = container.querySelector( '.' + formCssClasses.mediumEditor );
			}

			if ( input ) {
				let tag = input.tagName.toLowerCase();
				let type = input.type ? input.type.toLowerCase() : '';

				if ( !input.TextBox && type !== 'checkbox' && type !== 'radio' ) {
					let isCKEditor = false;
					let isMediumEditor = false;
					let isQuillEditor = false;

					if ( input.classList.contains( formCssClasses.ckeditor ) ) {
						isCKEditor = true;
					}
					else if ( input.classList.contains( formCssClasses.mediumEditor ) ) {
						isMediumEditor = true;
					}
					else if ( input.classList.contains( formCssClasses.quillEditor ) ) {
						isQuillEditor = true;
					}

					input.TextBox = new __WEBPACK_IMPORTED_MODULE_2__textBox__["a" /* default */]( input, isCKEditor, isMediumEditor, isQuillEditor );
				}
			}
        } );

        this.fields.forEach( el => {
            if ( el.classList.contains( 'input-date' ) && !el.isUpgraded ) {
                this.initDatePicker( el );
            }
        } );
	}

    initDatePicker( field ) {
        // make sure it is a text input
        field.type = 'text';

        // if touch device use default date picker
        if ( 'ontouchstart' in document.documentElement && __WEBPACK_IMPORTED_MODULE_1__utils_utils__["e" /* mq */]( '(max-width:1024px)' ) ) {
            field.type = 'date';
            return;
        }

        const setPicker = _ => {
            if ( field.isUpgraded ) {
                return;
            }

            const picker = new Pikaday( {
                field: field,
                format: 'MM/DD/YYYY',
                onSelect: function() {
                    field.value = this.getMoment().format( 'MM/DD/YYYY' );
                }
            } );
            
            field.isUpgraded = true;
        };

        if ( typeof self.Pikaday === 'undefined' || !self.Pikaday ) {
            __WEBPACK_IMPORTED_MODULE_1__utils_utils__["d" /* loadScript */]( SCRIPT_MOMENT )
                .then( _ => __WEBPACK_IMPORTED_MODULE_1__utils_utils__["d" /* loadScript */]( SCRIPT_PIKADAY ) )
                .then( _ => setPicker() );
        }
        else {
            setPicker();
        }
    }

	// Helper functions to initialize textareas with MediumEditor or CKEDITOR
	// depending on specified class
	initEditors() {
		this.fields.forEach( field => {
			if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				if ( !window.MediumEditor ) {
					console.warn( 'MediumEditor source not found. Unable to use MediumEditor.' );
				}
				else {
					new MediumEditor( field, this.editorOptions || mediumEditorSettings );
				}
			}
			else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
				if ( !window.CKEDITOR ) {
					console.warn( 'CKEDITOR source not found. Unable to use CKEDITOR' );
				}
				else {
					CKEDITOR.replace( field.id, this.editorOptions || ckEditorSettings );

					if ( field.classList.contains( 'ckfinder' ) ) {
						CKFinder.setupCKEditor( CKEDITOR.instances[field.id], '/ckfinder/' );
					}
				}
			}
		} );
	}

	// Check if inputs/selects have values to set or remove active class
	// on the sibling label
	checkActiveInputs() {
		this.inputFields.forEach( container => {
			let lbl = container.querySelector( 'label' );
			let select = container.querySelector( 'select' );
			let input = container.querySelector( 'input' );

			if ( lbl ) {
				lbl.classList.remove( 'active' );
			}

			if ( select && select.Select ) {
				select.Select.checkForValue();
			}

			if ( !input ) {
				input = container.querySelector( 'textarea' );
			}

			if ( !input ) {
				input = container.querySelector( '.' + formCssClasses.mediumEditor );
			}

			if ( input && input.TextBox ) {
				input.TextBox.checkForValue();
			}
		} );
	}

	// Helper function to check if required fields have valid data
	validateFields() {
		let isValid = true;

		// changed this loop to use all fields so that we can check
		//   if field level validation is ok.
		this.fields.forEach( field => {
			let isFieldValid = true;
			let val = '';
			let tag = field.tagName.toLowerCase();

			if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				val = field.innerText.trim();

				if ( field.TextBox ) {
					isFieldValid = field.TextBox.validateField();
				}
				else if ( field.classList.contains( 'req' ) && val === '' ) {
					isFieldValid = false;
				}
			}
			else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
				if ( field.TextBox ) {
					isFieldValid = field.TextBox.validateField();
				}
				else {
					val = CKEDITOR.instances[field.id].getData().trim();

					if ( field.classList.contains( 'req' ) && val === '' ) {
						isFieldValid = false;
					}
				}
			}
			else if ( tag === 'select' ) {
				if ( field.Select ) {
					val = field.Select.getValue();
					isFieldValid = field.Select.checkIfRequired();
				}
				else if ( !field.classList.contains( formCssClasses.chosenSelect ) ) {
					val = field.options[field.selectedIndex].value;

					if ( field.classList.contains( 'req' ) && ( val === '' || val === '-1' ) ) {
						isFieldValid = false;
					}
				}
			}
			else {
				if ( field.TextBox && field.classList.contains( 'req' ) ) {
					isFieldValid = field.TextBox.validateField();
				}
				else {
					val = field.value.trim();

					if ( field.classList.contains( 'req' ) && val === '' ) {
						isFieldValid = false;
					}
				}
			}

			if ( isValid && !isFieldValid ) {
				isValid = false;
			}

			if ( !isFieldValid ) {
				console.log( 'Invalid Field: ', field );
			}
		} );

		return isValid;
	}

	// Helper function to collect data from form fields and return as
	// JSON key/value pair object. Uses the element's name attribute as the key.
	collectData() {
		let params = {};

		this.fields.forEach( field => {
			let key = field.getAttribute( 'name' );
			let val = '';
			let tag = field.tagName.toLowerCase();
			let type = field.type ? field.type.toLowerCase() : '';

			if ( type === 'checkbox' ) {
				val = field.checked;
			}
			else if ( type === 'radio ' ) {
				if ( field.checked ) {
					val = field.value;
				}
				else {
					key = null;
				}
			}
			else if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				val = field.innerHTML;
			}
			else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
				val = CKEDITOR.instances[field.id].getData().trim();
			}
			else if ( tag === 'select' ) {
				if ( field.Select ) {
					val = field.Select.getValue();
				}
				else if ( !field.classList.contains( formCssClasses.chosenSelect ) ) {
					val = field.options[field.selectedIndex].value;
				}
			}
			else {
				val = field.value.trim();

				if ( field.classList.contains( 'integer' ) ) {
					val = parseInt( val, 10 );
				}
				else if ( field.classList.contains( 'decimal' ) ) {
					if ( val === '' ) {
						val = -1;
					}

					val = parseFloat( val );
				}
			}

			if ( key !== null ) {
				params[key] = val;
			}

		} );

		return params;
	}

	// Helper function to set the values of form fields. Will use the
	// name attribute of each field element to select the respective value
	// from the obj parameter.
	setFieldValues( obj ) {
		this.fields.forEach( field => {
			let val = obj[field.getAttribute( 'name' )];
			let type = field.type ? field.type.toLowerCase() : '';
			let tag = field.tagName.toLowerCase();

			if ( !val ) {
				console.warn( 'Property does not exist for key ' + field.getAttribute( 'name' ) );
			}
			else {
				if ( type === 'checkbox' ) {
					field.checked = val;
				}
				else if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
					field.innerHTML = val;
				}
				else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
					val = CKEDITOR.instances[field.id].setData( val );
				}
				else if ( tag === 'select' && field.Select ) {
					field.Select.setValue( val );
				}
				else {
					if ( field.classList.contains( 'input-date' ) ) {
						if ( obj[field.getAttribute( 'name' ) + 'Str'] ) {
							val = obj[field.getAttribute( 'name' ) + 'Str'];
						}
						else {
							val = moment( val ).format( 'MM/DD/YYYY' );
						}
					}

					field.value = val;
				}
			}
		} );

		this.checkActiveInputs();
	}

	// Helper function to clear out the values of a form. Will additionally
	// remove all HTML from containers with class .row-preview and hide
	// all elements with class .btn-item-upload-delete. It will then
	// run checkActiveInputs to reset the labels.
	clearForm() {
		this.fields.forEach( field => {
			let lbl = field.parentNode.querySelector( '.' + formCssClasses.errorLabel );
			let type = field.type ? field.type.toLowerCase() : '';
			let tag = field.tagName.toLowerCase();

			if ( type === 'checkbox' ) {
				field.checked = false;
			}
			else if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				field.innerHTML = '';
			}
			else if ( tag === 'textarea' ) {
				if ( field.classList.contains( formCssClasses.ckeditor ) ) {
					CKEDITOR.instances[field.id].setData( '' );
				}
				else {
					field.value = '';
				}
			}
			else if ( tag === 'select' ) {
				if ( field.Select ) {
					field.Select.setValue( '-1' );
				}
				else if ( field.multiple && field.classList.contains( formCssClasses.chosenSelect ) ) {
					Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( 'option', field ).forEach( opt => opt.selected = false );

					jQuery( field ).trigger( 'chosen:updated' );
				}
				else {
					field.value = '-1';
				}
			}
			else {
				field.value = '';
			}

			field.classList.remove( formCssClasses.invalid );

			if ( lbl ) {
				field.parentNode.removeChild( lbl );
			}
		} );

		Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.row-preview', this.container ).forEach( row => row.innerHTML = '' );
		Object(__WEBPACK_IMPORTED_MODULE_0__utils___["b" /* $$ */])( '.btn-item-upload-delete', this.container ).forEach( btn => btn.classList.add( 'hidden' ) );

		this.checkActiveInputs();
	}

	hide() {
		this.container.classList.add( formCssClasses.hidden );
	}

	show() {
		this.checkActiveInputs();
		this.container.classList.remove( formCssClasses.hidden );
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Form;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_inputmask_inputmask_numeric_extensions__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_inputmask_inputmask_numeric_extensions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__libs_inputmask_inputmask_numeric_extensions__);
﻿/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1.0
 *
 * Corresponding HTML should follow:
 *
 * <div class="input-field">
 *   <input type="text" id="tb-mytb" name="dbCol" />
 *   <label for="tb-mytb">Label Text</label>
 * </div>
 *
 * To make a field required, add class="req"
 * To make a field use a datepicker, add class="input-date"
 *
 * To autovalidate email, set type="email"
 * To auotvalidate phone numbers, set type="tel"
 */


'use strict';

const SCRIPT_PIKADAY = '/js/app/libs/pikaday.js';
const SCRIPT_MOMENT = '/js/app/libs/moment.js';
//const SCRIPT_INPUTMASK = '/js/app/libs/inputmask.min.js';

const cssClasses = {
	ACTIVE_FIELD_CLASS: 'active',
	DATE_SELECTOR: 'input-date',
	ERROR_LABEL: 'error-label',
	INVALID_REQ_FIELD: 'invalid',
	REQUIRED_FIELD: 'req'
};

// array of reg Expression for validation made up of the following objects
// {{ type: 'Type or ClassName that indicates test should be applied', regExp: 'Expression to test', msg:'Invalid Msg' },
const validationTests = [
	{ type: 'req', regExp: /^(?!\s*$).+/, msg: 'Required Field' },
	{ type: 'email', regExp: /[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?/i, msg: 'Invalid Email Address' },
	{ type: 'tel', regExp: /^$|\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, msg: 'Invalid Phone Number' },
	{ type: 'input-date', regExp: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, msg: 'Invalid Date' },
	{ type: 'zip', regExp: /^$|\d{5}(?:[-\s]\d{4})?$/, msg: 'Invalid Zipcode' },
	{ type: 'numonly', regExp: /[0-9]$/, msg: 'Numbers Only' },
	{ type: 'currency', regExp: /^\d+(\.\d{1,2})?$/i, msg: 'Number or decimal only' }
];

class TextBox {
	// Provide the input element for this TextBox
	constructor( input, isCKEditor, isMediumEditor, isQuillEditor ) {
		// elements
		this.input = input;
		this.container = input.parentNode;
		this.label = this.container.querySelector( 'label' );

		// if this is a ckeditor or mediumeditor
		this.isCKEditor = isCKEditor;
		this.isMediumEditor = isMediumEditor;
		this.isQuillEditor = isQuillEditor;

		// check for date
		if ( this.input.classList.contains( cssClasses.DATE_SELECTOR ) ) {
			this.initDatePicker();
		}

		// check for initial value
		this.checkForValue();

		this.initDatePicker = this.initDatePicker.bind( this );
		this.focusHandler = this.focusHandler.bind( this );
		this.blurHandler = this.blurHandler.bind( this );
		this.validateField = this.validateField.bind( this );
		this.checkForValue = this.checkForValue.bind( this );
		this.setValue = this.setValue.bind( this );
		this.getValue = this.getValue.bind( this );

        this.addEventListeners();
        this.inputMaskSetup();



	}

	// Add the event listeners
	addEventListeners() {
		this.input.addEventListener( 'focus', this.focusHandler, false );
		this.input.addEventListener( 'blur', this.blurHandler, false );
		this.input.addEventListener( 'change', this.checkForValue, false );


		if ( this.input.classList.contains( 'currency' ) ) {
            const im = new __WEBPACK_IMPORTED_MODULE_1__libs_inputmask_inputmask_numeric_extensions___default.a(
                {
                    alias: 'currency',
                    autoUnmask: true,
                    clearMaskOnLostFocus: true

                } );

                im.mask( this.input );

            if ( this.input.getAttribute( 'data-sumtype' ) === 'N' ) {
                this.input.parentNode.classList.add( 'input-neg-num' );
            }

        }

    }

    inputMaskSetup() {

        const imAlias = this.input.getAttribute( 'data-mask' );

        if ( imAlias !== null && imAlias !== '' ) {

            const im = new __WEBPACK_IMPORTED_MODULE_1__libs_inputmask_inputmask_numeric_extensions___default.a(
                {
                    alias: imAlias,
                    autoUnmask: true,
                    clearMaskOnLostFocus: true

                } );

            im.mask( this.input );

        }

    }

	// Initialize the date picker if the input has class .input-date
	initDatePicker() {
		const field = this.input;
		// make sure it is a text input
		field.type = 'text';

		// if touch device use default date picker
		if ( 'ontouchstart' in document.documentElement && __WEBPACK_IMPORTED_MODULE_0__utils_utils__["e" /* mq */]( '(max-width:1024px)' ) ) {
			field.type = 'date';
			return;
		}

		const setPicker = _ => {
			if ( field.isUpgraded ) {
				return;
			}

			const picker = new Pikaday( {
				field: field,
				format: 'MM/DD/YYYY',
				onSelect: function() {
					field.value = this.getMoment().format( 'MM/DD/YYYY' );
				}
			} );

			field.isUpgraded = true;
		};

		if ( typeof self.Pikaday === 'undefined' || !self.Pikaday ) {
			__WEBPACK_IMPORTED_MODULE_0__utils_utils__["d" /* loadScript */]( SCRIPT_MOMENT )
				.then( _ => __WEBPACK_IMPORTED_MODULE_0__utils_utils__["d" /* loadScript */]( SCRIPT_PIKADAY ) )
				.then( _ => setPicker() );
		}
		else {
			setPicker();
		}
	}

	// OnFocus event handler
    focusHandler() {
        if ( this.label ) {
            this.label.classList.add( cssClasses.ACTIVE_FIELD_CLASS );
        }
	}

	// OnBlur event handler
	blurHandler() {
		this.checkForValue();
		this.validateField();
	}

	// Helper function to check for a value and handle the active class of the label
    checkForValue() {
        if ( this.label ) {
             if ( this.getValue() !== '' ) {
                this.label.classList.add( cssClasses.ACTIVE_FIELD_CLASS );
            }
            else {
                this.label.classList.remove( cssClasses.ACTIVE_FIELD_CLASS );
            }
        }
	}

	// Helper function to provide validation of field data based on input type and classes
	validateField( compareWithLimit ) {
		let field = this.input;
		let type = field.type ? field.type.toLowerCase() : '';
		let valid = true;
		let val = this.getValue();
		let minChars = field.getAttribute( 'min-chars' );
		let compareWith = field.getAttribute( 'compare-with' );
		let prevError = this.container.querySelector( '.' + cssClasses.ERROR_LABEL );
		let lbl;
		let msg = '';
		let expFound = false;

		if ( minChars && val.length < parseInt( minChars, 10 ) ) {
			valid = false;
			msg = minChars + ' characters required.';
			expFound = true;
		}
		else if ( compareWith ) {
			let compField = document.getElementById( compareWith );
			let compValue = compField.value;
			let thisValue = field.value;

			if ( compValue !== thisValue ) {
				valid = false;
				msg = 'Does Not Match';
				expFound = true;
			}
			else {
				if ( !compareWithLimit ) {
					compField.TextBox.validateField( true );
				}
			}
		}

		if ( !expFound ) {
			//Loop thru validation test to see if any need to be applied.
			for ( var vtCnt = 0; vtCnt < validationTests.length; vtCnt++ ) {
				if ( type === validationTests[vtCnt].type || field.classList.contains( validationTests[vtCnt].type ) ) {
					if ( !validationTests[vtCnt].regExp.test( val ) ) {
						valid = false;
						msg = validationTests[vtCnt].msg;
						break;
					}
				}
			}
		}

		// remove any previous error messages
		if ( prevError ) {
			this.container.removeChild( prevError );
		}

		// if the field is valid
		if ( valid ) {
			field.classList.remove( cssClasses.INVALID_REQ_FIELD );
		}

		// if invalid, make sure it is highlighted
		else {
			field.classList.add( cssClasses.INVALID_REQ_FIELD );

			// if we have a message
			if ( msg !== '' ) {
				lbl = document.createElement( 'span' );
				lbl.classList.add( cssClasses.ERROR_LABEL );
				lbl.textContent = msg;
				this.container.appendChild( lbl );
			}
		}

		return valid;
	}

	// Helper function to set the value of the input
	setValue( val ) {
		this.input.value = val;
		this.checkForValue();
		this.validateField();
	}

	// Helper function get the value of the input
	getValue() {
		if ( this.isCKEditor ) {
			return CKEDITOR.instances[this.input.id].getData().trim();
		}
		else if ( this.isMediumEditor ) {
			return this.input.innerText.trim();
		}
		else if ( this.isQuillEditor ) {
			return '';
		}

		return this.input.value.trim();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextBox;




//( function( $, undefined ) {

//    "use strict";

//    // When ready.
//    $( function() {

//        var $form = $( "#form" );
//        var $input = $form.find( "input" );

//        $input.on( "keyup", function( event ) {


//            // When user select text in the document, also abort.
//            var selection = window.getSelection().toString();
//            if ( selection !== '' ) {
//                return;
//            }

//            // When the arrow keys are pressed, abort.
//            if ( $.inArray( event.keyCode, [38, 40, 37, 39] ) !== -1 ) {
//                return;
//            }


//            var $this = $( this );

//            // Get the value.
//            var input = $this.val();

//            var input = input.replace( /[\D\s\._\-]+/g, "" );
//            input = input ? parseInt( input, 10 ) : 0;

//            $this.val( function() {
//                return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
//            });
//        });

//        /**
//         * ==================================
//         * When Form Submitted
//         * ==================================
//         */
//        $form.on( "submit", function( event ) {

//            var $this = $( this );
//            var arr = $this.serializeArray();

//            for ( var i = 0; i < arr.length; i++ ) {
//                arr[i].value = arr[i].value.replace( /[($)\s\._\-]+/g, '' ); // Sanitize the values.
//            };

//            console.log( arr );

//            event.preventDefault();
//        });

//    });
//})( jQuery );

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
* inputmask.numeric.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

!function( factory ) {
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(3), __webpack_require__(14) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == typeof exports ? module.exports = factory( require( './dependencyLibs/inputmask.dependencyLib' ), require( './inputmask' ) ) : factory( window.dependencyLib || jQuery, window.Inputmask );
}( function( $, Inputmask, undefined ) {
    function autoEscape( txt, opts ) {
        for ( var escapedTxt = '', i = 0; i < txt.length; i++ ) Inputmask.prototype.definitions[txt.charAt( i )] || opts.definitions[txt.charAt( i )] || opts.optionalmarker.start === txt.charAt( i ) || opts.optionalmarker.end === txt.charAt( i ) || opts.quantifiermarker.start === txt.charAt( i ) || opts.quantifiermarker.end === txt.charAt( i ) || opts.groupmarker.start === txt.charAt( i ) || opts.groupmarker.end === txt.charAt( i ) || opts.alternatormarker === txt.charAt( i ) ? escapedTxt += '\\' + txt.charAt( i ) : escapedTxt += txt.charAt( i );
        return escapedTxt;
    }
    return Inputmask.extendAliases( {
        numeric: {
            mask: function( opts ) {
                if ( 0 !== opts.repeat && isNaN( opts.integerDigits ) && ( opts.integerDigits = opts.repeat ), 
                opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ( '.' === opts.radixPoint ? opts.groupSeparator = ',' : ',' === opts.radixPoint ? opts.groupSeparator = '.' : opts.groupSeparator = '' ), 
                ' ' === opts.groupSeparator && ( opts.skipOptionalPartCharacter = undefined ), opts.autoGroup = opts.autoGroup && '' !== opts.groupSeparator, 
                opts.autoGroup && ( 'string' == typeof opts.groupSize && isFinite( opts.groupSize ) && ( opts.groupSize = parseInt( opts.groupSize ) ), 
                isFinite( opts.integerDigits ) ) ) {
                    var seps = Math.floor( opts.integerDigits / opts.groupSize ), mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits = parseInt( opts.integerDigits ) + ( 0 === mod ? seps - 1 : seps ), 
                    opts.integerDigits < 1 && ( opts.integerDigits = '*' );
                }
                opts.placeholder.length > 1 && ( opts.placeholder = opts.placeholder.charAt( 0 ) ), 
                'radixFocus' === opts.positionCaretOnClick && '' === opts.placeholder && !1 === opts.integerOptional && ( opts.positionCaretOnClick = 'lvp' ), 
                opts.definitions[';'] = opts.definitions['~'], opts.definitions[';'].definitionSymbol = '~', 
                !0 === opts.numericInput && ( opts.positionCaretOnClick = 'radixFocus' === opts.positionCaretOnClick ? 'lvp' : opts.positionCaretOnClick, 
                opts.digitsOptional = !1, isNaN( opts.digits ) && ( opts.digits = 2 ), opts.decimalProtect = !1 );
                var mask = '[+]';
                if ( mask += autoEscape( opts.prefix, opts ), !0 === opts.integerOptional ? mask += '~{1,' + opts.integerDigits + '}' : mask += '~{' + opts.integerDigits + '}', 
                opts.digits !== undefined ) {
                    opts.radixPointDefinitionSymbol = opts.decimalProtect ? ':' : opts.radixPoint;
                    var dq = opts.digits.toString().split( ',' );
                    isFinite( dq[0] && dq[1] && isFinite( dq[1] ) ) ? mask += opts.radixPointDefinitionSymbol + ';{' + opts.digits + '}' : ( isNaN( opts.digits ) || parseInt( opts.digits ) > 0 ) && ( opts.digitsOptional ? mask += '[' + opts.radixPointDefinitionSymbol + ';{1,' + opts.digits + '}]' : mask += opts.radixPointDefinitionSymbol + ';{' + opts.digits + '}' );
                }
                return mask += autoEscape( opts.suffix, opts ), mask += '[-]', opts.greedy = !1, mask;
            },
            placeholder: '',
            greedy: !1,
            digits: '*',
            digitsOptional: !0,
            enforceDigitsOnBlur: !1,
            radixPoint: '.',
            positionCaretOnClick: 'radixFocus',
            groupSize: 3,
            groupSeparator: '',
            autoGroup: !1,
            allowMinus: !0,
            negationSymbol: {
                front: '-',
                back: ''
            },
            integerDigits: '+',
            integerOptional: !0,
            prefix: '',
            suffix: '',
            rightAlign: !0,
            decimalProtect: !0,
            min: null,
            max: null,
            step: 1,
            insertMode: !0,
            autoUnmask: !1,
            unmaskAsNumber: !1,
            inputmode: 'numeric',
            preValidation: function( buffer, pos, c, isSelection, opts ) {
                if ( '-' === c || c === opts.negationSymbol.front ) return !0 === opts.allowMinus && ( opts.isNegative = opts.isNegative === undefined || !opts.isNegative, 
                '' === buffer.join( '' ) || {
                    caret: pos,
                    dopost: !0
                } );
                if ( !1 === isSelection && c === opts.radixPoint && opts.digits !== undefined && ( isNaN( opts.digits ) || parseInt( opts.digits ) > 0 ) ) {
                    var radixPos = $.inArray( opts.radixPoint, buffer );
                    if ( -1 !== radixPos ) return !0 === opts.numericInput ? pos === radixPos : {
                        caret: radixPos + 1
                    };
                }
                return !0;
            },
            postValidation: function( buffer, currentResult, opts ) {
                var suffix = opts.suffix.split( '' ), prefix = opts.prefix.split( '' );
                if ( currentResult.pos === undefined && currentResult.caret !== undefined && !0 !== currentResult.dopost ) return currentResult;
                var caretPos = currentResult.caret !== undefined ? currentResult.caret : currentResult.pos, maskedValue = buffer.slice();
                opts.numericInput && ( caretPos = maskedValue.length - caretPos - 1, maskedValue = maskedValue.reverse() );
                var charAtPos = maskedValue[caretPos];
                if ( charAtPos === opts.groupSeparator && ( charAtPos = maskedValue[caretPos += 1] ), 
                caretPos === maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint ) return currentResult;
                charAtPos !== undefined && charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && ( maskedValue[caretPos] = '?', 
                opts.prefix.length > 0 && caretPos >= ( !1 === opts.isNegative ? 1 : 0 ) && caretPos < opts.prefix.length - 1 + ( !1 === opts.isNegative ? 1 : 0 ) ? prefix[caretPos - ( !1 === opts.isNegative ? 1 : 0 )] = '?' : opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - ( !1 === opts.isNegative ? 1 : 0 ) && ( suffix[caretPos - ( maskedValue.length - opts.suffix.length - ( !1 === opts.isNegative ? 1 : 0 ) )] = '?' ) ), 
                prefix = prefix.join( '' ), suffix = suffix.join( '' );
                var processValue = maskedValue.join( '' ).replace( prefix, '' );
                if ( processValue = processValue.replace( suffix, '' ), processValue = processValue.replace( new RegExp( Inputmask.escapeRegex( opts.groupSeparator ), 'g' ), '' ), 
                processValue = processValue.replace( new RegExp( '[-' + Inputmask.escapeRegex( opts.negationSymbol.front ) + ']', 'g' ), '' ), 
                processValue = processValue.replace( new RegExp( Inputmask.escapeRegex( opts.negationSymbol.back ) + '$' ), '' ), 
                isNaN( opts.placeholder ) && ( processValue = processValue.replace( new RegExp( Inputmask.escapeRegex( opts.placeholder ), 'g' ), '' ) ), 
                processValue.length > 1 && 1 !== processValue.indexOf( opts.radixPoint ) && ( '0' === charAtPos && ( processValue = processValue.replace( /^\?/g, '' ) ), 
                processValue = processValue.replace( /^0/g, '' ) ), processValue.charAt( 0 ) === opts.radixPoint && '' !== opts.radixPoint && !0 !== opts.numericInput && ( processValue = '0' + processValue ), 
                '' !== processValue ) {
                    if ( processValue = processValue.split( '' ), ( !opts.digitsOptional || opts.enforceDigitsOnBlur && 'blur' === currentResult.event ) && isFinite( opts.digits ) ) {
                        var radixPosition = $.inArray( opts.radixPoint, processValue ), rpb = $.inArray( opts.radixPoint, maskedValue );
                        -1 === radixPosition && ( processValue.push( opts.radixPoint ), radixPosition = processValue.length - 1 );
                        for ( var i = 1; i <= opts.digits; i++ ) opts.digitsOptional && ( !opts.enforceDigitsOnBlur || 'blur' !== currentResult.event ) || processValue[radixPosition + i] !== undefined && processValue[radixPosition + i] !== opts.placeholder.charAt( 0 ) ? -1 !== rpb && maskedValue[rpb + i] !== undefined && ( processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i] ) : processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt( 0 );
                    }
                    if ( !0 !== opts.autoGroup || '' === opts.groupSeparator || charAtPos === opts.radixPoint && currentResult.pos === undefined && !currentResult.dopost ) processValue = processValue.join( '' ); else {
                        var addRadix = processValue[processValue.length - 1] === opts.radixPoint && currentResult.c === opts.radixPoint;
                        processValue = Inputmask( function( buffer, opts ) {
                            var postMask = '';
                            if ( postMask += '(' + opts.groupSeparator + '*{' + opts.groupSize + '}){*}', '' !== opts.radixPoint ) {
                                var radixSplit = buffer.join( '' ).split( opts.radixPoint );
                                radixSplit[1] && ( postMask += opts.radixPoint + '*{' + radixSplit[1].match( /^\d*\??\d*/ )[0].length + '}' );
                            }
                            return postMask;
                        }( processValue, opts ), {
                            numericInput: !0,
                            jitMasking: !0,
                            definitions: {
                                '*': {
                                    validator: '[0-9?]',
                                    cardinality: 1
                                }
                            }
                        } ).format( processValue.join( '' ) ), addRadix && ( processValue += opts.radixPoint ), 
                        processValue.charAt( 0 ) === opts.groupSeparator && processValue.substr( 1 );
                    }
                }
                if ( opts.isNegative && 'blur' === currentResult.event && ( opts.isNegative = '0' !== processValue ), 
                processValue = prefix + processValue, processValue += suffix, opts.isNegative && ( processValue = opts.negationSymbol.front + processValue, 
                processValue += opts.negationSymbol.back ), processValue = processValue.split( '' ), 
                charAtPos !== undefined ) if ( charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back ) ( caretPos = $.inArray( '?', processValue ) ) > -1 ? processValue[caretPos] = charAtPos : caretPos = currentResult.caret || 0; else if ( charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back ) {
                    var newCaretPos = $.inArray( charAtPos, processValue );
                    -1 !== newCaretPos && ( caretPos = newCaretPos );
                }
                opts.numericInput && ( caretPos = processValue.length - caretPos - 1, processValue = processValue.reverse() );
                var rslt = {
                    caret: charAtPos === undefined || currentResult.pos !== undefined ? caretPos + ( opts.numericInput ? -1 : 1 ) : caretPos,
                    buffer: processValue,
                    refreshFromBuffer: currentResult.dopost || buffer.join( '' ) !== processValue.join( '' )
                };
                return rslt.refreshFromBuffer ? rslt : currentResult;
            },
            onBeforeWrite: function( e, buffer, caretPos, opts ) {
                if ( e ) switch ( e.type ) {
                  case 'keydown':
                    return opts.postValidation( buffer, {
                        caret: caretPos,
                        dopost: !0
                    }, opts );

                  case 'blur':
                  case 'checkval':
                    var unmasked;
                    if ( function( opts ) {
                        opts.parseMinMaxOptions === undefined && ( null !== opts.min && ( opts.min = opts.min.toString().replace( new RegExp( Inputmask.escapeRegex( opts.groupSeparator ), 'g' ), '' ), 
                        ',' === opts.radixPoint && ( opts.min = opts.min.replace( opts.radixPoint, '.' ) ), 
                        opts.min = isFinite( opts.min ) ? parseFloat( opts.min ) : NaN, isNaN( opts.min ) && ( opts.min = Number.MIN_VALUE ) ), 
                        null !== opts.max && ( opts.max = opts.max.toString().replace( new RegExp( Inputmask.escapeRegex( opts.groupSeparator ), 'g' ), '' ), 
                        ',' === opts.radixPoint && ( opts.max = opts.max.replace( opts.radixPoint, '.' ) ), 
                        opts.max = isFinite( opts.max ) ? parseFloat( opts.max ) : NaN, isNaN( opts.max ) && ( opts.max = Number.MAX_VALUE ) ), 
                        opts.parseMinMaxOptions = 'done' );
                    }( opts ), null !== opts.min || null !== opts.max ) {
                        if ( unmasked = opts.onUnMask( buffer.join( '' ), undefined, $.extend( {}, opts, {
                            unmaskAsNumber: !0
                        } ) ), null !== opts.min && unmasked < opts.min ) return opts.isNegative = opts.min < 0, 
                        opts.postValidation( opts.min.toString().replace( '.', opts.radixPoint ).split( '' ), {
                            caret: caretPos,
                            dopost: !0,
                            placeholder: '0'
                        }, opts );
                        if ( null !== opts.max && unmasked > opts.max ) return opts.isNegative = opts.max < 0, 
                        opts.postValidation( opts.max.toString().replace( '.', opts.radixPoint ).split( '' ), {
                            caret: caretPos,
                            dopost: !0,
                            placeholder: '0'
                        }, opts );
                    }
                    return opts.postValidation( buffer, {
                        caret: caretPos,
                        placeholder: '0',
                        event: 'blur'
                    }, opts );

                  case '_checkval':
                    return {
                        caret: caretPos
                    };
                }
            },
            regex: {
                integerPart: function( opts, emptyCheck ) {
                    return emptyCheck ? new RegExp( '[' + Inputmask.escapeRegex( opts.negationSymbol.front ) + '+]?' ) : new RegExp( '[' + Inputmask.escapeRegex( opts.negationSymbol.front ) + '+]?\\d+' );
                },
                integerNPart: function( opts ) {
                    return new RegExp( '[\\d' + Inputmask.escapeRegex( opts.groupSeparator ) + Inputmask.escapeRegex( opts.placeholder.charAt( 0 ) ) + ']+' );
                }
            },
            definitions: {
                '~': {
                    validator: function( chrs, maskset, pos, strict, opts, isSelection ) {
                        var isValid = strict ? new RegExp( '[0-9' + Inputmask.escapeRegex( opts.groupSeparator ) + ']' ).test( chrs ) : new RegExp( '[0-9]' ).test( chrs );
                        if ( !0 === isValid ) {
                            if ( !0 !== opts.numericInput && maskset.validPositions[pos] !== undefined && '~' === maskset.validPositions[pos].match.def && !isSelection ) {
                                var processValue = maskset.buffer.join( '' ), pvRadixSplit = ( processValue = ( processValue = processValue.replace( new RegExp( '[-' + Inputmask.escapeRegex( opts.negationSymbol.front ) + ']', 'g' ), '' ) ).replace( new RegExp( Inputmask.escapeRegex( opts.negationSymbol.back ) + '$' ), '' ) ).split( opts.radixPoint );
                                pvRadixSplit.length > 1 && ( pvRadixSplit[1] = pvRadixSplit[1].replace( /0/g, opts.placeholder.charAt( 0 ) ) ), 
                                '0' === pvRadixSplit[0] && ( pvRadixSplit[0] = pvRadixSplit[0].replace( /0/g, opts.placeholder.charAt( 0 ) ) ), 
                                processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || '';
                                var bufferTemplate = maskset._buffer.join( '' );
                                for ( processValue === opts.radixPoint && ( processValue = bufferTemplate ); null === processValue.match( Inputmask.escapeRegex( bufferTemplate ) + '$' ); ) bufferTemplate = bufferTemplate.slice( 1 );
                                isValid = ( processValue = ( processValue = processValue.replace( bufferTemplate, '' ) ).split( '' ) )[pos] === undefined ? {
                                    pos: pos,
                                    remove: pos
                                } : {
                                    pos: pos
                                };
                            }
                        } else strict || chrs !== opts.radixPoint || maskset.validPositions[pos - 1] !== undefined || ( maskset.buffer[pos] = '0', 
                        isValid = {
                            pos: pos + 1
                        } );
                        return isValid;
                    },
                    cardinality: 1
                },
                '+': {
                    validator: function( chrs, maskset, pos, strict, opts ) {
                        return opts.allowMinus && ( '-' === chrs || chrs === opts.negationSymbol.front );
                    },
                    cardinality: 1,
                    placeholder: ''
                },
                '-': {
                    validator: function( chrs, maskset, pos, strict, opts ) {
                        return opts.allowMinus && chrs === opts.negationSymbol.back;
                    },
                    cardinality: 1,
                    placeholder: ''
                },
                ':': {
                    validator: function( chrs, maskset, pos, strict, opts ) {
                        var radix = '[' + Inputmask.escapeRegex( opts.radixPoint ) + ']', isValid = new RegExp( radix ).test( chrs );
                        return isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && ( isValid = {
                            caret: pos + 1
                        } ), isValid;
                    },
                    cardinality: 1,
                    placeholder: function( opts ) {
                        return opts.radixPoint;
                    }
                }
            },
            onUnMask: function( maskedValue, unmaskedValue, opts ) {
                if ( '' === unmaskedValue && !0 === opts.nullable ) return unmaskedValue;
                var processValue = maskedValue.replace( opts.prefix, '' );
                return processValue = processValue.replace( opts.suffix, '' ), processValue = processValue.replace( new RegExp( Inputmask.escapeRegex( opts.groupSeparator ), 'g' ), '' ), 
                '' !== opts.placeholder.charAt( 0 ) && ( processValue = processValue.replace( new RegExp( opts.placeholder.charAt( 0 ), 'g' ), '0' ) ), 
                opts.unmaskAsNumber ? ( '' !== opts.radixPoint && -1 !== processValue.indexOf( opts.radixPoint ) && ( processValue = processValue.replace( Inputmask.escapeRegex.call( this, opts.radixPoint ), '.' ) ), 
                processValue = processValue.replace( new RegExp( '^' + Inputmask.escapeRegex( opts.negationSymbol.front ) ), '-' ), 
                processValue = processValue.replace( new RegExp( Inputmask.escapeRegex( opts.negationSymbol.back ) + '$' ), '' ), 
                Number( processValue ) ) : processValue;
            },
            isComplete: function( buffer, opts ) {
                var maskedValue = buffer.join( '' );
                if ( buffer.slice().join( '' ) !== maskedValue ) return !1;
                var processValue = maskedValue.replace( opts.prefix, '' );
                return processValue = processValue.replace( opts.suffix, '' ), processValue = processValue.replace( new RegExp( Inputmask.escapeRegex( opts.groupSeparator ), 'g' ), '' ), 
                ',' === opts.radixPoint && ( processValue = processValue.replace( Inputmask.escapeRegex( opts.radixPoint ), '.' ) ), 
                isFinite( processValue );
            },
            onBeforeMask: function( initialValue, opts ) {
                if ( opts.isNegative = undefined, initialValue = initialValue.toString().charAt( initialValue.length - 1 ) === opts.radixPoint ? initialValue.toString().substr( 0, initialValue.length - 1 ) : initialValue.toString(), 
                '' !== opts.radixPoint && isFinite( initialValue ) ) {
                    var vs = initialValue.split( '.' ), groupSize = '' !== opts.groupSeparator ? parseInt( opts.groupSize ) : 0;
                    2 === vs.length && ( vs[0].length > groupSize || vs[1].length > groupSize || vs[0].length <= groupSize && vs[1].length < groupSize ) && ( initialValue = initialValue.replace( '.', opts.radixPoint ) );
                }
                var kommaMatches = initialValue.match( /,/g ), dotMatches = initialValue.match( /\./g );
                if ( initialValue = dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? ( initialValue = initialValue.replace( /\./g, '' ) ).replace( ',', opts.radixPoint ) : kommaMatches.length > dotMatches.length ? ( initialValue = initialValue.replace( /,/g, '' ) ).replace( '.', opts.radixPoint ) : initialValue.indexOf( '.' ) < initialValue.indexOf( ',' ) ? initialValue.replace( /\./g, '' ) : initialValue.replace( /,/g, '' ) : initialValue.replace( new RegExp( Inputmask.escapeRegex( opts.groupSeparator ), 'g' ), '' ), 
                0 === opts.digits && ( -1 !== initialValue.indexOf( '.' ) ? initialValue = initialValue.substring( 0, initialValue.indexOf( '.' ) ) : -1 !== initialValue.indexOf( ',' ) && ( initialValue = initialValue.substring( 0, initialValue.indexOf( ',' ) ) ) ), 
                '' !== opts.radixPoint && isFinite( opts.digits ) && -1 !== initialValue.indexOf( opts.radixPoint ) ) {
                    var decPart = initialValue.split( opts.radixPoint )[1].match( new RegExp( '\\d*' ) )[0];
                    if ( parseInt( opts.digits ) < decPart.toString().length ) {
                        var digitsFactor = Math.pow( 10, parseInt( opts.digits ) );
                        initialValue = initialValue.replace( Inputmask.escapeRegex( opts.radixPoint ), '.' ), 
                        initialValue = ( initialValue = Math.round( parseFloat( initialValue ) * digitsFactor ) / digitsFactor ).toString().replace( '.', opts.radixPoint );
                    }
                }
                return initialValue;
            },
            canClearPosition: function( maskset, position, lvp, strict, opts ) {
                var vp = maskset.validPositions[position], canClear = vp.input !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && !1 === opts.decimalProtect || vp.input === opts.radixPoint && maskset.validPositions[position + 1] && null === maskset.validPositions[position + 1].match.fn || isFinite( vp.input ) || position === lvp || vp.input === opts.groupSeparator || vp.input === opts.negationSymbol.front || vp.input === opts.negationSymbol.back;
                return !canClear || '+' !== vp.match.nativeDef && '-' !== vp.match.nativeDef || ( opts.isNegative = !1 ), 
                canClear;
            },
            onKeyDown: function( e, buffer, caretPos, opts ) {
                var $input = $( this );
                if ( e.ctrlKey ) switch ( e.keyCode ) {
                  case Inputmask.keyCode.UP:
                    $input.val( parseFloat( this.inputmask.unmaskedvalue() ) + parseInt( opts.step ) ), $input.trigger( 'setvalue' );
                    break;

                  case Inputmask.keyCode.DOWN:
                    $input.val( parseFloat( this.inputmask.unmaskedvalue() ) - parseInt( opts.step ) ), $input.trigger( 'setvalue' );
                }
            }
        },
        currency: {
            prefix: '$ ',
            groupSeparator: ',',
            alias: 'numeric',
            placeholder: '0',
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {
            alias: 'numeric'
        },
        integer: {
            alias: 'numeric',
            digits: 0,
            radixPoint: ''
        },
        percentage: {
            alias: 'numeric',
            digits: 2,
            digitsOptional: !0,
            radixPoint: '.',
            placeholder: '0',
            autoGroup: !1,
            min: 0,
            max: 100,
            suffix: ' %',
            allowMinus: !1
        }
    } ), Inputmask;
} );

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
* inputmask.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

!function( factory ) {
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(3), __webpack_require__(4), __webpack_require__(5) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == typeof exports ? module.exports = factory( require( './dependencyLibs/inputmask.dependencyLib' ), require( './global/window' ), require( './global/document' ) ) : window.Inputmask = factory( window.dependencyLib || jQuery, window, document );
}( function( $, window, document, undefined ) {
    function Inputmask( alias, options, internal ) {
        if ( !( this instanceof Inputmask ) ) return new Inputmask( alias, options, internal );
        this.el = undefined, this.events = {}, this.maskset = undefined, this.refreshValue = !1, 
        !0 !== internal && ( $.isPlainObject( alias ) ? options = alias : ( options = options || {} ).alias = alias, 
        this.opts = $.extend( !0, {}, this.defaults, options ), this.noMasksCache = options && options.definitions !== undefined, 
        this.userOptions = options || {}, this.isRTL = this.opts.numericInput, resolveAlias( this.opts.alias, options, this.opts ) );
    }
    function resolveAlias( aliasStr, options, opts ) {
        var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
        return aliasDefinition ? ( aliasDefinition.alias && resolveAlias( aliasDefinition.alias, undefined, opts ), 
        $.extend( !0, opts, aliasDefinition ), $.extend( !0, opts, options ), !0 ) : ( null === opts.mask && ( opts.mask = aliasStr ), 
        !1 );
    }
    function generateMaskSet( opts, nocache ) {
        function generateMask( mask, metadata, opts ) {
            var regexMask = !1;
            if ( null !== mask && '' !== mask || ( ( regexMask = null !== opts.regex ) ? mask = ( mask = opts.regex ).replace( /^(\^)(.*)(\$)$/, '$2' ) : ( regexMask = !0, 
            mask = '.*' ) ), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && ( opts.placeholder = '' ), 
            opts.repeat > 0 || '*' === opts.repeat || '+' === opts.repeat ) {
                var repeatStart = '*' === opts.repeat ? 0 : '+' === opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + ',' + opts.repeat + opts.quantifiermarker.end;
            }
            var masksetDefinition, maskdefKey = regexMask ? 'regex_' + opts.regex : opts.numericInput ? mask.split( '' ).reverse().join( '' ) : mask;
            return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? ( masksetDefinition = {
                mask: mask,
                maskToken: Inputmask.prototype.analyseMask( mask, regexMask, opts ),
                validPositions: {},
                _buffer: undefined,
                buffer: undefined,
                tests: {},
                metadata: metadata,
                maskLength: undefined
            }, !0 !== nocache && ( Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
            masksetDefinition = $.extend( !0, {}, Inputmask.prototype.masksCache[maskdefKey] ) ) ) : masksetDefinition = $.extend( !0, {}, Inputmask.prototype.masksCache[maskdefKey] ), 
            masksetDefinition;
        }
        if ( $.isFunction( opts.mask ) && ( opts.mask = opts.mask( opts ) ), $.isArray( opts.mask ) ) {
            if ( opts.mask.length > 1 ) {
                opts.keepStatic = null === opts.keepStatic || opts.keepStatic;
                var altMask = opts.groupmarker.start;
                return $.each( opts.numericInput ? opts.mask.reverse() : opts.mask, function( ndx, msk ) {
                    altMask.length > 1 && ( altMask += opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start ), 
                    msk.mask === undefined || $.isFunction( msk.mask ) ? altMask += msk : altMask += msk.mask;
                } ), altMask += opts.groupmarker.end, generateMask( altMask, opts.mask, opts );
            }
            opts.mask = opts.mask.pop();
        }
        return opts.mask && opts.mask.mask !== undefined && !$.isFunction( opts.mask.mask ) ? generateMask( opts.mask.mask, opts.mask, opts ) : generateMask( opts.mask, opts.mask, opts );
    }
    function maskScope( actionObj, maskset, opts ) {
        function getMaskTemplate( baseOnInput, minimalPos, includeMode ) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
            do {
                !0 === baseOnInput && getMaskSet().validPositions[pos] ? ( test = ( testPos = getMaskSet().validPositions[pos] ).match, 
                ndxIntlzr = testPos.locator.slice(), maskTemplate.push( !0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder( pos, test ) ) ) : ( test = ( testPos = getTestTemplate( pos, ndxIntlzr, pos - 1 ) ).match, 
                ndxIntlzr = testPos.locator.slice(), ( !1 === opts.jitMasking || pos < lvp || 'number' == typeof opts.jitMasking && isFinite( opts.jitMasking ) && opts.jitMasking > pos ) && maskTemplate.push( !1 === includeMode ? test.nativeDef : getPlaceholder( pos, test ) ) ), 
                pos++;
            } while ( ( maxLength === undefined || pos < maxLength ) && ( null !== test.fn || '' !== test.def ) || minimalPos > pos );
            return '' === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), getMaskSet().maskLength = pos + 1, 
            maskTemplate;
        }
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet( soft ) {
            var maskset = getMaskSet();
            maskset.buffer = undefined, !0 !== soft && ( maskset.validPositions = {}, maskset.p = 0 );
        }
        function getLastValidPosition( closestTo, strict, validPositions ) {
            var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
            closestTo === undefined && ( closestTo = -1 );
            for ( var posNdx in valids ) {
                var psNdx = parseInt( posNdx );
                valids[psNdx] && ( strict || !0 !== valids[psNdx].generatedInput ) && ( psNdx <= closestTo && ( before = psNdx ), 
                psNdx >= closestTo && ( after = psNdx ) );
            }
            return -1 !== before && closestTo - before > 1 || after < closestTo ? before : after;
        }
        function stripValidPositions( start, end, nocheck, strict ) {
            var i, startPos = start, positionsClone = $.extend( !0, {}, getMaskSet().validPositions ), needsValidation = !1;
            for ( getMaskSet().p = start, i = end - 1; i >= startPos; i-- ) getMaskSet().validPositions[i] !== undefined && ( !0 !== nocheck && ( !getMaskSet().validPositions[i].match.optionality && function( pos ) {
                var posMatch = getMaskSet().validPositions[pos];
                if ( posMatch !== undefined && null === posMatch.match.fn ) {
                    var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
                    return prevMatch !== undefined && nextMatch !== undefined;
                }
                return !1;
            }( i ) || !1 === opts.canClearPosition( getMaskSet(), i, getLastValidPosition(), strict, opts ) ) || delete getMaskSet().validPositions[i] );
            for ( resetMaskSet( !0 ), i = startPos + 1; i <= getLastValidPosition(); ) {
                for ( ;getMaskSet().validPositions[startPos] !== undefined; ) startPos++;
                if ( i < startPos && ( i = startPos + 1 ), getMaskSet().validPositions[i] === undefined && isMask( i ) ) i++; else {
                    var t = getTestTemplate( i );
                    !1 === needsValidation && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? ( getMaskSet().validPositions[startPos] = $.extend( !0, {}, positionsClone[startPos] ), 
                    getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], 
                    i++ ) : positionCanMatchDefinition( startPos, t.match.def ) ? !1 !== isValid( startPos, t.input || getPlaceholder( i ), !0 ) && ( delete getMaskSet().validPositions[i], 
                    i++, needsValidation = !0 ) : isMask( i ) || ( i++, startPos-- ), startPos++;
                }
            }
            resetMaskSet( !0 );
        }
        function determineTestTemplate( tests, guessNextBest ) {
            for ( var testPos, testPositions = tests, lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests( 0 )[0], lvTestAltArr = lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation].toString().split( ',' ) : [], ndx = 0; ndx < testPositions.length && ( !( ( testPos = testPositions[ndx] ).match && ( opts.greedy && !0 !== testPos.match.optionalQuantifier || ( !1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker ) && !0 !== testPos.match.optionalQuantifier ) && ( lvTest.alternation === undefined || lvTest.alternation !== testPos.alternation || testPos.locator[lvTest.alternation] !== undefined && checkAlternationMatch( testPos.locator[lvTest.alternation].toString().split( ',' ), lvTestAltArr ) ) ) || !0 === guessNextBest && ( null !== testPos.match.fn || /[0-9a-bA-Z]/.test( testPos.match.def ) ) ); ndx++ ) ;
            return testPos;
        }
        function getTestTemplate( pos, ndxIntlzr, tstPs ) {
            return getMaskSet().validPositions[pos] || determineTestTemplate( getTests( pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs ) );
        }
        function getTest( pos ) {
            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests( pos )[0];
        }
        function positionCanMatchDefinition( pos, def ) {
            for ( var valid = !1, tests = getTests( pos ), tndx = 0; tndx < tests.length; tndx++ ) if ( tests[tndx].match && tests[tndx].match.def === def ) {
                valid = !0;
                break;
            }
            return valid;
        }
        function getTests( pos, ndxIntlzr, tstPs ) {
            function resolveTestFromToken( maskToken, ndxInitializer, loopNdx, quantifierRecurse ) {
                function handleMatch( match, loopNdx, quantifierRecurse ) {
                    function isFirstMatch( latestMatch, tokenGroup ) {
                        var firstMatch = 0 === $.inArray( latestMatch, tokenGroup.matches );
                        return firstMatch || $.each( tokenGroup.matches, function( ndx, match ) {
                            if ( !0 === match.isQuantifier && ( firstMatch = isFirstMatch( latestMatch, tokenGroup.matches[ndx - 1] ) ) ) return !1;
                        } ), firstMatch;
                    }
                    function resolveNdxInitializer( pos, alternateNdx, targetAlternation ) {
                        var bestMatch, indexPos;
                        if ( getMaskSet().validPositions[pos - 1] && targetAlternation && getMaskSet().tests[pos] ) for ( var vpAlternation = getMaskSet().validPositions[pos - 1].locator, tpAlternation = getMaskSet().tests[pos][0].locator, i = 0; i < targetAlternation; i++ ) if ( vpAlternation[i] !== tpAlternation[i] ) return vpAlternation.slice( targetAlternation + 1 );
                        return ( getMaskSet().tests[pos] || getMaskSet().validPositions[pos] ) && $.each( getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function( ndx, lmnt ) {
                            var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation, ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf( alternateNdx ) : -1;
                            ( indexPos === undefined || ndxPos < indexPos ) && -1 !== ndxPos && ( bestMatch = lmnt, 
                            indexPos = ndxPos );
                        } ), bestMatch ? bestMatch.locator.slice( ( targetAlternation !== undefined ? targetAlternation : bestMatch.alternation ) + 1 ) : targetAlternation !== undefined ? resolveNdxInitializer( pos, alternateNdx ) : undefined;
                    }
                    if ( testPos > 1e4 ) throw 'Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. ' + getMaskSet().mask;
                    if ( testPos === pos && match.matches === undefined ) return matches.push( {
                        match: match,
                        locator: loopNdx.reverse(),
                        cd: cacheDependency
                    } ), !0;
                    if ( match.matches !== undefined ) {
                        if ( match.isGroup && quantifierRecurse !== match ) {
                            if ( match = handleMatch( maskToken.matches[$.inArray( match, maskToken.matches ) + 1], loopNdx ) ) return !0;
                        } else if ( match.isOptional ) {
                            var optionalToken = match;
                            if ( match = resolveTestFromToken( match, ndxInitializer, loopNdx, quantifierRecurse ) ) {
                                if ( latestMatch = matches[matches.length - 1].match, !isFirstMatch( latestMatch, optionalToken ) ) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if ( match.isAlternator ) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if ( -1 === altIndex || 'string' == typeof altIndex ) {
                                var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                if ( 'string' == typeof altIndex ) altIndexArr = altIndex.split( ',' ); else for ( amndx = 0; amndx < alternateToken.matches.length; amndx++ ) altIndexArr.push( amndx );
                                for ( var ndx = 0; ndx < altIndexArr.length; ndx++ ) {
                                    if ( amndx = parseInt( altIndexArr[ndx] ), matches = [], ndxInitializer = resolveNdxInitializer( testPos, amndx, loopNdxCnt ) || ndxInitializerClone.slice(), 
                                    !0 !== ( match = handleMatch( alternateToken.matches[amndx] || maskToken.matches[amndx], [ amndx ].concat( loopNdx ), quantifierRecurse ) || match ) && match !== undefined && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length ) {
                                        var ntndx = $.inArray( match, maskToken.matches ) + 1;
                                        maskToken.matches.length > ntndx && ( match = handleMatch( maskToken.matches[ntndx], [ ntndx ].concat( loopNdx.slice( 1, loopNdx.length ) ), quantifierRecurse ) ) && ( altIndexArr.push( ntndx.toString() ), 
                                        $.each( matches, function( ndx, lmnt ) {
                                            lmnt.alternation = loopNdx.length - 1;
                                        } ) );
                                    }
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for ( var ndx1 = 0; ndx1 < maltMatches.length; ndx1++ ) {
                                        var altMatch = maltMatches[ndx1], dropMatch = !1;
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for ( var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++ ) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if ( 'string' != typeof altIndex || -1 !== $.inArray( altMatch.locator[altMatch.alternation].toString(), altIndexArr ) ) {
                                                if ( function( source, target ) {
                                                    return source.match.nativeDef === target.match.nativeDef || source.match.def === target.match.nativeDef || source.match.nativeDef === target.match.def;
                                                }( altMatch, altMatch2 ) ) {
                                                    dropMatch = !0, altMatch.alternation === altMatch2.alternation && -1 === altMatch2.locator[altMatch2.alternation].toString().indexOf( altMatch.locator[altMatch.alternation] ) && ( altMatch2.locator[altMatch2.alternation] = altMatch2.locator[altMatch2.alternation] + ',' + altMatch.locator[altMatch.alternation], 
                                                    altMatch2.alternation = altMatch.alternation ), altMatch.match.nativeDef === altMatch2.match.def && ( altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation], 
                                                    malternateMatches.splice( malternateMatches.indexOf( altMatch2 ), 1, altMatch ) );
                                                    break;
                                                }
                                                if ( altMatch.match.def === altMatch2.match.def ) {
                                                    dropMatch = !1;
                                                    break;
                                                }
                                                if ( function( source, target ) {
                                                    return null === source.match.fn && null !== target.match.fn && target.match.fn.test( source.match.def, getMaskSet(), pos, !1, opts, !1 );
                                                }( altMatch, altMatch2 ) || function( source, target ) {
                                                    return null !== source.match.fn && null !== target.match.fn && target.match.fn.test( source.match.def.replace( /[\[\]]/g, '' ), getMaskSet(), pos, !1, opts, !1 );
                                                }( altMatch, altMatch2 ) ) {
                                                    altMatch.alternation === altMatch2.alternation && -1 === altMatch.locator[altMatch.alternation].toString().indexOf( altMatch2.locator[altMatch2.alternation].toString().split( '' )[0] ) && ( altMatch.na = altMatch.na || altMatch.locator[altMatch.alternation].toString(), 
                                                    -1 === altMatch.na.indexOf( altMatch.locator[altMatch.alternation].toString().split( '' )[0] ) && ( altMatch.na = altMatch.na + ',' + altMatch.locator[altMatch2.alternation].toString().split( '' )[0] ), 
                                                    dropMatch = !0, altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation].toString().split( '' )[0] + ',' + altMatch.locator[altMatch.alternation], 
                                                    malternateMatches.splice( malternateMatches.indexOf( altMatch2 ), 0, altMatch ) );
                                                    break;
                                                }
                                            }
                                        }
                                        dropMatch || malternateMatches.push( altMatch );
                                    }
                                }
                                'string' == typeof altIndex && ( malternateMatches = $.map( malternateMatches, function( lmnt, ndx ) {
                                    if ( isFinite( ndx ) ) {
                                        var alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split( ',' );
                                        lmnt.locator[alternation] = undefined, lmnt.alternation = undefined;
                                        for ( var alndx = 0; alndx < altLocArr.length; alndx++ ) -1 !== $.inArray( altLocArr[alndx], altIndexArr ) && ( lmnt.locator[alternation] !== undefined ? ( lmnt.locator[alternation] += ',', 
                                        lmnt.locator[alternation] += altLocArr[alndx] ) : lmnt.locator[alternation] = parseInt( altLocArr[alndx] ), 
                                        lmnt.alternation = alternation );
                                        if ( lmnt.locator[alternation] !== undefined ) return lmnt;
                                    }
                                } ) ), matches = currentMatches.concat( malternateMatches ), testPos = pos, insertStop = matches.length > 0, 
                                match = malternateMatches.length > 0, ndxInitializer = ndxInitializerClone.slice();
                            } else match = handleMatch( alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat( loopNdx ), quantifierRecurse );
                            if ( match ) return !0;
                        } else if ( match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray( match, maskToken.matches ) - 1] ) for ( var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < ( isNaN( qt.quantifier.max ) ? qndx + 1 : qt.quantifier.max ) && testPos <= pos; qndx++ ) {
                            var tokenGroup = maskToken.matches[$.inArray( qt, maskToken.matches ) - 1];
                            if ( match = handleMatch( tokenGroup, [ qndx ].concat( loopNdx ), tokenGroup ) ) {
                                if ( latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                isFirstMatch( latestMatch, tokenGroup ) ) {
                                    if ( qndx > qt.quantifier.min - 1 ) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    return !0;
                                }
                                return !0;
                            }
                        } else if ( match = resolveTestFromToken( match, ndxInitializer, loopNdx, quantifierRecurse ) ) return !0;
                    } else testPos++;
                }
                for ( var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++ ) if ( !0 !== maskToken.matches[tndx].isQuantifier ) {
                    var match = handleMatch( maskToken.matches[tndx], [ tndx ].concat( loopNdx ), quantifierRecurse );
                    if ( match && testPos === pos ) return match;
                    if ( testPos > pos ) break;
                }
            }
            function filterTests( tests ) {
                if ( opts.keepStatic && pos > 0 && tests.length > 1 + ( '' === tests[tests.length - 1].match.def ? 1 : 0 ) && !0 !== tests[0].match.optionality && !0 !== tests[0].match.optionalQuantifier && null === tests[0].match.fn && !/[0-9a-bA-Z]/.test( tests[0].match.def ) ) {
                    if ( getMaskSet().validPositions[pos - 1] === undefined ) return [ determineTestTemplate( tests ) ];
                    if ( getMaskSet().validPositions[pos - 1].alternation === tests[0].alternation ) return [ determineTestTemplate( tests ) ];
                    if ( getMaskSet().validPositions[pos - 1] ) return [ determineTestTemplate( tests ) ];
                }
                return tests;
            }
            var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join( '' ) : '';
            if ( pos > -1 ) {
                if ( ndxIntlzr === undefined ) {
                    for ( var test, previousPos = pos - 1; ( test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos] ) === undefined && previousPos > -1; ) previousPos--;
                    test !== undefined && previousPos > -1 && ( ndxInitializer = function( tests ) {
                        var locator = [];
                        return $.isArray( tests ) || ( tests = [ tests ] ), tests.length > 0 && ( tests[0].alternation === undefined ? 0 === ( locator = determineTestTemplate( tests.slice() ).locator.slice() ).length && ( locator = tests[0].locator.slice() ) : $.each( tests, function( ndx, tst ) {
                            if ( '' !== tst.def ) if ( 0 === locator.length ) locator = tst.locator.slice(); else for ( var i = 0; i < locator.length; i++ ) tst.locator[i] && -1 === locator[i].toString().indexOf( tst.locator[i] ) && ( locator[i] += ',' + tst.locator[i] );
                        } ) ), locator;
                    }( test ), cacheDependency = ndxInitializer.join( '' ), testPos = previousPos );
                }
                if ( getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency ) return filterTests( getMaskSet().tests[pos] );
                for ( var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length && !( resolveTestFromToken( maskTokens[mtndx], ndxInitializer, [ mtndx ] ) && testPos === pos || testPos > pos ); mtndx++ ) ;
            }
            return ( 0 === matches.length || insertStop ) && matches.push( {
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: '',
                    placeholder: ''
                },
                locator: [],
                cd: cacheDependency
            } ), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? filterTests( $.extend( !0, [], matches ) ) : ( getMaskSet().tests[pos] = $.extend( !0, [], matches ), 
            filterTests( getMaskSet().tests[pos] ) );
        }
        function getBufferTemplate() {
            return getMaskSet()._buffer === undefined && ( getMaskSet()._buffer = getMaskTemplate( !1, 1 ), 
            getMaskSet().buffer === undefined && ( getMaskSet().buffer = getMaskSet()._buffer.slice() ) ), 
            getMaskSet()._buffer;
        }
        function getBuffer( noCache ) {
            return getMaskSet().buffer !== undefined && !0 !== noCache || ( getMaskSet().buffer = getMaskTemplate( !0, getLastValidPosition(), !0 ) ), 
            getMaskSet().buffer;
        }
        function refreshFromBuffer( start, end, buffer ) {
            var i, p;
            if ( !0 === start ) resetMaskSet(), start = 0, end = buffer.length; else for ( i = start; i < end; i++ ) delete getMaskSet().validPositions[i];
            for ( p = start, i = start; i < end; i++ ) if ( resetMaskSet( !0 ), buffer[i] !== opts.skipOptionalPartCharacter ) {
                var valResult = isValid( p, buffer[i], !0, !0 );
                !1 !== valResult && ( resetMaskSet( !0 ), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1 );
            }
        }
        function casing( elem, test, pos ) {
            switch ( opts.casing || test.casing ) {
              case 'upper':
                elem = elem.toUpperCase();
                break;

              case 'lower':
                elem = elem.toLowerCase();
                break;

              case 'title':
                var posBefore = getMaskSet().validPositions[pos - 1];
                elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode( Inputmask.keyCode.SPACE ) ? elem.toUpperCase() : elem.toLowerCase();
                break;

              default:
                if ( $.isFunction( opts.casing ) ) {
                    var args = Array.prototype.slice.call( arguments );
                    args.push( getMaskSet().validPositions ), elem = opts.casing.apply( this, args );
                }
            }
            return elem;
        }
        function checkAlternationMatch( altArr1, altArr2, na ) {
            for ( var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice( 0, 1 ), isMatch = !1, naArr = na !== undefined ? na.split( ',' ) : [], i = 0; i < naArr.length; i++ ) -1 !== ( naNdx = altArr1.indexOf( naArr[i] ) ) && altArr1.splice( naNdx, 1 );
            for ( var alndx = 0; alndx < altArr1.length; alndx++ ) if ( -1 !== $.inArray( altArr1[alndx], altArrC ) ) {
                isMatch = !0;
                break;
            }
            return isMatch;
        }
        function isValid( pos, c, strict, fromSetValid, fromAlternate, validateOnly ) {
            function isSelection( posObj ) {
                var selection = isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end == 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin == 1;
                return selection && 0 === posObj.begin && posObj.end === getMaskSet().maskLength ? 'full' : selection;
            }
            function _isValid( position, c, strict ) {
                var rslt = !1;
                return $.each( getTests( position ), function( ndx, tst ) {
                    for ( var test = tst.match, loopend = c ? 1 : 0, chrs = '', i = test.cardinality; i > loopend; i-- ) chrs += getBufferElement( position - ( i - 1 ) );
                    if ( c && ( chrs += c ), getBuffer( !0 ), !1 !== ( rslt = null != test.fn ? test.fn.test( chrs, getMaskSet(), position, strict, opts, isSelection( pos ) ) : ( c === test.def || c === opts.skipOptionalPartCharacter ) && '' !== test.def && {
                        c: getPlaceholder( position, test, !0 ) || test.def,
                        pos: position
                    } ) ) {
                        var elem = rslt.c !== undefined ? rslt.c : c;
                        elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder( position, test, !0 ) || test.def : elem;
                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
                        if ( rslt.remove !== undefined && ( $.isArray( rslt.remove ) || ( rslt.remove = [ rslt.remove ] ), 
                        $.each( rslt.remove.sort( function( a, b ) {
                            return b - a;
                        } ), function( ndx, lmnt ) {
                            stripValidPositions( lmnt, lmnt + 1, !0 );
                        } ) ), rslt.insert !== undefined && ( $.isArray( rslt.insert ) || ( rslt.insert = [ rslt.insert ] ), 
                        $.each( rslt.insert.sort( function( a, b ) {
                            return a - b;
                        } ), function( ndx, lmnt ) {
                            isValid( lmnt.pos, lmnt.c, !0, fromSetValid );
                        } ) ), rslt.refreshFromBuffer ) {
                            var refresh = rslt.refreshFromBuffer;
                            if ( refreshFromBuffer( !0 === refresh ? refresh : refresh.start, refresh.end, possibleModifiedBuffer ), 
                            rslt.pos === undefined && rslt.c === undefined ) return rslt.pos = getLastValidPosition(), 
                            !1;
                            if ( ( validatedPos = rslt.pos !== undefined ? rslt.pos : position ) !== position ) return rslt = $.extend( rslt, isValid( validatedPos, elem, !0, fromSetValid ) ), 
                            !1;
                        } else if ( !0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && ( validatedPos = rslt.pos, 
                        refreshFromBuffer( position, validatedPos, getBuffer().slice() ), validatedPos !== position ) ) return rslt = $.extend( rslt, isValid( validatedPos, elem, !0 ) ), 
                        !1;
                        return ( !0 === rslt || rslt.pos !== undefined || rslt.c !== undefined ) && ( ndx > 0 && resetMaskSet( !0 ), 
                        setValidPosition( validatedPos, $.extend( {}, tst, {
                            input: casing( elem, test, validatedPos )
                        } ), fromSetValid, isSelection( pos ) ) || ( rslt = !1 ), !1 );
                    }
                } ), rslt;
            }
            function setValidPosition( pos, validTest, fromSetValid, isSelection ) {
                if ( isSelection || opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined ) {
                    var i, positionsClone = $.extend( !0, {}, getMaskSet().validPositions ), lvp = getLastValidPosition( undefined, !0 );
                    for ( i = pos; i <= lvp; i++ ) delete getMaskSet().validPositions[i];
                    getMaskSet().validPositions[pos] = $.extend( !0, {}, validTest );
                    var j, valid = !0, vps = getMaskSet().validPositions, needsValidation = !1, initialLength = getMaskSet().maskLength;
                    for ( i = j = pos; i <= lvp; i++ ) {
                        var t = positionsClone[i];
                        if ( t !== undefined ) for ( var posMatch = j; posMatch < getMaskSet().maskLength && ( null === t.match.fn && vps[i] && ( !0 === vps[i].match.optionalQuantifier || !0 === vps[i].match.optionality ) || null != t.match.fn ); ) {
                            if ( posMatch++, !1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def ) getMaskSet().validPositions[posMatch] = $.extend( !0, {}, positionsClone[posMatch] ), 
                            getMaskSet().validPositions[posMatch].input = t.input, fillMissingNonMask( posMatch ), 
                            j = posMatch, valid = !0; else if ( positionCanMatchDefinition( posMatch, t.match.def ) ) {
                                var result = isValid( posMatch, t.input, !0, !0 );
                                valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch, 
                                needsValidation = !0;
                            } else if ( !( valid = !0 === t.generatedInput ) && posMatch >= getMaskSet().maskLength - 1 ) break;
                            if ( getMaskSet().maskLength < initialLength && ( getMaskSet().maskLength = initialLength ), 
                            valid ) break;
                        }
                        if ( !valid ) break;
                    }
                    if ( !valid ) return getMaskSet().validPositions = $.extend( !0, {}, positionsClone ), 
                    resetMaskSet( !0 ), !1;
                } else getMaskSet().validPositions[pos] = $.extend( !0, {}, validTest );
                return resetMaskSet( !0 ), !0;
            }
            function fillMissingNonMask( maskPos ) {
                for ( var pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx-- ) ;
                var testTemplate, testsFromPos;
                for ( pndx++; pndx < maskPos; pndx++ ) getMaskSet().validPositions[pndx] === undefined && ( !1 === opts.jitMasking || opts.jitMasking > pndx ) && ( '' === ( testsFromPos = getTests( pndx, getTestTemplate( pndx - 1 ).locator, pndx - 1 ).slice() )[testsFromPos.length - 1].match.def && testsFromPos.pop(), 
                ( testTemplate = determineTestTemplate( testsFromPos ) ) && ( testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask( pndx, !0 ) || $.inArray( opts.radixPoint, getBuffer() ) < pndx && testTemplate.match.fn && testTemplate.match.fn.test( getPlaceholder( pndx ), getMaskSet(), pndx, !1, opts ) ) && !1 !== ( result = _isValid( pndx, getPlaceholder( pndx, testTemplate.match, !0 ) || ( null == testTemplate.match.fn ? testTemplate.match.def : '' !== getPlaceholder( pndx ) ? getPlaceholder( pndx ) : getBuffer()[pndx] ), !0 ) ) && ( getMaskSet().validPositions[result.pos || pndx].generatedInput = !0 ) );
            }
            strict = !0 === strict;
            var maskPos = pos;
            pos.begin !== undefined && ( maskPos = isRTL && !isSelection( pos ) ? pos.end : pos.begin );
            var result = !0, positionsClone = $.extend( !0, {}, getMaskSet().validPositions );
            if ( $.isFunction( opts.preValidation ) && !strict && !0 !== fromSetValid && !0 !== validateOnly && ( result = opts.preValidation( getBuffer(), maskPos, c, isSelection( pos ), opts ) ), 
            !0 === result ) {
                if ( fillMissingNonMask( maskPos ), isSelection( pos ) && ( handleRemove( undefined, Inputmask.keyCode.DELETE, pos, !0, !0 ), 
                maskPos = getMaskSet().p ), maskPos < getMaskSet().maskLength && ( maxLength === undefined || maskPos < maxLength ) && ( result = _isValid( maskPos, c, strict ), 
                ( !strict || !0 === fromSetValid ) && !1 === result && !0 !== validateOnly ) ) {
                    var currentPosValid = getMaskSet().validPositions[maskPos];
                    if ( !currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter ) {
                        if ( ( opts.insertMode || getMaskSet().validPositions[seekNext( maskPos )] === undefined ) && !isMask( maskPos, !0 ) ) for ( var nPos = maskPos + 1, snPos = seekNext( maskPos ); nPos <= snPos; nPos++ ) if ( !1 !== ( result = _isValid( nPos, c, strict ) ) ) {
                            !function( originalPos, newPos ) {
                                var vp = getMaskSet().validPositions[newPos];
                                if ( vp ) for ( var targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; ps < newPos; ps++ ) if ( getMaskSet().validPositions[ps] === undefined && !isMask( ps, !0 ) ) {
                                    var tests = getTests( ps ).slice(), bestMatch = determineTestTemplate( tests, !0 ), equality = -1;
                                    '' === tests[tests.length - 1].match.def && tests.pop(), $.each( tests, function( ndx, tst ) {
                                        for ( var i = 0; i < tll; i++ ) {
                                            if ( tst.locator[i] === undefined || !checkAlternationMatch( tst.locator[i].toString().split( ',' ), targetLocator[i].toString().split( ',' ), tst.na ) ) {
                                                var targetAI = targetLocator[i], bestMatchAI = bestMatch.locator[i], tstAI = tst.locator[i];
                                                targetAI - bestMatchAI > Math.abs( targetAI - tstAI ) && ( bestMatch = tst );
                                                break;
                                            }
                                            equality < i && ( equality = i, bestMatch = tst );
                                        }
                                    } ), ( bestMatch = $.extend( {}, bestMatch, {
                                        input: getPlaceholder( ps, bestMatch.match, !0 ) || bestMatch.match.def
                                    } ) ).generatedInput = !0, setValidPosition( ps, bestMatch, !0 ), getMaskSet().validPositions[newPos] = undefined, 
                                    _isValid( newPos, vp.input, !0 );
                                }
                            }( maskPos, result.pos !== undefined ? result.pos : nPos ), maskPos = nPos;
                            break;
                        }
                    } else result = {
                        caret: seekNext( maskPos )
                    };
                }
                !1 === result && opts.keepStatic && !strict && !0 !== fromAlternate && ( result = function( pos, c, strict ) {
                    var lastAlt, alternation, altPos, prevAltPos, i, validPos, altNdxs, decisionPos, validPsClone = $.extend( !0, {}, getMaskSet().validPositions ), isValidRslt = !1, lAltPos = getLastValidPosition();
                    for ( prevAltPos = getMaskSet().validPositions[lAltPos]; lAltPos >= 0; lAltPos-- ) if ( ( altPos = getMaskSet().validPositions[lAltPos] ) && altPos.alternation !== undefined ) {
                        if ( lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                        prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation] ) break;
                        prevAltPos = altPos;
                    }
                    if ( alternation !== undefined ) {
                        decisionPos = parseInt( lastAlt );
                        var decisionTaker = prevAltPos.locator[prevAltPos.alternation || alternation] !== undefined ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0];
                        decisionTaker.length > 0 && ( decisionTaker = decisionTaker.split( ',' )[0] );
                        var possibilityPos = getMaskSet().validPositions[decisionPos], prevPos = getMaskSet().validPositions[decisionPos - 1];
                        $.each( getTests( decisionPos, prevPos ? prevPos.locator : undefined, decisionPos - 1 ), function( ndx, test ) {
                            altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split( ',' ) : [];
                            for ( var mndx = 0; mndx < altNdxs.length; mndx++ ) {
                                var validInputs = [], staticInputsBeforePos = 0, staticInputsBeforePosAlternate = 0, verifyValidInput = !1;
                                if ( decisionTaker < altNdxs[mndx] && ( test.na === undefined || -1 === $.inArray( altNdxs[mndx], test.na.split( ',' ) ) || -1 === $.inArray( decisionTaker.toString(), altNdxs ) ) ) {
                                    getMaskSet().validPositions[decisionPos] = $.extend( !0, {}, test );
                                    var possibilities = getMaskSet().validPositions[decisionPos].locator;
                                    for ( getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt( altNdxs[mndx] ), 
                                    null == test.match.fn ? ( possibilityPos.input !== test.match.def && ( verifyValidInput = !0, 
                                    !0 !== possibilityPos.generatedInput && validInputs.push( possibilityPos.input ) ), 
                                    staticInputsBeforePosAlternate++, getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test( test.match.def ), 
                                    getMaskSet().validPositions[decisionPos].input = test.match.def ) : getMaskSet().validPositions[decisionPos].input = possibilityPos.input, 
                                    i = decisionPos + 1; i < getLastValidPosition( undefined, !0 ) + 1; i++ ) ( validPos = getMaskSet().validPositions[i] ) && !0 !== validPos.generatedInput && /[0-9a-bA-Z]/.test( validPos.input ) ? validInputs.push( validPos.input ) : i < pos && staticInputsBeforePos++, 
                                    delete getMaskSet().validPositions[i];
                                    for ( verifyValidInput && validInputs[0] === test.match.def && validInputs.shift(), 
                                    resetMaskSet( !0 ), isValidRslt = !0; validInputs.length > 0; ) {
                                        var input = validInputs.shift();
                                        if ( input !== opts.skipOptionalPartCharacter && !( isValidRslt = isValid( getLastValidPosition( undefined, !0 ) + 1, input, !1, fromSetValid, !0 ) ) ) break;
                                    }
                                    if ( isValidRslt ) {
                                        getMaskSet().validPositions[decisionPos].locator = possibilities;
                                        var targetLvp = getLastValidPosition( pos ) + 1;
                                        for ( i = decisionPos + 1; i < getLastValidPosition() + 1; i++ ) ( ( validPos = getMaskSet().validPositions[i] ) === undefined || null == validPos.match.fn ) && i < pos + ( staticInputsBeforePosAlternate - staticInputsBeforePos ) && staticInputsBeforePosAlternate++;
                                        isValidRslt = isValid( ( pos += staticInputsBeforePosAlternate - staticInputsBeforePos ) > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0 );
                                    }
                                    if ( isValidRslt ) return !1;
                                    resetMaskSet(), getMaskSet().validPositions = $.extend( !0, {}, validPsClone );
                                }
                            }
                        } );
                    }
                    return isValidRslt;
                }( maskPos, c, strict ) ), !0 === result && ( result = {
                    pos: maskPos
                } );
            }
            if ( $.isFunction( opts.postValidation ) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly ) {
                var postResult = opts.postValidation( getBuffer( !0 ), result, opts );
                if ( postResult.refreshFromBuffer && postResult.buffer ) {
                    var refresh = postResult.refreshFromBuffer;
                    refreshFromBuffer( !0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer );
                }
                result = !0 === postResult ? result : postResult;
            }
            return result && result.pos === undefined && ( result.pos = maskPos ), !1 !== result && !0 !== validateOnly || ( resetMaskSet( !0 ), 
            getMaskSet().validPositions = $.extend( !0, {}, positionsClone ) ), result;
        }
        function isMask( pos, strict ) {
            var test = getTestTemplate( pos ).match;
            if ( '' === test.def && ( test = getTest( pos ).match ), null != test.fn ) return test.fn;
            if ( !0 !== strict && pos > -1 ) {
                var tests = getTests( pos );
                return tests.length > 1 + ( '' === tests[tests.length - 1].match.def ? 1 : 0 );
            }
            return !1;
        }
        function seekNext( pos, newBlock ) {
            var maskL = getMaskSet().maskLength;
            if ( pos >= maskL ) return maskL;
            var position = pos;
            for ( getTests( maskL + 1 ).length > 1 && ( getMaskTemplate( !0, maskL + 1, !0 ), maskL = getMaskSet().maskLength ); ++position < maskL && ( !0 === newBlock && ( !0 !== getTest( position ).match.newBlockMarker || !isMask( position ) ) || !0 !== newBlock && !isMask( position ) ); ) ;
            return position;
        }
        function seekPrevious( pos, newBlock ) {
            var tests, position = pos;
            if ( position <= 0 ) return 0;
            for ( ;--position > 0 && ( !0 === newBlock && !0 !== getTest( position ).match.newBlockMarker || !0 !== newBlock && !isMask( position ) && ( ( tests = getTests( position ) ).length < 2 || 2 === tests.length && '' === tests[1].match.def ) ); ) ;
            return position;
        }
        function getBufferElement( position ) {
            return getMaskSet().validPositions[position] === undefined ? getPlaceholder( position ) : getMaskSet().validPositions[position].input;
        }
        function writeBuffer( input, buffer, caretPos, event, triggerInputEvent ) {
            if ( event && $.isFunction( opts.onBeforeWrite ) ) {
                var result = opts.onBeforeWrite.call( inputmask, event, buffer, caretPos, opts );
                if ( result ) {
                    if ( result.refreshFromBuffer ) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer( !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer ), 
                        buffer = getBuffer( !0 );
                    }
                    caretPos !== undefined && ( caretPos = result.caret !== undefined ? result.caret : caretPos );
                }
            }
            input !== undefined && ( input.inputmask._valueSet( buffer.join( '' ) ), caretPos === undefined || event !== undefined && 'blur' === event.type ? renderColorMask( input, caretPos, 0 === buffer.length ) : android && event && 'input' === event.type ? setTimeout( function() {
                caret( input, caretPos );
            }, 0 ) : caret( input, caretPos ), !0 === triggerInputEvent && ( skipInputEvent = !0, 
            $( input ).trigger( 'input' ) ) );
        }
        function getPlaceholder( pos, test, returnPL ) {
            if ( ( test = test || getTest( pos ).match ).placeholder !== undefined || !0 === returnPL ) return $.isFunction( test.placeholder ) ? test.placeholder( opts ) : test.placeholder;
            if ( null === test.fn ) {
                if ( pos > -1 && getMaskSet().validPositions[pos] === undefined ) {
                    var prevTest, tests = getTests( pos ), staticAlternations = [];
                    if ( tests.length > 1 + ( '' === tests[tests.length - 1].match.def ? 1 : 0 ) ) for ( var i = 0; i < tests.length; i++ ) if ( !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && ( null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test( prevTest.match.def, getMaskSet(), pos, !0, opts ) ) && ( staticAlternations.push( tests[i] ), 
                    null === tests[i].match.fn && ( prevTest = tests[i] ), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test( staticAlternations[0].match.def ) ) ) return opts.placeholder.charAt( pos % opts.placeholder.length );
                }
                return test.def;
            }
            return opts.placeholder.charAt( pos % opts.placeholder.length );
        }
        function checkVal( input, writeOut, strict, nptvl, initiatingEvent ) {
            function isTemplateMatch( ndx, charCodes ) {
                return -1 !== getBufferTemplate().slice( ndx, seekNext( ndx ) ).join( '' ).indexOf( charCodes ) && !isMask( ndx ) && getTest( ndx ).match.nativeDef === charCodes.charAt( charCodes.length - 1 );
            }
            var inputValue = nptvl.slice(), charCodes = '', initialNdx = -1, result = undefined;
            if ( resetMaskSet(), strict || !0 === opts.autoUnmask ) initialNdx = seekNext( initialNdx ); else {
                var staticInput = getBufferTemplate().slice( 0, seekNext( -1 ) ).join( '' ), matches = inputValue.join( '' ).match( new RegExp( '^' + Inputmask.escapeRegex( staticInput ), 'g' ) );
                matches && matches.length > 0 && ( inputValue.splice( 0, matches.length * staticInput.length ), 
                initialNdx = seekNext( initialNdx ) );
            }
            if ( -1 === initialNdx ? ( getMaskSet().p = seekNext( initialNdx ), initialNdx = 0 ) : getMaskSet().p = initialNdx, 
            $.each( inputValue, function( ndx, charCode ) {
                if ( charCode !== undefined ) if ( getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder( ndx ) && isMask( ndx, !0 ) && !1 === isValid( ndx, inputValue[ndx], !0, undefined, undefined, !0 ) ) getMaskSet().p++; else {
                    var keypress = new $.Event( '_checkval' );
                    keypress.which = charCode.charCodeAt( 0 ), charCodes += charCode;
                    var lvp = getLastValidPosition( undefined, !0 ), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate( lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp );
                    if ( !isTemplateMatch( initialNdx, charCodes ) || strict || opts.autoUnmask ) {
                        var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                        result = EventHandlers.keypressEvent.call( input, keypress, !0, !1, strict, pos ), 
                        initialNdx = pos + 1, charCodes = '';
                    } else result = EventHandlers.keypressEvent.call( input, keypress, !0, !1, !0, lvp + 1 );
                    if ( !1 !== result && !strict && $.isFunction( opts.onBeforeWrite ) ) {
                        var origResult = result;
                        if ( result = opts.onBeforeWrite.call( inputmask, keypress, getBuffer(), result.forwardPosition, opts ), 
                        ( result = $.extend( origResult, result ) ) && result.refreshFromBuffer ) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer( !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer ), 
                            resetMaskSet( !0 ), result.caret && ( getMaskSet().p = result.caret, result.forwardPosition = result.caret );
                        }
                    }
                }
            } ), writeOut ) {
                var caretPos = undefined;
                document.activeElement === input && result && ( caretPos = opts.numericInput ? seekPrevious( result.forwardPosition ) : result.forwardPosition ), 
                writeBuffer( input, getBuffer(), caretPos, initiatingEvent || new $.Event( 'checkval' ), initiatingEvent && 'input' === initiatingEvent.type );
            }
        }
        function unmaskedvalue( input ) {
            if ( input ) {
                if ( input.inputmask === undefined ) return input.value;
                input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call( input );
            }
            var umValue = [], vps = getMaskSet().validPositions;
            for ( var pndx in vps ) vps[pndx].match && null != vps[pndx].match.fn && umValue.push( vps[pndx].input );
            var unmaskedValue = 0 === umValue.length ? '' : ( isRTL ? umValue.reverse() : umValue ).join( '' );
            if ( $.isFunction( opts.onUnMask ) ) {
                var bufferValue = ( isRTL ? getBuffer().slice().reverse() : getBuffer() ).join( '' );
                unmaskedValue = opts.onUnMask.call( inputmask, bufferValue, unmaskedValue, opts );
            }
            return unmaskedValue;
        }
        function caret( input, begin, end, notranslate ) {
            function translatePosition( pos ) {
                return !0 === notranslate || !isRTL || 'number' != typeof pos || opts.greedy && '' === opts.placeholder || ( pos = getBuffer().join( '' ).length - pos ), 
                pos;
            }
            var range;
            if ( begin === undefined ) return input.setSelectionRange ? ( begin = input.selectionStart, 
            end = input.selectionEnd ) : window.getSelection ? ( range = window.getSelection().getRangeAt( 0 ) ).commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || ( begin = range.startOffset, 
            end = range.endOffset ) : document.selection && document.selection.createRange && ( end = ( begin = 0 - ( range = document.selection.createRange() ).duplicate().moveStart( 'character', -input.inputmask._valueGet().length ) ) + range.text.length ), 
            {
                begin: translatePosition( begin ),
                end: translatePosition( end )
            };
            if ( begin.begin !== undefined && ( end = begin.end, begin = begin.begin ), 'number' == typeof begin ) {
                begin = translatePosition( begin ), end = 'number' == typeof ( end = translatePosition( end ) ) ? end : begin;
                var scrollCalc = parseInt( ( ( input.ownerDocument.defaultView || window ).getComputedStyle ? ( input.ownerDocument.defaultView || window ).getComputedStyle( input, null ) : input.currentStyle ).fontSize ) * end;
                if ( input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || !1 !== opts.insertMode || begin !== end || end++, 
                input.setSelectionRange ) input.selectionStart = begin, input.selectionEnd = end; else if ( window.getSelection ) {
                    if ( range = document.createRange(), input.firstChild === undefined || null === input.firstChild ) {
                        var textNode = document.createTextNode( '' );
                        input.appendChild( textNode );
                    }
                    range.setStart( input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length ), 
                    range.setEnd( input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length ), 
                    range.collapse( !0 );
                    var sel = window.getSelection();
                    sel.removeAllRanges(), sel.addRange( range );
                } else input.createTextRange && ( ( range = input.createTextRange() ).collapse( !0 ), 
                range.moveEnd( 'character', end ), range.moveStart( 'character', begin ), range.select() );
                renderColorMask( input, {
                    begin: begin,
                    end: end
                } );
            }
        }
        function determineLastRequiredPosition( returnDefinition ) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
            for ( pos = lvp + 1; pos < buffer.length; pos++ ) ndxIntlzr = ( testPos = getTestTemplate( pos, ndxIntlzr, pos - 1 ) ).locator.slice(), 
            positions[pos] = $.extend( !0, {}, testPos );
            var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
            for ( pos = bl - 1; pos > lvp && ( ( ( testPos = positions[pos] ).match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && ( lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch( testPos.locator[lvTest.alternation].toString().split( ',' ), lvTestAlt.toString().split( ',' ) ) && '' !== getTests( pos )[0].def ) ) && buffer[pos] === getPlaceholder( pos, testPos.match ) ); pos-- ) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : undefined
            } : bl;
        }
        function clearOptionalTail( buffer ) {
            for ( var validPos, rl = determineLastRequiredPosition(), bl = buffer.length, lv = getMaskSet().validPositions[getLastValidPosition()]; rl < bl && !isMask( rl, !0 ) && ( validPos = lv !== undefined ? getTestTemplate( rl, lv.locator.slice( '' ), lv ) : getTest( rl ) ) && !0 !== validPos.match.optionality && ( !0 !== validPos.match.optionalQuantifier && !0 !== validPos.match.newBlockMarker || rl + 1 === bl && '' === ( lv !== undefined ? getTestTemplate( rl + 1, lv.locator.slice( '' ), lv ) : getTest( rl + 1 ) ).match.def ); ) rl++;
            for ( ;( validPos = getMaskSet().validPositions[rl - 1] ) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter; ) rl--;
            return buffer.splice( rl ), buffer;
        }
        function isComplete( buffer ) {
            if ( $.isFunction( opts.isComplete ) ) return opts.isComplete( buffer, opts );
            if ( '*' === opts.repeat ) return undefined;
            var complete = !1, lrp = determineLastRequiredPosition( !0 ), aml = seekPrevious( lrp.l );
            if ( lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier ) {
                complete = !0;
                for ( var i = 0; i <= aml; i++ ) {
                    var test = getTestTemplate( i ).match;
                    if ( null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder( i, test ) ) {
                        complete = !1;
                        break;
                    }
                }
            }
            return complete;
        }
        function handleRemove( input, k, pos, strict, fromIsValid ) {
            if ( ( opts.numericInput || isRTL ) && ( k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && ( k = Inputmask.keyCode.BACKSPACE ), 
            isRTL ) ) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            k === Inputmask.keyCode.BACKSPACE && ( pos.end - pos.begin < 1 || !1 === opts.insertMode ) ? ( pos.begin = seekPrevious( pos.begin ), 
            getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin-- ) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && ( pos.end = isMask( pos.end, !0 ) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext( pos.end ) + 1, 
            getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++ ), 
            stripValidPositions( pos.begin, pos.end, !1, strict ), !0 !== strict && function() {
                if ( opts.keepStatic ) {
                    for ( var validInputs = [], lastAlt = getLastValidPosition( -1, !0 ), positionsClone = $.extend( !0, {}, getMaskSet().validPositions ), prevAltPos = getMaskSet().validPositions[lastAlt]; lastAlt >= 0; lastAlt-- ) {
                        var altPos = getMaskSet().validPositions[lastAlt];
                        if ( altPos ) {
                            if ( !0 !== altPos.generatedInput && /[0-9a-bA-Z]/.test( altPos.input ) && validInputs.push( altPos.input ), 
                            delete getMaskSet().validPositions[lastAlt], altPos.alternation !== undefined && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation] ) break;
                            prevAltPos = altPos;
                        }
                    }
                    if ( lastAlt > -1 ) for ( getMaskSet().p = seekNext( getLastValidPosition( -1, !0 ) ); validInputs.length > 0; ) {
                        var keypress = new $.Event( 'keypress' );
                        keypress.which = validInputs.pop().charCodeAt( 0 ), EventHandlers.keypressEvent.call( input, keypress, !0, !1, !1, getMaskSet().p );
                    } else getMaskSet().validPositions = $.extend( !0, {}, positionsClone );
                }
            }();
            var lvp = getLastValidPosition( pos.begin, !0 );
            if ( lvp < pos.begin ) getMaskSet().p = seekNext( lvp ); else if ( !0 !== strict && ( getMaskSet().p = pos.begin, 
            !0 !== fromIsValid ) ) for ( ;getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined; ) getMaskSet().p++;
        }
        function initializeColorMask( input ) {
            function findCaretPos( clientx ) {
                var caretPos, e = document.createElement( 'span' );
                for ( var style in computedStyle ) isNaN( style ) && -1 !== style.indexOf( 'font' ) && ( e.style[style] = computedStyle[style] );
                e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, 
                e.style.position = 'absolute', e.style.height = 'auto', e.style.width = 'auto', 
                e.style.visibility = 'hidden', e.style.whiteSpace = 'nowrap', document.body.appendChild( e );
                var itl, inputText = input.inputmask._valueGet(), previousWidth = 0;
                for ( caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++ ) {
                    if ( e.innerHTML += inputText.charAt( caretPos ) || '_', e.offsetWidth >= clientx ) {
                        var offset1 = clientx - previousWidth, offset2 = e.offsetWidth - clientx;
                        e.innerHTML = inputText.charAt( caretPos ), caretPos = ( offset1 -= e.offsetWidth / 3 ) < offset2 ? caretPos - 1 : caretPos;
                        break;
                    }
                    previousWidth = e.offsetWidth;
                }
                return document.body.removeChild( e ), caretPos;
            }
            var computedStyle = ( input.ownerDocument.defaultView || window ).getComputedStyle( input, null ), template = document.createElement( 'div' );
            template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign, 
            ( colorMask = document.createElement( 'div' ) ).className = 'im-colormask', input.parentNode.insertBefore( colorMask, input ), 
            input.parentNode.removeChild( input ), colorMask.appendChild( template ), colorMask.appendChild( input ), 
            input.style.left = template.offsetLeft + 'px', $( input ).on( 'click', function( e ) {
                return caret( input, findCaretPos( e.clientX ) ), EventHandlers.clickEvent.call( input, [ e ] );
            } ), $( input ).on( 'keydown', function( e ) {
                e.shiftKey || !1 === opts.insertMode || setTimeout( function() {
                    renderColorMask( input );
                }, 0 );
            } );
        }
        function renderColorMask( input, caretPos, clear ) {
            function handleStatic() {
                isStatic || null !== test.fn && testPos.input !== undefined ? isStatic && ( null !== test.fn && testPos.input !== undefined || '' === test.def ) && ( isStatic = !1, 
                maskTemplate += '</span>' ) : ( isStatic = !0, maskTemplate += '<span class=\'im-static\'>' );
            }
            function handleCaret( force ) {
                !0 !== force && pos !== caretPos.begin || document.activeElement !== input || ( maskTemplate += '<span class=\'im-caret\' style=\'border-right-width: 1px;border-right-style: solid;\'></span>' );
            }
            var test, testPos, ndxIntlzr, maskTemplate = '', isStatic = !1, pos = 0;
            if ( colorMask !== undefined ) {
                var buffer = getBuffer();
                if ( caretPos === undefined ? caretPos = caret( input ) : caretPos.begin === undefined && ( caretPos = {
                    begin: caretPos,
                    end: caretPos
                } ), !0 !== clear ) {
                    var lvp = getLastValidPosition();
                    do {
                        handleCaret(), getMaskSet().validPositions[pos] ? ( testPos = getMaskSet().validPositions[pos], 
                        test = testPos.match, ndxIntlzr = testPos.locator.slice(), handleStatic(), maskTemplate += buffer[pos] ) : ( testPos = getTestTemplate( pos, ndxIntlzr, pos - 1 ), 
                        test = testPos.match, ndxIntlzr = testPos.locator.slice(), ( !1 === opts.jitMasking || pos < lvp || 'number' == typeof opts.jitMasking && isFinite( opts.jitMasking ) && opts.jitMasking > pos ) && ( handleStatic(), 
                        maskTemplate += getPlaceholder( pos, test ) ) ), pos++;
                    } while ( ( maxLength === undefined || pos < maxLength ) && ( null !== test.fn || '' !== test.def ) || lvp > pos || isStatic );
                    -1 === maskTemplate.indexOf( 'im-caret' ) && handleCaret( !0 ), isStatic && handleStatic();
                }
                var template = colorMask.getElementsByTagName( 'div' )[0];
                template.innerHTML = maskTemplate, input.inputmask.positionColorMask( input, template );
            }
        }
        maskset = maskset || this.maskset, opts = opts || this.opts;
        var undoValue, $el, maxLength, colorMask, inputmask = this, el = this.el, isRTL = this.isRTL, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !1, EventRuler = {
            on: function( input, eventName, eventHandler ) {
                var ev = function( e ) {
                    if ( this.inputmask === undefined && 'FORM' !== this.nodeName ) {
                        var imOpts = $.data( this, '_inputmask_opts' );
                        imOpts ? new Inputmask( imOpts ).mask( this ) : EventRuler.off( this );
                    } else {
                        if ( 'setvalue' === e.type || 'FORM' === this.nodeName || !( this.disabled || this.readOnly && !( 'keydown' === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB ) ) ) {
                            switch ( e.type ) {
                              case 'input':
                                if ( !0 === skipInputEvent ) return skipInputEvent = !1, e.preventDefault();
                                break;

                              case 'keydown':
                                skipKeyPressEvent = !1, skipInputEvent = !1;
                                break;

                              case 'keypress':
                                if ( !0 === skipKeyPressEvent ) return e.preventDefault();
                                skipKeyPressEvent = !0;
                                break;

                              case 'click':
                                if ( iemobile || iphone ) {
                                    var that = this, args = arguments;
                                    return setTimeout( function() {
                                        eventHandler.apply( that, args );
                                    }, 0 ), !1;
                                }
                            }
                            var returnVal = eventHandler.apply( this, arguments );
                            return !1 === returnVal && ( e.preventDefault(), e.stopPropagation() ), returnVal;
                        }
                        e.preventDefault();
                    }
                };
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push( ev ), 
                -1 !== $.inArray( eventName, [ 'submit', 'reset' ] ) ? null !== input.form && $( input.form ).on( eventName, ev ) : $( input ).on( eventName, ev );
            },
            off: function( input, event ) {
                if ( input.inputmask && input.inputmask.events ) {
                    var events;
                    event ? ( events = [] )[event] = input.inputmask.events[event] : events = input.inputmask.events, 
                    $.each( events, function( eventName, evArr ) {
                        for ( ;evArr.length > 0; ) {
                            var ev = evArr.pop();
                            -1 !== $.inArray( eventName, [ 'submit', 'reset' ] ) ? null !== input.form && $( input.form ).off( eventName, ev ) : $( input ).off( eventName, ev );
                        }
                        delete input.inputmask.events[eventName];
                    } );
                }
            }
        }, EventHandlers = {
            keydownEvent: function( e ) {
                var input = this, $input = $( input ), k = e.keyCode, pos = caret( input );
                if ( k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !function( eventName ) {
                    var el = document.createElement( 'input' ), evName = 'on' + eventName, isSupported = evName in el;
                    return isSupported || ( el.setAttribute( evName, 'return;' ), isSupported = 'function' == typeof el[evName] ), 
                    el = null, isSupported;
                }( 'cut' ) ) e.preventDefault(), handleRemove( input, k, pos ), writeBuffer( input, getBuffer( !0 ), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join( '' ) ), 
                input.inputmask._valueGet() === getBufferTemplate().join( '' ) ? $input.trigger( 'cleared' ) : !0 === isComplete( getBuffer() ) && $input.trigger( 'complete' ); else if ( k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN ) {
                    e.preventDefault();
                    var caretPos = seekNext( getLastValidPosition() );
                    opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, 
                    caret( input, e.shiftKey ? pos.begin : caretPos, caretPos, !0 );
                } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? ( e.preventDefault(), 
                caret( input, 0, e.shiftKey ? pos.begin : 0, !0 ) ) : ( opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey ) && !0 !== e.altKey ? ( checkVal( input, !0, !1, undoValue.split( '' ) ), 
                $input.trigger( 'click' ) ) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? ( !0 === e.shiftKey ? ( null === getTest( pos.begin ).match.fn && ( pos.begin = seekNext( pos.begin ) ), 
                pos.end = seekPrevious( pos.begin, !0 ), pos.begin = seekPrevious( pos.end, !0 ) ) : ( pos.begin = seekNext( pos.begin, !0 ), 
                pos.end = seekNext( pos.begin, !0 ), pos.end < getMaskSet().maskLength && pos.end-- ), 
                pos.begin < getMaskSet().maskLength && ( e.preventDefault(), caret( input, pos.begin, pos.end ) ) ) : e.shiftKey || !1 === opts.insertMode && ( k === Inputmask.keyCode.RIGHT ? setTimeout( function() {
                    var caretPos = caret( input );
                    caret( input, caretPos.begin );
                }, 0 ) : k === Inputmask.keyCode.LEFT && setTimeout( function() {
                    var caretPos = caret( input );
                    caret( input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1 );
                }, 0 ) ) : ( opts.insertMode = !opts.insertMode, caret( input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1 ) );
                opts.onKeyDown.call( this, e, getBuffer(), caret( input ).begin, opts ), ignorable = -1 !== $.inArray( k, opts.ignorables );
            },
            keypressEvent: function( e, checkval, writeOut, strict, ndx ) {
                var input = this, $input = $( input ), k = e.which || e.charCode || e.keyCode;
                if ( !( !0 === checkval || e.ctrlKey && e.altKey ) && ( e.ctrlKey || e.metaKey || ignorable ) ) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join( '' ) && ( undoValue = getBuffer().join( '' ), 
                setTimeout( function() {
                    $input.trigger( 'change' );
                }, 0 ) ), !0;
                if ( k ) {
                    46 === k && !1 === e.shiftKey && '' !== opts.radixPoint && ( k = opts.radixPoint.charCodeAt( 0 ) );
                    var forwardPosition, pos = checkval ? {
                        begin: ndx,
                        end: ndx
                    } : caret( input ), c = String.fromCharCode( k );
                    getMaskSet().writeOutBuffer = !0;
                    var valResult = isValid( pos, c, strict );
                    if ( !1 !== valResult && ( resetMaskSet( !0 ), forwardPosition = valResult.caret !== undefined ? valResult.caret : checkval ? valResult.pos + 1 : seekNext( valResult.pos ), 
                    getMaskSet().p = forwardPosition ), !1 !== writeOut && ( setTimeout( function() {
                        opts.onKeyValidation.call( input, k, valResult, opts );
                    }, 0 ), getMaskSet().writeOutBuffer && !1 !== valResult ) ) {
                        var buffer = getBuffer();
                        writeBuffer( input, buffer, opts.numericInput && valResult.caret === undefined ? seekPrevious( forwardPosition ) : forwardPosition, e, !0 !== checkval ), 
                        !0 !== checkval && setTimeout( function() {
                            !0 === isComplete( buffer ) && $input.trigger( 'complete' );
                        }, 0 );
                    }
                    if ( e.preventDefault(), checkval ) return !1 !== valResult && ( valResult.forwardPosition = forwardPosition ), 
                    valResult;
                }
            },
            pasteEvent: function( e ) {
                var tempValue, input = this, ev = e.originalEvent || e, $input = $( input ), inputValue = input.inputmask._valueGet( !0 ), caretPos = caret( input );
                isRTL && ( tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue );
                var valueBeforeCaret = inputValue.substr( 0, caretPos.begin ), valueAfterCaret = inputValue.substr( caretPos.end, inputValue.length );
                if ( valueBeforeCaret === ( isRTL ? getBufferTemplate().reverse() : getBufferTemplate() ).slice( 0, caretPos.begin ).join( '' ) && ( valueBeforeCaret = '' ), 
                valueAfterCaret === ( isRTL ? getBufferTemplate().reverse() : getBufferTemplate() ).slice( caretPos.end ).join( '' ) && ( valueAfterCaret = '' ), 
                isRTL && ( tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue ), 
                window.clipboardData && window.clipboardData.getData ) inputValue = valueBeforeCaret + window.clipboardData.getData( 'Text' ) + valueAfterCaret; else {
                    if ( !ev.clipboardData || !ev.clipboardData.getData ) return !0;
                    inputValue = valueBeforeCaret + ev.clipboardData.getData( 'text/plain' ) + valueAfterCaret;
                }
                var pasteValue = inputValue;
                if ( $.isFunction( opts.onBeforePaste ) ) {
                    if ( !1 === ( pasteValue = opts.onBeforePaste.call( inputmask, inputValue, opts ) ) ) return e.preventDefault();
                    pasteValue || ( pasteValue = inputValue );
                }
                return checkVal( input, !1, !1, isRTL ? pasteValue.split( '' ).reverse() : pasteValue.toString().split( '' ) ), 
                writeBuffer( input, getBuffer(), seekNext( getLastValidPosition() ), e, undoValue !== getBuffer().join( '' ) ), 
                !0 === isComplete( getBuffer() ) && $input.trigger( 'complete' ), e.preventDefault();
            },
            inputFallBackEvent: function( e ) {
                var input = this, inputValue = input.inputmask._valueGet();
                if ( getBuffer().join( '' ) !== inputValue ) {
                    var caretPos = caret( input );
                    if ( !1 === function( input, inputValue, caretPos ) {
                        if ( '.' === inputValue.charAt( caretPos.begin - 1 ) && '' !== opts.radixPoint && ( ( inputValue = inputValue.split( '' ) )[caretPos.begin - 1] = opts.radixPoint.charAt( 0 ), 
                        inputValue = inputValue.join( '' ) ), inputValue.charAt( caretPos.begin - 1 ) === opts.radixPoint && inputValue.length > getBuffer().length ) {
                            var keypress = new $.Event( 'keypress' );
                            return keypress.which = opts.radixPoint.charCodeAt( 0 ), EventHandlers.keypressEvent.call( input, keypress, !0, !0, !1, caretPos.begin - 1 ), 
                            !1;
                        }
                    }( input, inputValue, caretPos ) ) return !1;
                    if ( inputValue = inputValue.replace( new RegExp( '(' + Inputmask.escapeRegex( getBufferTemplate().join( '' ) ) + ')*' ), '' ), 
                    !1 === function( input, inputValue, caretPos ) {
                        if ( iemobile ) {
                            var inputChar = inputValue.replace( getBuffer().join( '' ), '' );
                            if ( 1 === inputChar.length ) {
                                var keypress = new $.Event( 'keypress' );
                                return keypress.which = inputChar.charCodeAt( 0 ), EventHandlers.keypressEvent.call( input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1 ), 
                                !1;
                            }
                        }
                    }( input, inputValue, caretPos ) ) return !1;
                    caretPos.begin > inputValue.length && ( caret( input, inputValue.length ), caretPos = caret( input ) );
                    var buffer = getBuffer().join( '' ), frontPart = inputValue.substr( 0, caretPos.begin ), backPart = inputValue.substr( caretPos.begin ), frontBufferPart = buffer.substr( 0, caretPos.begin ), backBufferPart = buffer.substr( caretPos.begin ), selection = caretPos, entries = '', isEntry = !1;
                    if ( frontPart !== frontBufferPart ) {
                        selection.begin = 0;
                        for ( var fpl = ( isEntry = frontPart.length >= frontBufferPart.length ) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt( i ) === frontBufferPart.charAt( i ) && i < fpl; i++ ) selection.begin++;
                        isEntry && ( entries += frontPart.slice( selection.begin, selection.end ) );
                    }
                    backPart !== backBufferPart && ( backPart.length > backBufferPart.length ? isEntry && ( selection.end = selection.begin ) : backPart.length < backBufferPart.length ? selection.end += backBufferPart.length - backPart.length : backPart.charAt( 0 ) !== backBufferPart.charAt( 0 ) && selection.end++ ), 
                    writeBuffer( input, getBuffer(), selection ), entries.length > 0 ? $.each( entries.split( '' ), function( ndx, entry ) {
                        var keypress = new $.Event( 'keypress' );
                        keypress.which = entry.charCodeAt( 0 ), ignorable = !1, EventHandlers.keypressEvent.call( input, keypress );
                    } ) : ( selection.begin === selection.end - 1 && caret( input, seekPrevious( selection.begin + 1 ), selection.end ), 
                    e.keyCode = Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call( input, e ) ), 
                    e.preventDefault();
                }
            },
            setValueEvent: function( e ) {
                this.inputmask.refreshValue = !1;
                var input = this, value = input.inputmask._valueGet( !0 );
                $.isFunction( opts.onBeforeMask ) && ( value = opts.onBeforeMask.call( inputmask, value, opts ) || value ), 
                value = value.split( '' ), checkVal( input, !0, !1, isRTL ? value.reverse() : value ), 
                undoValue = getBuffer().join( '' ), ( opts.clearMaskOnLostFocus || opts.clearIncomplete ) && input.inputmask._valueGet() === getBufferTemplate().join( '' ) && input.inputmask._valueSet( '' );
            },
            focusEvent: function( e ) {
                var input = this, nptValue = input.inputmask._valueGet();
                opts.showMaskOnFocus && ( !opts.showMaskOnHover || opts.showMaskOnHover && '' === nptValue ) && ( input.inputmask._valueGet() !== getBuffer().join( '' ) ? writeBuffer( input, getBuffer(), seekNext( getLastValidPosition() ) ) : !1 === mouseEnter && caret( input, seekNext( getLastValidPosition() ) ) ), 
                !0 === opts.positionCaretOnTab && !1 === mouseEnter && '' !== nptValue && ( writeBuffer( input, getBuffer(), caret( input ) ), 
                EventHandlers.clickEvent.apply( input, [ e, !0 ] ) ), undoValue = getBuffer().join( '' );
            },
            mouseleaveEvent: function( e ) {
                var input = this;
                if ( mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input ) {
                    var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
                    nptValue !== input.getAttribute( 'placeholder' ) && '' !== nptValue && ( -1 === getLastValidPosition() && nptValue === getBufferTemplate().join( '' ) ? buffer = [] : clearOptionalTail( buffer ), 
                    writeBuffer( input, buffer ) );
                }
            },
            clickEvent: function( e, tabbed ) {
                function doRadixFocus( clickPos ) {
                    if ( '' !== opts.radixPoint ) {
                        var vps = getMaskSet().validPositions;
                        if ( vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder( clickPos ) ) {
                            if ( clickPos < seekNext( -1 ) ) return !0;
                            var radixPos = $.inArray( opts.radixPoint, getBuffer() );
                            if ( -1 !== radixPos ) {
                                for ( var vp in vps ) if ( radixPos < vp && vps[vp].input !== getPlaceholder( vp ) ) return !1;
                                return !0;
                            }
                        }
                    }
                    return !1;
                }
                var input = this;
                setTimeout( function() {
                    if ( document.activeElement === input ) {
                        var selectedCaret = caret( input );
                        if ( tabbed && ( isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end ), 
                        selectedCaret.begin === selectedCaret.end ) switch ( opts.positionCaretOnClick ) {
                          case 'none':
                            break;

                          case 'radixFocus':
                            if ( doRadixFocus( selectedCaret.begin ) ) {
                                var radixPos = getBuffer().join( '' ).indexOf( opts.radixPoint );
                                caret( input, opts.numericInput ? seekNext( radixPos ) : radixPos );
                                break;
                            }

                          default:
                            var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition( clickPosition, !0 ), lastPosition = seekNext( lvclickPosition );
                            if ( clickPosition < lastPosition ) caret( input, isMask( clickPosition, !0 ) || isMask( clickPosition - 1, !0 ) ? clickPosition : seekNext( clickPosition ) ); else {
                                var lvp = getMaskSet().validPositions[lvclickPosition], tt = getTestTemplate( lastPosition, lvp ? lvp.match.locator : undefined, lvp ), placeholder = getPlaceholder( lastPosition, tt.match );
                                if ( '' !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask( lastPosition, !0 ) && tt.match.def === placeholder ) {
                                    var newPos = seekNext( lastPosition );
                                    ( clickPosition >= newPos || clickPosition === lastPosition ) && ( lastPosition = newPos );
                                }
                                caret( input, lastPosition );
                            }
                        }
                    }
                }, 0 );
            },
            dblclickEvent: function( e ) {
                var input = this;
                setTimeout( function() {
                    caret( input, 0, seekNext( getLastValidPosition() ) );
                }, 0 );
            },
            cutEvent: function( e ) {
                var input = this, $input = $( input ), pos = caret( input ), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice( pos.end, pos.begin ) : getBuffer().slice( pos.begin, pos.end );
                clipboardData.setData( 'text', isRTL ? clipData.reverse().join( '' ) : clipData.join( '' ) ), 
                document.execCommand && document.execCommand( 'copy' ), handleRemove( input, Inputmask.keyCode.DELETE, pos ), 
                writeBuffer( input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join( '' ) ), 
                input.inputmask._valueGet() === getBufferTemplate().join( '' ) && $input.trigger( 'cleared' );
            },
            blurEvent: function( e ) {
                var $input = $( this ), input = this;
                if ( input.inputmask ) {
                    var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                    '' !== nptValue && ( opts.clearMaskOnLostFocus && ( -1 === getLastValidPosition() && nptValue === getBufferTemplate().join( '' ) ? buffer = [] : clearOptionalTail( buffer ) ), 
                    !1 === isComplete( buffer ) && ( setTimeout( function() {
                        $input.trigger( 'incomplete' );
                    }, 0 ), opts.clearIncomplete && ( resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice() ) ), 
                    writeBuffer( input, buffer, undefined, e ) ), undoValue !== getBuffer().join( '' ) && ( undoValue = buffer.join( '' ), 
                    $input.trigger( 'change' ) );
                }
            },
            mouseenterEvent: function( e ) {
                var input = this;
                mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join( '' ) && writeBuffer( input, getBuffer() );
            },
            submitEvent: function( e ) {
                undoValue !== getBuffer().join( '' ) && $el.trigger( 'change' ), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join( '' ) && el.inputmask._valueSet( '' ), 
                opts.removeMaskOnSubmit && ( el.inputmask._valueSet( el.inputmask.unmaskedvalue(), !0 ), 
                setTimeout( function() {
                    writeBuffer( el, getBuffer() );
                }, 0 ) );
            },
            resetEvent: function( e ) {
                el.inputmask.refreshValue = !0, setTimeout( function() {
                    $el.trigger( 'setvalue' );
                }, 0 );
            }
        };
        Inputmask.prototype.positionColorMask = function( input, template ) {
            input.style.left = template.offsetLeft + 'px';
        };
        var valueBuffer;
        if ( actionObj !== undefined ) switch ( actionObj.action ) {
          case 'isComplete':
            return el = actionObj.el, isComplete( getBuffer() );

          case 'unmaskedvalue':
            return el !== undefined && actionObj.value === undefined || ( valueBuffer = actionObj.value, 
            valueBuffer = ( $.isFunction( opts.onBeforeMask ) ? opts.onBeforeMask.call( inputmask, valueBuffer, opts ) || valueBuffer : valueBuffer ).split( '' ), 
            checkVal( undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer ), $.isFunction( opts.onBeforeWrite ) && opts.onBeforeWrite.call( inputmask, undefined, getBuffer(), 0, opts ) ), 
            unmaskedvalue( el );

          case 'mask':
            !function( elem ) {
                EventRuler.off( elem );
                var isSupported = function( input, opts ) {
                    var elementType = input.getAttribute( 'type' ), isSupported = 'INPUT' === input.tagName && -1 !== $.inArray( elementType, opts.supportsInputType ) || input.isContentEditable || 'TEXTAREA' === input.tagName;
                    if ( !isSupported ) if ( 'INPUT' === input.tagName ) {
                        var el = document.createElement( 'input' );
                        el.setAttribute( 'type', elementType ), isSupported = 'text' === el.type, el = null;
                    } else isSupported = 'partial';
                    return !1 !== isSupported ? function( npt ) {
                        function getter() {
                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? ( isRTL ? clearOptionalTail( getBuffer().slice() ).reverse() : clearOptionalTail( getBuffer().slice() ) ).join( '' ) : valueGet.call( this ) : '' : valueGet.call( this );
                        }
                        function setter( value ) {
                            valueSet.call( this, value ), this.inputmask && $( this ).trigger( 'setvalue' );
                        }
                        var valueGet, valueSet;
                        if ( !npt.inputmask.__valueGet ) {
                            if ( !0 !== opts.noValuePatching ) {
                                if ( Object.getOwnPropertyDescriptor ) {
                                    'function' != typeof Object.getPrototypeOf && ( Object.getPrototypeOf = 'object' == typeof 'test'.__proto__ ? function( object ) {
                                        return object.__proto__;
                                    } : function( object ) {
                                        return object.constructor.prototype;
                                    } );
                                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor( Object.getPrototypeOf( npt ), 'value' ) : undefined;
                                    valueProperty && valueProperty.get && valueProperty.set ? ( valueGet = valueProperty.get, 
                                    valueSet = valueProperty.set, Object.defineProperty( npt, 'value', {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    } ) ) : 'INPUT' !== npt.tagName && ( valueGet = function() {
                                        return this.textContent;
                                    }, valueSet = function( value ) {
                                        this.textContent = value;
                                    }, Object.defineProperty( npt, 'value', {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    } ) );
                                } else document.__lookupGetter__ && npt.__lookupGetter__( 'value' ) && ( valueGet = npt.__lookupGetter__( 'value' ), 
                                valueSet = npt.__lookupSetter__( 'value' ), npt.__defineGetter__( 'value', getter ), 
                                npt.__defineSetter__( 'value', setter ) );
                                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                            }
                            npt.inputmask._valueGet = function( overruleRTL ) {
                                return isRTL && !0 !== overruleRTL ? valueGet.call( this.el ).split( '' ).reverse().join( '' ) : valueGet.call( this.el );
                            }, npt.inputmask._valueSet = function( value, overruleRTL ) {
                                valueSet.call( this.el, null === value || value === undefined ? '' : !0 !== overruleRTL && isRTL ? value.split( '' ).reverse().join( '' ) : value );
                            }, valueGet === undefined && ( valueGet = function() {
                                return this.value;
                            }, valueSet = function( value ) {
                                this.value = value;
                            }, function( type ) {
                                if ( $.valHooks && ( $.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch ) ) {
                                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function( elem ) {
                                        return elem.value;
                                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function( elem, value ) {
                                        return elem.value = value, elem;
                                    };
                                    $.valHooks[type] = {
                                        get: function( elem ) {
                                            if ( elem.inputmask ) {
                                                if ( elem.inputmask.opts.autoUnmask ) return elem.inputmask.unmaskedvalue();
                                                var result = valhookGet( elem );
                                                return -1 !== getLastValidPosition( undefined, undefined, elem.inputmask.maskset.validPositions ) || !0 !== opts.nullable ? result : '';
                                            }
                                            return valhookGet( elem );
                                        },
                                        set: function( elem, value ) {
                                            var result, $elem = $( elem );
                                            return result = valhookSet( elem, value ), elem.inputmask && $elem.trigger( 'setvalue' ), 
                                            result;
                                        },
                                        inputmaskpatch: !0
                                    };
                                }
                            }( npt.type ), function( npt ) {
                                EventRuler.on( npt, 'mouseenter', function( event ) {
                                    var $input = $( this );
                                    this.inputmask._valueGet() !== getBuffer().join( '' ) && $input.trigger( 'setvalue' );
                                } );
                            }( npt ) );
                        }
                    }( input ) : input.inputmask = undefined, isSupported;
                }( elem, opts );
                if ( !1 !== isSupported && ( el = elem, $el = $( el ), -1 === ( maxLength = el !== undefined ? el.maxLength : undefined ) && ( maxLength = undefined ), 
                !0 === opts.colorMask && initializeColorMask( el ), android && ( el.hasOwnProperty( 'inputmode' ) && ( el.inputmode = opts.inputmode, 
                el.setAttribute( 'inputmode', opts.inputmode ) ), 'rtfm' === opts.androidHack && ( !0 !== opts.colorMask && initializeColorMask( el ), 
                el.type = 'password' ) ), !0 === isSupported && ( EventRuler.on( el, 'submit', EventHandlers.submitEvent ), 
                EventRuler.on( el, 'reset', EventHandlers.resetEvent ), EventRuler.on( el, 'mouseenter', EventHandlers.mouseenterEvent ), 
                EventRuler.on( el, 'blur', EventHandlers.blurEvent ), EventRuler.on( el, 'focus', EventHandlers.focusEvent ), 
                EventRuler.on( el, 'mouseleave', EventHandlers.mouseleaveEvent ), !0 !== opts.colorMask && EventRuler.on( el, 'click', EventHandlers.clickEvent ), 
                EventRuler.on( el, 'dblclick', EventHandlers.dblclickEvent ), EventRuler.on( el, 'paste', EventHandlers.pasteEvent ), 
                EventRuler.on( el, 'dragdrop', EventHandlers.pasteEvent ), EventRuler.on( el, 'drop', EventHandlers.pasteEvent ), 
                EventRuler.on( el, 'cut', EventHandlers.cutEvent ), EventRuler.on( el, 'complete', opts.oncomplete ), 
                EventRuler.on( el, 'incomplete', opts.onincomplete ), EventRuler.on( el, 'cleared', opts.oncleared ), 
                android || !0 === opts.inputEventOnly ? el.removeAttribute( 'maxLength' ) : ( EventRuler.on( el, 'keydown', EventHandlers.keydownEvent ), 
                EventRuler.on( el, 'keypress', EventHandlers.keypressEvent ) ), EventRuler.on( el, 'compositionstart', $.noop ), 
                EventRuler.on( el, 'compositionupdate', $.noop ), EventRuler.on( el, 'compositionend', $.noop ), 
                EventRuler.on( el, 'keyup', $.noop ), EventRuler.on( el, 'input', EventHandlers.inputFallBackEvent ), 
                EventRuler.on( el, 'beforeinput', $.noop ) ), EventRuler.on( el, 'setvalue', EventHandlers.setValueEvent ), 
                undoValue = getBufferTemplate().join( '' ), '' !== el.inputmask._valueGet( !0 ) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el ) ) {
                    var initialValue = $.isFunction( opts.onBeforeMask ) ? opts.onBeforeMask.call( inputmask, el.inputmask._valueGet( !0 ), opts ) || el.inputmask._valueGet( !0 ) : el.inputmask._valueGet( !0 );
                    '' !== initialValue && checkVal( el, !0, !1, isRTL ? initialValue.split( '' ).reverse() : initialValue.split( '' ) );
                    var buffer = getBuffer().slice();
                    undoValue = buffer.join( '' ), !1 === isComplete( buffer ) && opts.clearIncomplete && resetMaskSet(), 
                    opts.clearMaskOnLostFocus && document.activeElement !== el && ( -1 === getLastValidPosition() ? buffer = [] : clearOptionalTail( buffer ) ), 
                    writeBuffer( el, buffer ), document.activeElement === el && caret( el, seekNext( getLastValidPosition() ) );
                }
            }( el );
            break;

          case 'format':
            return valueBuffer = ( $.isFunction( opts.onBeforeMask ) ? opts.onBeforeMask.call( inputmask, actionObj.value, opts ) || actionObj.value : actionObj.value ).split( '' ), 
            checkVal( undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer ), actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join( '' ) : getBuffer().join( '' ),
                metadata: maskScope.call( this, {
                    action: 'getmetadata'
                }, maskset, opts )
            } : isRTL ? getBuffer().slice().reverse().join( '' ) : getBuffer().join( '' );

          case 'isValid':
            actionObj.value ? ( valueBuffer = actionObj.value.split( '' ), checkVal( undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer ) ) : actionObj.value = getBuffer().join( '' );
            for ( var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask( lmib ); lmib-- ) ;
            return buffer.splice( rl, lmib + 1 - rl ), isComplete( buffer ) && actionObj.value === getBuffer().join( '' );

          case 'getemptymask':
            return getBufferTemplate().join( '' );

          case 'remove':
            if ( el && el.inputmask ) {
                $el = $( el ), el.inputmask._valueSet( opts.autoUnmask ? unmaskedvalue( el ) : el.inputmask._valueGet( !0 ) ), 
                EventRuler.off( el );
                Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor( Object.getPrototypeOf( el ), 'value' ) && el.inputmask.__valueGet && Object.defineProperty( el, 'value', {
                    get: el.inputmask.__valueGet,
                    set: el.inputmask.__valueSet,
                    configurable: !0
                } ) : document.__lookupGetter__ && el.__lookupGetter__( 'value' ) && el.inputmask.__valueGet && ( el.__defineGetter__( 'value', el.inputmask.__valueGet ), 
                el.__defineSetter__( 'value', el.inputmask.__valueSet ) ), el.inputmask = undefined;
            }
            return el;

          case 'getmetadata':
            if ( $.isArray( maskset.metadata ) ) {
                var maskTarget = getMaskTemplate( !0, 0, !1 ).join( '' );
                return $.each( maskset.metadata, function( ndx, mtdt ) {
                    if ( mtdt.mask === maskTarget ) return maskTarget = mtdt, !1;
                } ), maskTarget;
            }
            return maskset.metadata;
        }
    }
    var ua = navigator.userAgent, mobile = /mobile/i.test( ua ), iemobile = /iemobile/i.test( ua ), iphone = /iphone/i.test( ua ) && !iemobile, android = /android/i.test( ua ) && !iemobile;
    return Inputmask.prototype = {
        dataAttribute: 'data-inputmask',
        defaults: {
            placeholder: '_',
            optionalmarker: {
                start: '[',
                end: ']'
            },
            quantifiermarker: {
                start: '{',
                end: '}'
            },
            groupmarker: {
                start: '(',
                end: ')'
            },
            alternatormarker: '|',
            escapeChar: '\\',
            mask: null,
            regex: null,
            oncomplete: $.noop,
            onincomplete: $.noop,
            oncleared: $.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: null,
            onBeforePaste: function( pastedValue, opts ) {
                return $.isFunction( opts.onBeforeMask ) ? opts.onBeforeMask.call( this, pastedValue, opts ) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: ' ',
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: '',
            radixPointDefinitionSymbol: undefined,
            groupSeparator: '',
            keepStatic: null,
            positionCaretOnTab: !0,
            tabThrough: !1,
            supportsInputType: [ 'text', 'tel', 'password' ],
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
            isComplete: null,
            canClearPosition: $.noop,
            preValidation: null,
            postValidation: null,
            staticDefinitionSymbol: undefined,
            jitMasking: !1,
            nullable: !0,
            inputEventOnly: !1,
            noValuePatching: !1,
            positionCaretOnClick: 'lvp',
            casing: null,
            inputmode: 'verbatim',
            colorMask: !1,
            androidHack: !1,
            importDataAttributes: !0
        },
        definitions: {
            '9': {
                validator: '[0-9１-９]',
                cardinality: 1,
                definitionSymbol: '*'
            },
            a: {
                validator: '[A-Za-zА-яЁёÀ-ÿµ]',
                cardinality: 1,
                definitionSymbol: '*'
            },
            '*': {
                validator: '[0-9１-９A-Za-zА-яЁёÀ-ÿµ]',
                cardinality: 1
            }
        },
        aliases: {},
        masksCache: {},
        mask: function( elems ) {
            function importAttributeOptions( npt, opts, userOptions, dataAttribute ) {
                function importOption( option, optionData ) {
                    null !== ( optionData = optionData !== undefined ? optionData : npt.getAttribute( dataAttribute + '-' + option ) ) && ( 'string' == typeof optionData && ( 0 === option.indexOf( 'on' ) ? optionData = window[optionData] : 'false' === optionData ? optionData = !1 : 'true' === optionData && ( optionData = !0 ) ), 
                    userOptions[option] = optionData );
                }
                if ( !0 === opts.importDataAttributes ) {
                    var option, dataoptions, optionData, p, attrOptions = npt.getAttribute( dataAttribute );
                    if ( attrOptions && '' !== attrOptions && ( attrOptions = attrOptions.replace( new RegExp( '\'', 'g' ), '"' ), 
                    dataoptions = JSON.parse( '{' + attrOptions + '}' ) ), dataoptions ) {
                        optionData = undefined;
                        for ( p in dataoptions ) if ( 'alias' === p.toLowerCase() ) {
                            optionData = dataoptions[p];
                            break;
                        }
                    }
                    importOption( 'alias', optionData ), userOptions.alias && resolveAlias( userOptions.alias, userOptions, opts );
                    for ( option in opts ) {
                        if ( dataoptions ) {
                            optionData = undefined;
                            for ( p in dataoptions ) if ( p.toLowerCase() === option.toLowerCase() ) {
                                optionData = dataoptions[p];
                                break;
                            }
                        }
                        importOption( option, optionData );
                    }
                }
                return $.extend( !0, opts, userOptions ), ( 'rtl' === npt.dir || opts.rightAlign ) && ( npt.style.textAlign = 'right' ), 
                ( 'rtl' === npt.dir || opts.numericInput ) && ( npt.dir = 'ltr', npt.removeAttribute( 'dir' ), 
                opts.isRTL = !0 ), opts;
            }
            var that = this;
            return 'string' == typeof elems && ( elems = document.getElementById( elems ) || document.querySelectorAll( elems ) ), 
            elems = elems.nodeName ? [ elems ] : elems, $.each( elems, function( ndx, el ) {
                var scopedOpts = $.extend( !0, {}, that.opts );
                importAttributeOptions( el, scopedOpts, $.extend( !0, {}, that.userOptions ), that.dataAttribute );
                var maskset = generateMaskSet( scopedOpts, that.noMasksCache );
                maskset !== undefined && ( el.inputmask !== undefined && ( el.inputmask.opts.autoUnmask = !0, 
                el.inputmask.remove() ), el.inputmask = new Inputmask( undefined, undefined, !0 ), 
                el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend( !0, {}, that.userOptions ), 
                el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, 
                el.inputmask.maskset = maskset, $.data( el, '_inputmask_opts', scopedOpts ), maskScope.call( el.inputmask, {
                    action: 'mask'
                } ) );
            } ), elems && elems[0] ? elems[0].inputmask || this : this;
        },
        option: function( options, noremask ) {
            return 'string' == typeof options ? this.opts[options] : 'object' == typeof options ? ( $.extend( this.userOptions, options ), 
            this.el && !0 !== noremask && this.mask( this.el ), this ) : void 0;
        },
        unmaskedvalue: function( value ) {
            return this.maskset = this.maskset || generateMaskSet( this.opts, this.noMasksCache ), 
            maskScope.call( this, {
                action: 'unmaskedvalue',
                value: value
            } );
        },
        remove: function() {
            return maskScope.call( this, {
                action: 'remove'
            } );
        },
        getemptymask: function() {
            return this.maskset = this.maskset || generateMaskSet( this.opts, this.noMasksCache ), 
            maskScope.call( this, {
                action: 'getemptymask'
            } );
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            return this.maskset = this.maskset || generateMaskSet( this.opts, this.noMasksCache ), 
            maskScope.call( this, {
                action: 'isComplete'
            } );
        },
        getmetadata: function() {
            return this.maskset = this.maskset || generateMaskSet( this.opts, this.noMasksCache ), 
            maskScope.call( this, {
                action: 'getmetadata'
            } );
        },
        isValid: function( value ) {
            return this.maskset = this.maskset || generateMaskSet( this.opts, this.noMasksCache ), 
            maskScope.call( this, {
                action: 'isValid',
                value: value
            } );
        },
        format: function( value, metadata ) {
            return this.maskset = this.maskset || generateMaskSet( this.opts, this.noMasksCache ), 
            maskScope.call( this, {
                action: 'format',
                value: value,
                metadata: metadata
            } );
        },
        analyseMask: function( mask, regexMask, opts ) {
            function MaskToken( isGroup, isOptional, isQuantifier, isAlternator ) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
                this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition( mtoken, element, position ) {
                position = position !== undefined ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if ( regexMask ) 0 === element.indexOf( '[' ) || escaped && /\\d|\\s|\\w]/i.test( element ) || '.' === element ? mtoken.matches.splice( position++, 0, {
                    fn: new RegExp( element, opts.casing ? 'i' : '' ),
                    cardinality: 1,
                    optionality: mtoken.isOptional,
                    newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: undefined,
                    nativeDef: element
                } ) : ( escaped && ( element = element[element.length - 1] ), $.each( element.split( '' ), function( ndx, lmnt ) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice( position++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: mtoken.isOptional,
                        newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                        nativeDef: lmnt
                    } );
                } ) ), escaped = !1; else {
                    var maskdef = ( opts.definitions ? opts.definitions[element] : undefined ) || Inputmask.prototype.definitions[element];
                    if ( maskdef && !escaped ) {
                        for ( var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++ ) {
                            var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                            mtoken.matches.splice( position++, 0, {
                                fn: validator ? 'string' == typeof validator ? new RegExp( validator, opts.casing ? 'i' : '' ) : new function() {
                                    this.test = validator;
                                }() : new RegExp( '.' ),
                                cardinality: cardinality || 1,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || prevMatch.def !== ( maskdef.definitionSymbol || element ),
                                casing: maskdef.casing,
                                def: maskdef.definitionSymbol || element,
                                placeholder: maskdef.placeholder,
                                nativeDef: element
                            } ), prevMatch = mtoken.matches[position - 1];
                        }
                        mtoken.matches.splice( position++, 0, {
                            fn: maskdef.validator ? 'string' == typeof maskdef.validator ? new RegExp( maskdef.validator, opts.casing ? 'i' : '' ) : new function() {
                                this.test = maskdef.validator;
                            }() : new RegExp( '.' ),
                            cardinality: maskdef.cardinality,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== ( maskdef.definitionSymbol || element ),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            nativeDef: element
                        } );
                    } else mtoken.matches.splice( position++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: mtoken.isOptional,
                        newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                        nativeDef: element
                    } ), escaped = !1;
                }
            }
            function verifyGroupMarker( maskToken ) {
                maskToken && maskToken.matches && $.each( maskToken.matches, function( ndx, token ) {
                    var nextToken = maskToken.matches[ndx + 1];
                    ( nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier ) && token && token.isGroup && ( token.isGroup = !1, 
                    regexMask || ( insertTestDefinition( token, opts.groupmarker.start, 0 ), !0 !== token.openGroup && insertTestDefinition( token, opts.groupmarker.end ) ) ), 
                    verifyGroupMarker( token );
                } );
            }
            function defaultCase() {
                if ( openenings.length > 0 ) {
                    if ( currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition( currentOpeningToken, m ), 
                    currentOpeningToken.isAlternator ) {
                        alternator = openenings.pop();
                        for ( var mndx = 0; mndx < alternator.matches.length; mndx++ ) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? ( currentOpeningToken = openenings[openenings.length - 1] ).matches.push( alternator ) : currentToken.matches.push( alternator );
                    }
                } else insertTestDefinition( currentToken, m );
            }
            function reverseTokens( maskToken ) {
                maskToken.matches = maskToken.matches.reverse();
                for ( var match in maskToken.matches ) if ( maskToken.matches.hasOwnProperty( match ) ) {
                    var intMatch = parseInt( match );
                    if ( maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup ) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice( match, 1 ), maskToken.matches.splice( intMatch + 1, 0, qt );
                    }
                    maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens( maskToken.matches[match] ) : maskToken.matches[match] = function( st ) {
                        return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && ( st = opts.groupmarker.start ), 
                        st;
                    }( maskToken.matches[match] );
                }
                return maskToken;
            }
            var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = [];
            for ( regexMask && ( opts.optionalmarker.start = undefined, opts.optionalmarker.end = undefined ); match = regexMask ? regexTokenizer.exec( mask ) : tokenizer.exec( mask ); ) {
                if ( m = match[0], regexMask ) switch ( m.charAt( 0 ) ) {
                  case '?':
                    m = '{0,1}';
                    break;

                  case '+':
                  case '*':
                    m = '{' + m + '}';
                }
                if ( escaped ) defaultCase(); else switch ( m.charAt( 0 ) ) {
                  case opts.escapeChar:
                    escaped = !0, regexMask && defaultCase();
                    break;

                  case opts.optionalmarker.end:
                  case opts.groupmarker.end:
                    if ( openingToken = openenings.pop(), openingToken.openGroup = !1, openingToken !== undefined ) if ( openenings.length > 0 ) {
                        if ( ( currentOpeningToken = openenings[openenings.length - 1] ).matches.push( openingToken ), 
                        currentOpeningToken.isAlternator ) {
                            alternator = openenings.pop();
                            for ( var mndx = 0; mndx < alternator.matches.length; mndx++ ) alternator.matches[mndx].isGroup = !1, 
                            alternator.matches[mndx].alternatorGroup = !1;
                            openenings.length > 0 ? ( currentOpeningToken = openenings[openenings.length - 1] ).matches.push( alternator ) : currentToken.matches.push( alternator );
                        }
                    } else currentToken.matches.push( openingToken ); else defaultCase();
                    break;

                  case opts.optionalmarker.start:
                    openenings.push( new MaskToken( !1, !0 ) );
                    break;

                  case opts.groupmarker.start:
                    openenings.push( new MaskToken( !0 ) );
                    break;

                  case opts.quantifiermarker.start:
                    var quantifier = new MaskToken( !1, !1, !0 ), mq = ( m = m.replace( /[{}]/g, '' ) ).split( ',' ), mq0 = isNaN( mq[0] ) ? mq[0] : parseInt( mq[0] ), mq1 = 1 === mq.length ? mq0 : isNaN( mq[1] ) ? mq[1] : parseInt( mq[1] );
                    if ( '*' !== mq1 && '+' !== mq1 || ( mq0 = '*' === mq1 ? 0 : 1 ), quantifier.quantifier = {
                        min: mq0,
                        max: mq1
                    }, openenings.length > 0 ) {
                        var matches = openenings[openenings.length - 1].matches;
                        ( match = matches.pop() ).isGroup || ( ( groupToken = new MaskToken( !0 ) ).matches.push( match ), 
                        match = groupToken ), matches.push( match ), matches.push( quantifier );
                    } else ( match = currentToken.matches.pop() ).isGroup || ( regexMask && null === match.fn && '.' === match.def && ( match.fn = new RegExp( match.def, opts.casing ? 'i' : '' ) ), 
                    ( groupToken = new MaskToken( !0 ) ).matches.push( match ), match = groupToken ), currentToken.matches.push( match ), 
                    currentToken.matches.push( quantifier );
                    break;

                  case opts.alternatormarker:
                    if ( openenings.length > 0 ) {
                        var subToken = ( currentOpeningToken = openenings[openenings.length - 1] ).matches[currentOpeningToken.matches.length - 1];
                        lastMatch = currentOpeningToken.openGroup && ( subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator ) ? openenings.pop() : currentOpeningToken.matches.pop();
                    } else lastMatch = currentToken.matches.pop();
                    if ( lastMatch.isAlternator ) openenings.push( lastMatch ); else if ( lastMatch.alternatorGroup ? ( alternator = openenings.pop(), 
                    lastMatch.alternatorGroup = !1 ) : alternator = new MaskToken( !1, !1, !1, !0 ), alternator.matches.push( lastMatch ), 
                    openenings.push( alternator ), lastMatch.openGroup ) {
                        lastMatch.openGroup = !1;
                        var alternatorGroup = new MaskToken( !0 );
                        alternatorGroup.alternatorGroup = !0, openenings.push( alternatorGroup );
                    }
                    break;

                  default:
                    defaultCase();
                }
            }
            for ( ;openenings.length > 0; ) openingToken = openenings.pop(), currentToken.matches.push( openingToken );
            return currentToken.matches.length > 0 && ( verifyGroupMarker( currentToken ), maskTokens.push( currentToken ) ), 
            ( opts.numericInput || opts.isRTL ) && reverseTokens( maskTokens[0] ), maskTokens;
        }
    }, Inputmask.extendDefaults = function( options ) {
        $.extend( !0, Inputmask.prototype.defaults, options );
    }, Inputmask.extendDefinitions = function( definition ) {
        $.extend( !0, Inputmask.prototype.definitions, definition );
    }, Inputmask.extendAliases = function( alias ) {
        $.extend( !0, Inputmask.prototype.aliases, alias );
    }, Inputmask.format = function( value, options, metadata ) {
        return Inputmask( options ).format( value, metadata );
    }, Inputmask.unmask = function( value, options ) {
        return Inputmask( options ).unmaskedvalue( value );
    }, Inputmask.isValid = function( value, options ) {
        return Inputmask( options ).isValid( value );
    }, Inputmask.remove = function( elems ) {
        $.each( elems, function( ndx, el ) {
            el.inputmask && el.inputmask.remove();
        } );
    }, Inputmask.escapeRegex = function( str ) {
        var specials = [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^' ];
        return str.replace( new RegExp( '(\\' + specials.join( '|\\' ) + ')', 'gim' ), '\\$1' );
    }, Inputmask.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91,
        X: 88
    }, Inputmask;
} );

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(1);
﻿/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1.0
 */



'use strict';

const cssClasses = {
	ERROR_LABEL: 'error-label',
	INVALID_REQ_FIELD: 'invalid',
	MD_MENU: 'md-select',
	MENU: 'md-select-menu',
	MENU_OPEN: 'active',
	LIST_ITEM: 'md-select-menu-item',
	LIST_ITEM_HOVER: 'keyover',
	REQUIRED_FIELD: 'req',
	SEARCHBAR: 'md-select-searchbar'
};

if ( !String.prototype.startsWith ) {
	String.prototype.startsWith = function( searchString, position ) {
		position = position || 0;
		return this.substr( position, searchString.length ) === searchString;
	};
}

class Select {
	constructor( select ) {
		// if on a touch device, default to native select
		if ( 'ontouchstart' in document.documentElement && ( window.matchMedia && window.matchMedia( '(max-width:1024px)' ).matches ) ) {
			return;
		}

		// elements
		this.select = select;
		this.select.classList.add( cssClasses.MD_MENU );
		this.container = this.select.parentNode;
		this.label = this.container.querySelector( 'label' );
		this.menu = null;
		this.searchBar = null;
		this.searchString = '';

		// if this is a multiple select
		this.multiple = this.select.multiple;

		this.hasSearch = this.select.hasAttribute( 'data-search' );

		this.open = false;
		this.currentIndex = 0;

		this.listItems = [];

		this.createMenu = this.createMenu.bind( this );
		this.setMenuPosition = this.setMenuPosition.bind( this );
		this.showMenu = this.showMenu.bind( this );
		this.hideMenu = this.hideMenu.bind( this );
		this.changeHandler = this.changeHandler.bind( this );
		this.focusHanlder = this.focusHanlder.bind( this );
		this.blurHandler = this.blurHandler.bind( this );
		this.keyDownHandler = this.keyDownHandler.bind( this );
		this.bodyClickHandler = this.bodyClickHandler.bind( this );
        this.checkIfRequired = this.checkIfRequired.bind( this );

        this.select.Select = this;

		this.createMenu();
		this.addEventListeners();
	}

	addEventListeners() {
		this.selectPlaceholder.addEventListener( 'click', this.focusHanlder, false );
	}

	// add change event
	setChangeEvent( fn ) {
		this.onChange = fn;
	}

	// create the drop down
	createMenu() {
		let opts = this.select.children;
		let len = opts.length;
		let i;
		let opt;
		let listItem;
		let li;

		this.menu = document.createElement( 'ul' );
		this.menu.classList.add( cssClasses.MENU );

		this.searchBar = document.createElement( 'div' );
		this.searchBar.setAttribute( 'contenteditable', 'true' );
		this.searchBar.classList.add( cssClasses.SEARCHBAR );

		// loop through all of the options and create the ListItems
		for ( i = 0; i < len; i++ ) {
			opt = opts[i];

			listItem = new ListItem( opt, i, this );
			this.listItems.push( listItem );
			this.menu.appendChild( listItem.listItem );
		}

		if ( this.select.selectedIndex > 0 && this.listItems[0].dataVal !== '-1' ) {
			this.select.classList.add( 'not-default' );
		}

		document.body.appendChild( this.menu );

		if ( this.hasSearch ) {
			document.body.appendChild( this.searchBar );
		}
		this.replaceSelect();
		this.setMenuPosition();
	}

	// reset the menu
	reloadMenu() {
		let container;

		if ( this.menu ) {
			container = this.menu.parentNode;
			container.removeChild( this.menu );
			this.listItems = [];
			this.createMenu();
		}
	}

	// set the menu position on the page
	setMenuPosition() {
		const rect = this.selectPlaceholder.getBoundingClientRect();
		this.menu.style.top = rect.bottom + __WEBPACK_IMPORTED_MODULE_1__utils_utils__["c" /* getWindowScrollPosition */]() + 'px';
		this.menu.style.left = rect.left + 'px';
		this.menu.style.width = this.selectPlaceholder.offsetWidth + 'px';

		if ( this.hasSearch ) {
			this.searchBar.style.top = ( rect.top + __WEBPACK_IMPORTED_MODULE_1__utils_utils__["c" /* getWindowScrollPosition */]() + 10 ) + 'px';
			this.searchBar.style.left = rect.left + 'px';
			this.searchBar.style.width = ( this.selectPlaceholder.offsetWidth - 30 ) + 'px';
		}


	}

	replaceSelect() {
		if ( !this.select.classList.contains( 'hidden' ) ) {
			let selectHeight = window.getComputedStyle( this.select ).getPropertyValue( 'height' );
			let selectWidth = window.getComputedStyle( this.select ).getPropertyValue( 'width' );

			this.selectPlaceholder = document.createElement( 'div' );

			let spanText = document.createElement( 'span' );
			let arrow = document.createElement( 'i' );

			this.selectPlaceholder.appendChild( spanText );
			this.selectPlaceholder.appendChild( arrow );
			arrow.classList.add( 'material-icons' );
			arrow.innerHTML = 'arrow_drop_down';

			this.selectPlaceholder.style.width = selectWidth;
			this.selectPlaceholder.style.height = selectHeight;
			this.selectPlaceholder.style.lineHeight = selectHeight;
			this.selectPlaceholder.classList.add( 'select-placeholder' );
			this.select.parentNode.insertBefore( this.selectPlaceholder, this.select.parentNode.childNodes[0] );
			this.setPlaceholderText();
			this.select.classList.add( 'hidden' );
		} else {
			this.setPlaceholderText();
		}
	}

	setPlaceholderText() {
		let textSpan = this.selectPlaceholder.querySelector( 'span' );
		textSpan.innerHTML = this.getTextValue();
	}

	// show the menu
	showMenu() {
		let me = this;

		//Check to see if there is another Select currently open on the document
		if ( document.Select ) {
			document.Select.hideMenu();
			document.Select = null;
		}

		// always start at the top of the list
		this.menu.scrollTop = 0;

		this.currentIndex = -1;
		this.menu.classList.add( cssClasses.MENU_OPEN );
		this.searchBar.classList.add( cssClasses.MENU_OPEN );
		this.searchString = '';
		this.searchBar.innerHTML = '';
		this.open = true;

		setTimeout( function() {
			document.body.addEventListener( 'keydown', me.keyDownHandler, false );
			document.body.addEventListener( 'click', me.bodyClickHandler, false );

			me.select.blur();

			let slctdEle = me.menu.querySelector( 'li[selected="true"]' );
			if ( slctdEle ) {

				let menuScrollTop = me.menu.scrollTop;
				let menuHeight = me.menu.offsetHeight;

				if ( slctdEle.offsetTop + slctdEle.offsetHeight > menuScrollTop + menuHeight ) {
					me.menu.scrollTop = slctdEle.offsetTop;// menuScrollTop + slctdEle.offsetHeight;
				}

			}

			me.setHighlighted( 0 );

			if ( me.hasSearch ) {
				me.searchBar.focus();
			}

		}, 100 );



		//Set the current global select so that it can be closed if it is open when another show menu on a different element is pressed.
		document.Select = this;

		// disable window from scrolling
		//app.util.disableWindowScroll();
	}

	// hide the menu
	hideMenu() {
		let item;

		this.menu.classList.remove( cssClasses.MENU_OPEN );

		if ( this.hasSearch ) {
			this.searchBar.classList.remove( cssClasses.MENU_OPEN );
		}

		this.open = false;
		this.searchString = '';

		// make sure no listItems ahve the keyover class
		item = this.menu.querySelector( '.' + cssClasses.LIST_ITEM_HOVER );

		if ( item ) {
			item.classList.remove( cssClasses.LIST_ITEM_HOVER );
		}

		// remove event listeners
		document.body.removeEventListener( 'keydown', this.keyDownHandler, false );
		document.body.removeEventListener( 'click', this.bodyClickHandler, false );

		this.filterList();

		// remove the current select from the document.
		document.Select = null;

		// re-enable window scrolling
		//app.util.enableWindowScroll();
	}

	focusHanlder( e ) {
		if ( !this.open ) {
			this.setMenuPosition();
			this.showMenu();
		}
	}

	blurHandler( e ) {
	}

	keyDownHandler( e ) {
		let index = this.currentIndex;
		let keyCode = -1;

		if ( e && e.keyCode ) {
			keyCode = e.keyCode;

			if ( keyCode === 9 ) {
				this.hideMenu();
				this.select.focus();
				//e.preventDefault();
			}

			// move down the list
			else if ( keyCode === 40 ) {
				e.preventDefault();
				this.setHighlighted( 1 );
			}

			// move up the list
			else if ( keyCode === 38 ) {
				e.preventDefault();
				this.setHighlighted( -1 );
			}

			// enter key is clicked
			else if ( keyCode === 13 ) {
				e.preventDefault();

				if ( this.currentIndex === -1 ) {
					this.currentIndex = 0;
				}

				// trigger list item click
				this.listItems[this.currentIndex].selectItem();
			}

			// if escape key is clicked
			else if ( keyCode === 27 ) {
				e.preventDefault();
				this.hideMenu();
			}

			// anyother key is pressed
			else {
				if ( this.hasSearch ) {

					if ( keyCode === 8 ) {
						this.searchString = this.searchString.substr( 0, this.searchString.length - 1 );
					} else {
						if ( e.key.length === 1 && /^[a-zA-Z0-9 _]+$/.test( e.key ) ) {
							this.searchString += e.key;
						}
					}

					this.filterList();

				} else {
					e.preventDefault();
				}

			}
		}
	}

	filterList() {
		if ( this.hasSearch && this.listItems.length > 0 ) {
			let fndCntr = 0;
			let fndItem = null;
			let ul = this.listItems[0].listItem.parentNode;
			ul.classList.add( 'hidden' );
			for ( var i = 0; i < this.listItems.length; i++ ) {
				let thisItem = this.listItems[i].listItem;
				if ( thisItem.innerText.toUpperCase().startsWith( this.searchString.toUpperCase() ) || thisItem.getAttribute( 'selected' ) === 'true' ) {
					thisItem.classList.remove( 'hidden' );

					if ( fndCntr < 2 && thisItem.innerText.toUpperCase().startsWith( this.searchString.toUpperCase() ) ) {
						fndItem = thisItem;
						fndCntr += 1;
					}

				} else {
					thisItem.classList.add( 'hidden' );
				}
			}
			ul.classList.remove( 'hidden' );
			if ( fndCntr === 1 ) {
				fndItem.click();
			}
		}
	}

	setHighlighted( direction ) {
		//Find the selected item and set the current index.  Used upon show menu.
		if ( direction === 0 ) {
			for ( let i = 0; i < this.listItems.length; i++ ) {
				let thisItem = this.listItems[i].listItem;
				if ( thisItem.getAttribute( 'selected' ) === 'true' ) {
					this.currentIndex = i;
					break;
				}
			}
		} else {

			for ( let i = this.currentIndex + direction; i < this.listItems.length && i >= 0; i += direction ) {
				let thisItem = this.listItems[i].listItem;
				if ( !thisItem.classList.contains( 'hidden' ) ) {
					if ( this.currentIndex >= 0 ) {
						this.listItems[this.currentIndex].listItem.classList.remove( cssClasses.LIST_ITEM_HOVER );
					}
					this.currentIndex = i;
					thisItem.classList.add( cssClasses.LIST_ITEM_HOVER );

					let menuScrollTop = this.menu.scrollTop;
					let menuHeight = this.menu.offsetHeight;

					if ( direction > 0 ) {
						// check scroll top
						if ( thisItem.offsetTop + thisItem.offsetHeight > menuScrollTop + menuHeight ) {
							this.menu.scrollTop = menuScrollTop + thisItem.offsetHeight;
						}
					} else {
						// check scroll top
						if ( thisItem.offsetTop < menuScrollTop ) {
							this.menu.scrollTop = menuScrollTop - thisItem.offsetHeight;
						}
					}

					break;
				}
			}
		}

	}

	changeHandler( e ) {
		this.setPlaceholderText();

		if ( this.onChange && typeof this.onChange === 'function' ) {
			this.onChange();
		}
	}

	bodyClickHandler( e ) {
		if ( e && e.target && ( e.target === this.select || e.target.classList.contains( cssClasses.LIST_ITEM ) || e.target.classList.contains( 'btn-ripple-container' ) || e.target.classList.contains( 'btn-ripple-element' ) || e.target.classList.contains( 'md-select-searchbar' ) ) ) {
			// let the list item click event handle this
		}
		else {
			// clicked outside of the menu, hide the menu
			this.hideMenu();
		}
	}

	checkForValue() {

	}

	checkIfRequired() {
		let isValid = true;
		let selected = this.menu.querySelector( '[selected="true"]' );
		let errorLbl = this.container.querySelector( '.' + cssClasses.ERROR_LABEL );
		let lbl;

		// remove any previous error messages
		if ( errorLbl ) {
			this.container.removeChild( errorLbl );
		}

		// if we don't have a selected option and this is a required field
		if ( ( !selected || selected.getAttribute( 'data-val' ) === '-1' ) && this.select.classList.contains( cssClasses.REQUIRED_FIELD ) ) {
			lbl = document.createElement( 'span' );
			lbl.classList.add( cssClasses.ERROR_LABEL );
			lbl.textContent = 'Required field.';
			this.container.appendChild( lbl );
			this.select.classList.add( cssClasses.INVALID_REQ_FIELD );
			isValid = false;
		}

		// if we're all good, rmeove the invalid class
		else {
			this.select.classList.remove( cssClasses.INVALID_REQ_FIELD );
		}

		return isValid;
	}

	setValue( value ) {
		let li = this.menu.querySelector( '[data-val="' + value + '"]' );
		let i = 0;
		let len = this.listItems.length;
		let listItem = null;

		if ( li ) {
			for ( i = 0; i < len; i++ ) {
				listItem = this.listItems[i];

				if ( listItem.listItem === li ) {
					if ( !listItem.listItem.getAttribute( 'selected' ) ) {
						listItem.selectItem();
					}
				}
			}
		}
	}

	getValue() {
		if ( !this.multiple ) {
			return this.select.options[this.select.selectedIndex].value;
		}
	}

	getTextValue() {
		if ( !this.multiple ) {
			if ( this.select.selectedIndex >= 0 ) {
				return this.select.options[this.select.selectedIndex].text;
			} else {
				return '';
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Select;


class ListItem {
	constructor( opt, index, select ) {
		this.listItem = document.createElement( 'li' );
		this.select = select;
		this.index = index;
		this.isRequired = select.select.classList.contains( 'req' );
		this.dataVal = opt.value;
		this.isDefault = opt.value === '-1';

		this.listItem.classList.add( cssClasses.LIST_ITEM );
		this.listItem.classList.add( 'btn-ripple' );
		this.listItem.textContent = opt.textContent;
		this.listItem.setAttribute( 'data-val', opt.value );

		if ( this.isDefault ) {
			this.listItem.classList.add( 'default-item' );
		}

		if ( opt.selected ) {
			this.listItem.setAttribute( 'selected', 'true' );
		}

		this.selectItem = this.selectItem.bind( this );

		this.addEventListeners();

		return this;
	}

	addEventListeners() {
		this.listItem.addEventListener( 'click', this.selectItem, false );
	}

	selectItem( e ) {
		let selected;

		// if clicking the currently selected item
		if ( this.listItem.getAttribute( 'selected' ) === 'true' ) {
			if ( !this.isRequired ) {
				this.listItem.removeAttribute( 'selected' );

				if ( !this.select.multiple ) {
					this.select.select.value = '';
				}

				let defaultItem = this.select.select.querySelector( 'option[value="-1"]' );
				if ( defaultItem ) {
					this.select.select.classList.remove( 'not-default' );
					defaultItem.setAttribute( 'selected', 'selected' );
					this.select.select.value = '-1';
				}

				this.select.checkIfRequired();
			}
			else {
				// hide the menu if this is not a multiple select
				if ( !this.select.multiple ) {
					this.select.hideMenu();
				}
			}

		}
		else {
			// check if an item is already selected
			selected = this.select.menu.querySelector( '[selected="true"]' );

			// unselect a previously selected item if this is not a multiple select
			if ( selected && !this.select.multiple ) {
				selected.removeAttribute( 'selected' );
			}

			// select the selected item
			this.listItem.setAttribute( 'selected', 'true' );

			// update the selected element
			if ( !this.select.multiple ) {
				this.select.select.value = this.listItem.getAttribute( 'data-val' );
				this.select.checkIfRequired();
			}

			this.select.select.classList.remove( cssClasses.INVALID_REQ_FIELD );

			// hide the menu if this is not a multiple select
			if ( !this.select.multiple ) {
				this.select.hideMenu();
			}
		}

		if ( this.select.select.value !== '-1' ) {
			this.select.select.classList.add( 'not-default' );
		}

		this.select.changeHandler();

		if ( e ) {
			e.stopPropagation();
		}
	}
}

/***/ })
],[6]);