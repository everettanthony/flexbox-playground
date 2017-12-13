import { $, $$ } from '../utils/$';
import * as Utils from '../utils/utils';

export default class LazyImg {
    static get LOAD_DELAY() {
        return 500;
    }

    static get LAZY_CLASS() {
        return 'img-lazy';
    }

    static get LAZY_CLASS_NOT_LOADED() {
        return 'img-lazy-not-loaded';
    }

    static get LAZY_CLASS_LOADED() {
        return 'img-lazy-loaded';
    }

    static init() {
        this.imgs = $$( `.${LazyImg.LAZY_CLASS}` );
        setTimeout( _ => this._loadImages(), LazyImg.LOAD_DELAY );
    }

    static _loadImages() {
        this.imgs.forEach( ( img, i ) => {
            const src = img.getAttribute( 'data-src' );

            if ( src ) {
                this._loadImg( img, src, i );
            }
            else {
                console.warn( `No full image source provided for ${img}.` );
            }
        } );
    }

    static _loadImg( img, src, i ) {
        Utils.preloadImage( src )
            .then( _ => {
                const transitionend = e => {
                    img.removeEventListener( 'transitionend', transitionend );
                    img.classList.remove( LazyImg.LAZY_CLASS_NOT_LOADED );
                };

                img.addEventListener( 'transitionend', transitionend );
                img.setAttribute( 'src', src );

                requestAnimationFrame( _ => {
                    requestAnimationFrame( _ => img.classList.add( LazyImg.LAZY_CLASS_LOADED ) );
                } );
            } );
    }
}