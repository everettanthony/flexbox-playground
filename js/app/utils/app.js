//@ts-check
/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */
import * as Utils from './utils';

'use strict';

export default class App {
    static init() {
        if ( typeof self.Promise === 'undefined' || !self.Promise ) {
            return {
                then: fn => Utils.polyfillPromises( _ => this._onInit( fn ) )
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