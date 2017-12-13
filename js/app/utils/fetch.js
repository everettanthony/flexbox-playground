/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
'use strict';

import * as Utils from '../utils/utils';

export default function doFetch( url, options, type, callbackFn ) {
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
			then: fn => Utils.polyfillPromises( _ => doFetch( url, options, type, fn ) )
		};
	}

	// if the fetch polyfill hasn't loaded yet
	//   overwrite .then and wait 100 milliseconds then try again.
	if ( !self.fetch ) {
		return {
			then: fn => Utils.polyfillFetch( _ => doFetch( url, options, type, fn ) )
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
			headers = Utils.extend( {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}, options.headers || {} );

			// setup some default options for a POST request
			//  and extend to include any options that were passed in
			//  specifically the body property for webservice parameters
			opts = Utils.extend( {
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
			headers = Utils.extend( {
				'Content-Type': 'text/plain'
			}, options.headers || {} );

			// setup default options for a GET request
			//  expecting text/plain content type by default
			opts = Utils.extend( {
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