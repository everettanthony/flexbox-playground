/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */
import app from './app';

( function( doc ) {
    'use strict';

    class PageManager {
        static init() {

        }
    }

    app.init().then( _ => PageManager.init() );

}( document ) );