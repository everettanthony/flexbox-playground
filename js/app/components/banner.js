import { $ } from '../utils/$';

export default class Banner {
    static get SHOW_DELAY() {
        return 300;
    }
    static get HDR_CLASS() {
        return 'c-banner-hdr';
    }

    static get VISIBLE_CLASS() {
        return 'is-visible';
    }

    static init() {
        this.hdr = $( `.${Banner.HDR_CLASS}` );

        setTimeout( _ => {
            requestAnimationFrame( _ => this.hdr.classList.add( `${Banner.VISIBLE_CLASS}` ) );
        }, Banner.SHOW_DELAY );
    }
}