/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import { $, $$ } from '../utils/$';
import * as Utils from '../utils/utils';

export default class FadeIn {

    static get IMG_CLASS() {
        return 'img-fade-in';
    }

    static get IMG_OP_CLASS() {
        return 'img-fade-in-op';
    }

    static get IS_VISIBLE() {
        return 'is-visible';
    }

    static init() {
        this.imgs = $$( `.${FadeIn.IMG_CLASS},.${FadeIn.IMG_OP_CLASS}` );
        this.hdrs = $$( '.c-content-tag-int' );
        this.content = $$( '.c-content-copy-int.fade-in' );

        if ( 'IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window &&
            'intersectionRatio' in window.IntersectionObserverEntry.prototype ) {

            if ( !( 'isIntersecting' in window.IntersectionObserverEntry.prototype ) ) {
                Object.defineProperty( window.IntersectionObserverEntry.prototype,
                    'isIntersecting', {
                        get: function() {
                            return this.intersectionRatio > 0;
                        }
                    } );
            }

            this._initObserver();
        }
        else {
            // Load IO polyfill
            Utils.loadScript( '/js/app/libs/intersectionObserver.js' )
                .then( _ => this._initObserver() );
        }
    }

    static _initObserver() {
        let threshold = .10;

        if ( Utils.mq( '(min-width:1025px)' ) ) {
            threshold = .175;
        }

        this.observer = new IntersectionObserver( changes => this._onChange( changes ), {
            rootMargin: '0px',
            threshold: threshold
        } );

        this.imgs.forEach( img => this.observer.observe( img ) );
        this.hdrs.forEach( hdr => this.observer.observe( hdr ) );
        this.content.forEach( content => this.observer.observe( content ) );
    }

    static _onChange( changes ) {
        changes.forEach( change => {
            if ( change.isIntersecting ) {
                //change.target.src = change.target.dataset.src;
                if ( change.target.getAttribute( 'data-src' ) ) {
                    const img = change.target;
                    const src = img.getAttribute( 'data-src' );

                    Utils.preloadImage( src )
                        .then( _ => {
                            const transitionend = e => {
                                img.classList.remove( FadeIn.IMG_CLASS );
                                img.removeEventListener( 'transitionend', transitionend );
                            };

                            img.addEventListener( 'transitionend', transitionend );
                            img.setAttribute( 'src', src );
                            img.classList.add( FadeIn.IS_VISIBLE );
                        } );
                }
                else {
                    change.target.classList.add( FadeIn.IS_VISIBLE );
                }

                this.observer.unobserve( change.target );
            }
        } );
    }
}