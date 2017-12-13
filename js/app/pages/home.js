//@ts-check
/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import App from '../utils/app';
import { $, $$ } from '../utils/$';

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

    App.init().then( _ => PageManager.init() );

}( document ) );