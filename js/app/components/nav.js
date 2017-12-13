/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import { $, $$ } from '../utils/$';

export default class Nav {
    static get NAV_IN_CLASS() {
        return 'nav-in';
    }

    static init() {
        this.nav = $( '#nav-main' );
        this.trigger = $( '#btn-nav-trigger' );
        this.links = $$( 'a', this.nav );

        if ( this.nav && this.trigger ) {
            this._addEventListeners();
        }
    }

    static _addEventListeners() {
        this.trigger.addEventListener( 'click', e => this._toggleNav() );
        this.links.forEach( link => link.addEventListener( 'click', e => this.close() ) );
    }

    static _toggleNav() {
        document.body.classList.toggle( Nav.NAV_IN_CLASS );
    }

    static close() {
        document.body.classList.remove( Nav.NAV_IN_CLASS );
    }
}