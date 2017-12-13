webpackJsonp([1],{

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_app__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils___ = __webpack_require__(1);
//@ts-check
/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/



( function( doc ) {
    'use strict';

    class PageManager {
        static init() {
            this._addEventListeners();
        }

        static _addEventListeners() {
        	console.log( 'welcome' );
        }
    }

    __WEBPACK_IMPORTED_MODULE_0__utils_app__["a" /* default */].init().then( _ => PageManager.init() );

}( document ) );

/***/ })

},[2]);