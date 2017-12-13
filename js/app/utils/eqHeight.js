/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import { $, $$ } from '../utils/$';
import * as Utils from '../utils/utils';

'use strict';

export default function eqHeight( context ) {
    if ( !context || !context.querySelector ) {
        context = document;
    }

    // if the promise polyfill hasn't loaded for browsers that need it
    if ( typeof self.Promise === 'undefined' || !self.Promise ) {
        Utils.polyfillPromises( eqHeight( context ) );
        return;
    }

    const setColumnHeights = cols => {
        let h = 0;

        // find the tallest column
        $$( cols ).forEach( col => {
            if ( col.offsetHeight > h ) {
                h = col.offsetHeight;
            }
        } );

        // set the height of all the columns to the tallest one
        $$( cols ).forEach( col => {
            col.style.height = `${h}px`;
            col.classList.add( 'in' );
        } );
    };

    // collect all of the rows
    $$( '.eq-height', context ).forEach( row => {
        const cols = $$( '.eq-height-item', row );

        // keep all the image promises as an array
        let imagePromises = [];

        // only if we are over a mq of 768px or the row has class .mbl-eq-height
        if ( Utils.mq( '(min-width:768px)' ) || row.classList.contains( 'mbl-eq-height' ) ) {

            // check if this is large item only
            if ( !row.classList.contains( 'eq-height-item-lg' ) || Utils.mq( '(min-width:1024px)' ) ) {
                // loop through any images, create a promise for them and add to the imagePromises array
                $$( 'img', row ).forEach( img => {
                    imagePromises.push( new Promise( ( resolve, reject ) => {
                        // the image is cached (or has already loaded?)
                        if ( img.complete ) {
                            resolve( this );
                        }
                        else {
                            // image has loaded
                            img.addEventListener( 'load', _ => resolve( this ) );
                        }

                        // if the image fails to load
                        img.addEventListener( 'error', _ => {
                            console.log( `Failed to load image ${img.src}` );
                            reject();
                        } );
                    } ) );
                } );

                // if there are images, wait for them to all load before setting the column height
                if ( imagePromises.length ) {
                    Promise.all( imagePromises ).then( _ => {
                        // all images have been loaded
                        setColumnHeights( cols );
                    }, _ => {
                        console.warn( 'An image has failed to load.' );
                    } );
                }

                // if no images in the container/row, set the column heights now
                else {
                    setColumnHeights( cols );
                }
            }
            else {
                $$( cols ).forEach( col => col.classList.add( 'in' ) );
            }
        }
        else {
            $$( cols ).forEach( col => col.classList.add( 'in' ) );
        }
    } );
}