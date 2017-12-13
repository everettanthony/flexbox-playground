/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import { MaterialButton } from '../forms/materialButton';
'use strict';

const ROOT = 'alert';
let activeAlert = null;

export default class Alert {
	static get cssClasses() {
		return {
			ROOT,
			ALERT_ACTIVE: `${ROOT}-is-active`,
			ALERT_EL: `${ROOT}-el`,
			ALERT_HDR: `${ROOT}-header`,
			ALERT_INFO: `${ROOT}-info`,
			BTN: `${ROOT}-btn`,
			BTN_CONFIRM: `${ROOT}-btn-confirm`,
			BTN_CONTAINER: `${ROOT}-btn-container`,
			BTN_DISMISS: `${ROOT}-btn-dismiss,`,
			CONTAINER: `${ROOT}-container`
		};
	}

	static get numbers() {
		return {
			ESCAPE_KEY: 27
		};
	}

	constructor() {
		this.root_ = document.body;

		this.container = this._createAlertElements();
		this.root_.appendChild( this.container );

		this.onConfirm = function() { };
		this.onDismiss = function() { };

		this.addEventListeners();

		activeAlert = this;
	}

	_createAlertElements() {
		const el = document.createElement( 'div' );
		el.classList.add( Alert.cssClasses.CONTAINER );

		this.alertEl = document.createElement( 'div' );
		this.alertEl.classList.add( Alert.cssClasses.ALERT_EL );

		this.alertHeader = document.createElement( 'h3' );
		this.alertHeader.classList.add( Alert.cssClasses.ALERT_HDR );

		this.alertInfo = document.createElement( 'div' );
		this.alertInfo.classList.add( Alert.cssClasses.ALERT_INFO );

		this.btnContainer = document.createElement( 'div' );
		this.btnContainer.classList.add( Alert.cssClasses.BTN_CONTAINER );

		this.btnDismiss = document.createElement( 'button' );
		this.btnDismiss.classList.add( Alert.cssClasses.BTN );
		this.btnDismiss.classList.add( Alert.cssClasses.BTN_DISMISS );
		this.btnDismiss.classList.add( 'btn-ripple' );
		this.btnDismiss.textContent = 'Dismiss';

		this.btnConfirm = document.createElement( 'button' );
		this.btnConfirm.classList.add( Alert.cssClasses.BTN );
		this.btnConfirm.classList.add( Alert.cssClasses.BTN_CONFIRM );
		this.btnConfirm.classList.add( 'btn-ripple' );
		this.btnConfirm.textContent = 'Confirm';

		this.btnContainer.appendChild( this.btnDismiss );
		this.btnContainer.appendChild( this.btnConfirm );

		this.alertEl.appendChild( this.alertHeader );
		this.alertEl.appendChild( this.alertInfo );
		this.alertEl.appendChild( this.btnContainer );

		el.appendChild( this.alertEl );

		return el;
	}

	addEventListeners() {
		this.btnConfirm.addEventListener( 'click', this.onConfirm, false );
		this.btnDismiss.addEventListener( 'click', this.onDismiss, false );
	}

	promptAlert( hdr, content, btnConfirmText, btnDismissText, fnConfirm, fnDismiss ) {
		this.alertHeader.textContent = hdr;
		this.alertInfo.innerHTML = content;
		this.updateButtons( btnConfirmText, btnDismissText, fnConfirm, fnDismiss );
		this.showAlert();

		document.body.addEventListener( 'keydown', this.handleKeyDown, false );
	}

	updateButtons( btnConfirmText, btnDismissText, fnConfirm, fnDismiss ) {
		this.btnConfirm.textContent = btnConfirmText;
		this.btnDismiss.textContent = btnDismissText;

		//this.btnDismiss.MaterialButton = new MaterialButton( this.btnDismiss );
		//this.btnConfirm.MaterialButton = new MaterialButton( this.btnConfirm );

		this.btnConfirm.removeEventListener( 'click', this.onConfirm, false );
		this.btnDismiss.removeEventListener( 'click', this.onDismiss, false );

		this.onConfirm = fnConfirm;
		this.onDismiss = fnDismiss;

		this.btnConfirm.addEventListener( 'click', this.onConfirm, false );
		this.btnDismiss.addEventListener( 'click', this.onDismiss, false );
	}

	showAlert() {
		document.body.classList.add( Alert.cssClasses.ALERT_ACTIVE );
	}

	handleKeyDown( e ) {
		if ( e.keyCode === Alert.numbers.ESCAPE_KEY ) {
			this.onDismiss();
		}
	}

	dismissAlert() {
		document.body.classList.remove( Alert.cssClasses.ALERT_ACTIVE );
		document.body.removeEventListener( 'keydown', this.handleKeyPress, false );
	}
}