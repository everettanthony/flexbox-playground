/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1.0
 *
 * Corresponding HTML should follow:
 *
 * <div class="input-field">
 *   <input type="text" id="tb-mytb" name="dbCol" />
 *   <label for="tb-mytb">Label Text</label>
 * </div>
 *
 * To make a field required, add class="req"
 * To make a field use a datepicker, add class="input-date"
 *
 * To autovalidate email, set type="email"
 * To auotvalidate phone numbers, set type="tel"
 */
import * as Utils from '../utils/utils';
import Inputmask from '../libs/inputmask/inputmask.numeric.extensions';
'use strict';

const SCRIPT_PIKADAY = '/js/app/libs/pikaday.js';
const SCRIPT_MOMENT = '/js/app/libs/moment.js';
//const SCRIPT_INPUTMASK = '/js/app/libs/inputmask.min.js';

const cssClasses = {
	ACTIVE_FIELD_CLASS: 'active',
	DATE_SELECTOR: 'input-date',
	ERROR_LABEL: 'error-label',
	INVALID_REQ_FIELD: 'invalid',
	REQUIRED_FIELD: 'req'
};

// array of reg Expression for validation made up of the following objects
// {{ type: 'Type or ClassName that indicates test should be applied', regExp: 'Expression to test', msg:'Invalid Msg' },
const validationTests = [
	{ type: 'req', regExp: /^(?!\s*$).+/, msg: 'Required Field' },
	{ type: 'email', regExp: /[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?/i, msg: 'Invalid Email Address' },
	{ type: 'tel', regExp: /^$|\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, msg: 'Invalid Phone Number' },
	{ type: 'input-date', regExp: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, msg: 'Invalid Date' },
	{ type: 'zip', regExp: /^$|\d{5}(?:[-\s]\d{4})?$/, msg: 'Invalid Zipcode' },
	{ type: 'numonly', regExp: /[0-9]$/, msg: 'Numbers Only' },
	{ type: 'currency', regExp: /^\d+(\.\d{1,2})?$/i, msg: 'Number or decimal only' }
];

export default class TextBox {
	// Provide the input element for this TextBox
	constructor( input, isCKEditor, isMediumEditor, isQuillEditor ) {
		// elements
		this.input = input;
		this.container = input.parentNode;
		this.label = this.container.querySelector( 'label' );

		// if this is a ckeditor or mediumeditor
		this.isCKEditor = isCKEditor;
		this.isMediumEditor = isMediumEditor;
		this.isQuillEditor = isQuillEditor;

		// check for date
		if ( this.input.classList.contains( cssClasses.DATE_SELECTOR ) ) {
			this.initDatePicker();
		}

		// check for initial value
		this.checkForValue();

		this.initDatePicker = this.initDatePicker.bind( this );
		this.focusHandler = this.focusHandler.bind( this );
		this.blurHandler = this.blurHandler.bind( this );
		this.validateField = this.validateField.bind( this );
		this.checkForValue = this.checkForValue.bind( this );
		this.setValue = this.setValue.bind( this );
		this.getValue = this.getValue.bind( this );

        this.addEventListeners();
        this.inputMaskSetup();



	}

	// Add the event listeners
	addEventListeners() {
		this.input.addEventListener( 'focus', this.focusHandler, false );
		this.input.addEventListener( 'blur', this.blurHandler, false );
		this.input.addEventListener( 'change', this.checkForValue, false );


		if ( this.input.classList.contains( 'currency' ) ) {
            const im = new Inputmask(
                {
                    alias: 'currency',
                    autoUnmask: true,
                    clearMaskOnLostFocus: true

                } );

                im.mask( this.input );

            if ( this.input.getAttribute( 'data-sumtype' ) === 'N' ) {
                this.input.parentNode.classList.add( 'input-neg-num' );
            }

        }

    }

    inputMaskSetup() {

        const imAlias = this.input.getAttribute( 'data-mask' );

        if ( imAlias !== null && imAlias !== '' ) {

            const im = new Inputmask(
                {
                    alias: imAlias,
                    autoUnmask: true,
                    clearMaskOnLostFocus: true

                } );

            im.mask( this.input );

        }

    }

	// Initialize the date picker if the input has class .input-date
	initDatePicker() {
		const field = this.input;
		// make sure it is a text input
		field.type = 'text';

		// if touch device use default date picker
		if ( 'ontouchstart' in document.documentElement && Utils.mq( '(max-width:1024px)' ) ) {
			field.type = 'date';
			return;
		}

		const setPicker = _ => {
			if ( field.isUpgraded ) {
				return;
			}

			const picker = new Pikaday( {
				field: field,
				format: 'MM/DD/YYYY',
				onSelect: function() {
					field.value = this.getMoment().format( 'MM/DD/YYYY' );
				}
			} );

			field.isUpgraded = true;
		};

		if ( typeof self.Pikaday === 'undefined' || !self.Pikaday ) {
			Utils.loadScript( SCRIPT_MOMENT )
				.then( _ => Utils.loadScript( SCRIPT_PIKADAY ) )
				.then( _ => setPicker() );
		}
		else {
			setPicker();
		}
	}

	// OnFocus event handler
    focusHandler() {
        if ( this.label ) {
            this.label.classList.add( cssClasses.ACTIVE_FIELD_CLASS );
        }
	}

	// OnBlur event handler
	blurHandler() {
		this.checkForValue();
		this.validateField();
	}

	// Helper function to check for a value and handle the active class of the label
    checkForValue() {
        if ( this.label ) {
             if ( this.getValue() !== '' ) {
                this.label.classList.add( cssClasses.ACTIVE_FIELD_CLASS );
            }
            else {
                this.label.classList.remove( cssClasses.ACTIVE_FIELD_CLASS );
            }
        }
	}

	// Helper function to provide validation of field data based on input type and classes
	validateField( compareWithLimit ) {
		let field = this.input;
		let type = field.type ? field.type.toLowerCase() : '';
		let valid = true;
		let val = this.getValue();
		let minChars = field.getAttribute( 'min-chars' );
		let compareWith = field.getAttribute( 'compare-with' );
		let prevError = this.container.querySelector( '.' + cssClasses.ERROR_LABEL );
		let lbl;
		let msg = '';
		let expFound = false;

		if ( minChars && val.length < parseInt( minChars, 10 ) ) {
			valid = false;
			msg = minChars + ' characters required.';
			expFound = true;
		}
		else if ( compareWith ) {
			let compField = document.getElementById( compareWith );
			let compValue = compField.value;
			let thisValue = field.value;

			if ( compValue !== thisValue ) {
				valid = false;
				msg = 'Does Not Match';
				expFound = true;
			}
			else {
				if ( !compareWithLimit ) {
					compField.TextBox.validateField( true );
				}
			}
		}

		if ( !expFound ) {
			//Loop thru validation test to see if any need to be applied.
			for ( var vtCnt = 0; vtCnt < validationTests.length; vtCnt++ ) {
				if ( type === validationTests[vtCnt].type || field.classList.contains( validationTests[vtCnt].type ) ) {
					if ( !validationTests[vtCnt].regExp.test( val ) ) {
						valid = false;
						msg = validationTests[vtCnt].msg;
						break;
					}
				}
			}
		}

		// remove any previous error messages
		if ( prevError ) {
			this.container.removeChild( prevError );
		}

		// if the field is valid
		if ( valid ) {
			field.classList.remove( cssClasses.INVALID_REQ_FIELD );
		}

		// if invalid, make sure it is highlighted
		else {
			field.classList.add( cssClasses.INVALID_REQ_FIELD );

			// if we have a message
			if ( msg !== '' ) {
				lbl = document.createElement( 'span' );
				lbl.classList.add( cssClasses.ERROR_LABEL );
				lbl.textContent = msg;
				this.container.appendChild( lbl );
			}
		}

		return valid;
	}

	// Helper function to set the value of the input
	setValue( val ) {
		this.input.value = val;
		this.checkForValue();
		this.validateField();
	}

	// Helper function get the value of the input
	getValue() {
		if ( this.isCKEditor ) {
			return CKEDITOR.instances[this.input.id].getData().trim();
		}
		else if ( this.isMediumEditor ) {
			return this.input.innerText.trim();
		}
		else if ( this.isQuillEditor ) {
			return '';
		}

		return this.input.value.trim();
	}
}



//( function( $, undefined ) {

//    "use strict";

//    // When ready.
//    $( function() {

//        var $form = $( "#form" );
//        var $input = $form.find( "input" );

//        $input.on( "keyup", function( event ) {


//            // When user select text in the document, also abort.
//            var selection = window.getSelection().toString();
//            if ( selection !== '' ) {
//                return;
//            }

//            // When the arrow keys are pressed, abort.
//            if ( $.inArray( event.keyCode, [38, 40, 37, 39] ) !== -1 ) {
//                return;
//            }


//            var $this = $( this );

//            // Get the value.
//            var input = $this.val();

//            var input = input.replace( /[\D\s\._\-]+/g, "" );
//            input = input ? parseInt( input, 10 ) : 0;

//            $this.val( function() {
//                return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
//            });
//        });

//        /**
//         * ==================================
//         * When Form Submitted
//         * ==================================
//         */
//        $form.on( "submit", function( event ) {

//            var $this = $( this );
//            var arr = $this.serializeArray();

//            for ( var i = 0; i < arr.length; i++ ) {
//                arr[i].value = arr[i].value.replace( /[($)\s\._\-]+/g, '' ); // Sanitize the values.
//            };

//            console.log( arr );

//            event.preventDefault();
//        });

//    });
//})( jQuery );