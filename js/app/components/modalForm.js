/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import { $, $$ } from '../utils/$';

export default class ModalForm {
    static get ROOT() {
        return 'modal-form';
    }

    static get IS_VISIBLE() {
        return 'is-visible';
    }

    static init() {
        this.forms = $$( `.${ModalForm.ROOT}` ).map( el => new ModalForm( el ) );
    }

    static close() {
        this.htmlEl = $( 'html' );
        this.forms.forEach( form => {
            form.root.classList.remove( ModalForm.IS_VISIBLE );
        } );
        this.htmlEl.classList.remove( `${ModalForm.ROOT}-${ModalForm.IS_VISIBLE}` );
    }

    constructor( el ) {
        this.htmlEl = $( 'html' );
        this.root = el;
        this.id = this.root.getAttribute( 'id' );
        this.btnClose = $( `.${ModalForm.ROOT}-close`, this.root );

        this.trigger = $( `[data-form="${this.id}"]` );

        this._addEventListners();
    }

    _addEventListners() {
        if ( this.trigger ) {
            this.trigger.addEventListener( 'click', e => this._show( e ) );
        }

        this.btnClose.addEventListener( 'click', e => this._hide() );
    }

    _show( e ) {
        this.root.classList.add( ModalForm.IS_VISIBLE );
        this.htmlEl.classList.add( `${ModalForm.ROOT}-${ModalForm.IS_VISIBLE}` );

        if ( e ) {
            e.preventDefault();
        }
    }

    _hide() {
        this.root.classList.remove( ModalForm.IS_VISIBLE );
        this.htmlEl.classList.remove( `${ModalForm.ROOT}-${ModalForm.IS_VISIBLE}` );
    }
}