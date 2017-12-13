/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
'use strict';

const ROOT = 'toast';

export default class Toast {
	static get cssClasses() {
		return {
			ROOT,
			VISIBLE: `${ROOT}-is-visible`,
		};
	}

	static get numbers() {
		return {
			DEFAULT_DURATION: 3000
		};
	}

	constructor( root ) {
		this.root_ = document.body;
		this.container = this._createToast();
	}

	show( msg, duration ) {
		this.removeToasts();

		this.container.textContent = msg;
		this.container.classList.add( Toast.cssClasses.VISIBLE );

		this.root_.appendChild( this.container );

		if ( !duration && duration !== -1 ) {
			duration = Toast.numbers.DEFAULT_DURATION;
		}

		if ( duration !== -1 ) {
			setTimeout( _ => this.hide(), duration );
		}
	}

	_createToast() {
		const container = document.createElement( 'div' );
		container.classList.add( Toast.cssClasses.ROOT );
		return container;
	}

	hide() {
		this.container.classList.remove( Toast.cssClasses.VISIBLE );
	}

	removeToasts() {
		const toast = document.querySelector( '.' + Toast.cssClasses.ROOT );

		if ( toast ) {
			toast.parentNode.removeChild( toast );
		}
	}
}