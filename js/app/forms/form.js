/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1.0
 */
import { $, $$ } from '../utils/$';
import * as Utils from '../utils/utils';
import TextBox from './textBox';
import Select from './select';

'use strict';

let ckEditorSettings = {
	allowedContent: true,
	height: 350,
	toolbar: 'Simple'
};

let mediumEditorSettings = {
	placeholder: {
		text: ''
	},
	toolbar: {
		buttons: [
			'bold',
			'italic',
			'underline',
			'anchor',
			'h2',
			'h3',
			'unorderedlist',
			'orderedlist'
		]
	},
	anchor: {
		targetCheckbox: true,
		targetCheckboxText: 'Open in New Tab?'
	}
};

const SCRIPT_PIKADAY = '/js/app/libs/pikaday.js';
const SCRIPT_MOMENT = '/js/app/libs/moment.js';

const formCssClasses = {
	chosenSelect: 'chosen-select',
	ckeditor: 'use-ckeditor',
	errorLabel: 'error-label',
	hidden: 'hidden',
	inputField: 'input-field',
	invalid: 'invalid',
	mediumEditor: 'use-medium-editor',
	quillEditor: 'use-quill-editor',
	required: 'req'
};

export default class Form {
	// When creating a new Form, we can pass in a selected element (i.e. document.querySelect( '#form' ))
	// or we can pass in a selector (i.e. '#form' )
	constructor( el, editorOptions ) {
		if ( typeof el === 'string' ) {
			el = $( el );
		}

		this.container = el;
		this.editorOptions = editorOptions;
		this.fields = $$( 'input:not([type="file"]),textarea,.use-medium-editor,select', el );
		this.reqFields = $$( '.' + formCssClasses.required, el );
		this.inputFields = $$( '.' + formCssClasses.inputField + ',.text-editor', el );

		this.initFormElements = this.initFormElements.bind( this );
		this.initEditors = this.initEditors.bind( this );
		this.checkActiveInputs = this.checkActiveInputs.bind( this );
		this.validateFields = this.validateFields.bind( this );
		this.collectData = this.collectData.bind( this );
		this.setFieldValues = this.setFieldValues.bind( this );
		this.clearForm = this.clearForm.bind( this );

		this.initFormElements();
		this.initEditors();
	}

	// This function will loop through all input field elements to check for
	// inputs and select elements to create our custom TextBox or Select objects
	initFormElements() {
		this.inputFields.forEach( container => {
			let select = container.querySelector( 'select' );
			let input = container.querySelector( 'input' );

			if ( select && !select.Select ) {
				select.Select = new Select( select );
			}

			if ( !input ) {
				input = container.querySelector( 'textarea' );
			}

			if ( !input ) {
				input = container.querySelector( '.' + formCssClasses.mediumEditor );
			}

			if ( input ) {
				let tag = input.tagName.toLowerCase();
				let type = input.type ? input.type.toLowerCase() : '';

				if ( !input.TextBox && type !== 'checkbox' && type !== 'radio' ) {
					let isCKEditor = false;
					let isMediumEditor = false;
					let isQuillEditor = false;

					if ( input.classList.contains( formCssClasses.ckeditor ) ) {
						isCKEditor = true;
					}
					else if ( input.classList.contains( formCssClasses.mediumEditor ) ) {
						isMediumEditor = true;
					}
					else if ( input.classList.contains( formCssClasses.quillEditor ) ) {
						isQuillEditor = true;
					}

					input.TextBox = new TextBox( input, isCKEditor, isMediumEditor, isQuillEditor );
				}
			}
        } );

        this.fields.forEach( el => {
            if ( el.classList.contains( 'input-date' ) && !el.isUpgraded ) {
                this.initDatePicker( el );
            }
        } );
	}

    initDatePicker( field ) {
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

	// Helper functions to initialize textareas with MediumEditor or CKEDITOR
	// depending on specified class
	initEditors() {
		this.fields.forEach( field => {
			if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				if ( !window.MediumEditor ) {
					console.warn( 'MediumEditor source not found. Unable to use MediumEditor.' );
				}
				else {
					new MediumEditor( field, this.editorOptions || mediumEditorSettings );
				}
			}
			else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
				if ( !window.CKEDITOR ) {
					console.warn( 'CKEDITOR source not found. Unable to use CKEDITOR' );
				}
				else {
					CKEDITOR.replace( field.id, this.editorOptions || ckEditorSettings );

					if ( field.classList.contains( 'ckfinder' ) ) {
						CKFinder.setupCKEditor( CKEDITOR.instances[field.id], '/ckfinder/' );
					}
				}
			}
		} );
	}

	// Check if inputs/selects have values to set or remove active class
	// on the sibling label
	checkActiveInputs() {
		this.inputFields.forEach( container => {
			let lbl = container.querySelector( 'label' );
			let select = container.querySelector( 'select' );
			let input = container.querySelector( 'input' );

			if ( lbl ) {
				lbl.classList.remove( 'active' );
			}

			if ( select && select.Select ) {
				select.Select.checkForValue();
			}

			if ( !input ) {
				input = container.querySelector( 'textarea' );
			}

			if ( !input ) {
				input = container.querySelector( '.' + formCssClasses.mediumEditor );
			}

			if ( input && input.TextBox ) {
				input.TextBox.checkForValue();
			}
		} );
	}

	// Helper function to check if required fields have valid data
	validateFields() {
		let isValid = true;

		// changed this loop to use all fields so that we can check
		//   if field level validation is ok.
		this.fields.forEach( field => {
			let isFieldValid = true;
			let val = '';
			let tag = field.tagName.toLowerCase();

			if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				val = field.innerText.trim();

				if ( field.TextBox ) {
					isFieldValid = field.TextBox.validateField();
				}
				else if ( field.classList.contains( 'req' ) && val === '' ) {
					isFieldValid = false;
				}
			}
			else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
				if ( field.TextBox ) {
					isFieldValid = field.TextBox.validateField();
				}
				else {
					val = CKEDITOR.instances[field.id].getData().trim();

					if ( field.classList.contains( 'req' ) && val === '' ) {
						isFieldValid = false;
					}
				}
			}
			else if ( tag === 'select' ) {
				if ( field.Select ) {
					val = field.Select.getValue();
					isFieldValid = field.Select.checkIfRequired();
				}
				else if ( !field.classList.contains( formCssClasses.chosenSelect ) ) {
					val = field.options[field.selectedIndex].value;

					if ( field.classList.contains( 'req' ) && ( val === '' || val === '-1' ) ) {
						isFieldValid = false;
					}
				}
			}
			else {
				if ( field.TextBox && field.classList.contains( 'req' ) ) {
					isFieldValid = field.TextBox.validateField();
				}
				else {
					val = field.value.trim();

					if ( field.classList.contains( 'req' ) && val === '' ) {
						isFieldValid = false;
					}
				}
			}

			if ( isValid && !isFieldValid ) {
				isValid = false;
			}

			if ( !isFieldValid ) {
				console.log( 'Invalid Field: ', field );
			}
		} );

		return isValid;
	}

	// Helper function to collect data from form fields and return as
	// JSON key/value pair object. Uses the element's name attribute as the key.
	collectData() {
		let params = {};

		this.fields.forEach( field => {
			let key = field.getAttribute( 'name' );
			let val = '';
			let tag = field.tagName.toLowerCase();
			let type = field.type ? field.type.toLowerCase() : '';

			if ( type === 'checkbox' ) {
				val = field.checked;
			}
			else if ( type === 'radio ' ) {
				if ( field.checked ) {
					val = field.value;
				}
				else {
					key = null;
				}
			}
			else if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				val = field.innerHTML;
			}
			else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
				val = CKEDITOR.instances[field.id].getData().trim();
			}
			else if ( tag === 'select' ) {
				if ( field.Select ) {
					val = field.Select.getValue();
				}
				else if ( !field.classList.contains( formCssClasses.chosenSelect ) ) {
					val = field.options[field.selectedIndex].value;
				}
			}
			else {
				val = field.value.trim();

				if ( field.classList.contains( 'integer' ) ) {
					val = parseInt( val, 10 );
				}
				else if ( field.classList.contains( 'decimal' ) ) {
					if ( val === '' ) {
						val = -1;
					}

					val = parseFloat( val );
				}
			}

			if ( key !== null ) {
				params[key] = val;
			}

		} );

		return params;
	}

	// Helper function to set the values of form fields. Will use the
	// name attribute of each field element to select the respective value
	// from the obj parameter.
	setFieldValues( obj ) {
		this.fields.forEach( field => {
			let val = obj[field.getAttribute( 'name' )];
			let type = field.type ? field.type.toLowerCase() : '';
			let tag = field.tagName.toLowerCase();

			if ( !val ) {
				console.warn( 'Property does not exist for key ' + field.getAttribute( 'name' ) );
			}
			else {
				if ( type === 'checkbox' ) {
					field.checked = val;
				}
				else if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
					field.innerHTML = val;
				}
				else if ( field.classList.contains( formCssClasses.ckeditor ) ) {
					val = CKEDITOR.instances[field.id].setData( val );
				}
				else if ( tag === 'select' && field.Select ) {
					field.Select.setValue( val );
				}
				else {
					if ( field.classList.contains( 'input-date' ) ) {
						if ( obj[field.getAttribute( 'name' ) + 'Str'] ) {
							val = obj[field.getAttribute( 'name' ) + 'Str'];
						}
						else {
							val = moment( val ).format( 'MM/DD/YYYY' );
						}
					}

					field.value = val;
				}
			}
		} );

		this.checkActiveInputs();
	}

	// Helper function to clear out the values of a form. Will additionally
	// remove all HTML from containers with class .row-preview and hide
	// all elements with class .btn-item-upload-delete. It will then
	// run checkActiveInputs to reset the labels.
	clearForm() {
		this.fields.forEach( field => {
			let lbl = field.parentNode.querySelector( '.' + formCssClasses.errorLabel );
			let type = field.type ? field.type.toLowerCase() : '';
			let tag = field.tagName.toLowerCase();

			if ( type === 'checkbox' ) {
				field.checked = false;
			}
			else if ( field.classList.contains( formCssClasses.mediumEditor ) ) {
				field.innerHTML = '';
			}
			else if ( tag === 'textarea' ) {
				if ( field.classList.contains( formCssClasses.ckeditor ) ) {
					CKEDITOR.instances[field.id].setData( '' );
				}
				else {
					field.value = '';
				}
			}
			else if ( tag === 'select' ) {
				if ( field.Select ) {
					field.Select.setValue( '-1' );
				}
				else if ( field.multiple && field.classList.contains( formCssClasses.chosenSelect ) ) {
					$$( 'option', field ).forEach( opt => opt.selected = false );

					jQuery( field ).trigger( 'chosen:updated' );
				}
				else {
					field.value = '-1';
				}
			}
			else {
				field.value = '';
			}

			field.classList.remove( formCssClasses.invalid );

			if ( lbl ) {
				field.parentNode.removeChild( lbl );
			}
		} );

		$$( '.row-preview', this.container ).forEach( row => row.innerHTML = '' );
		$$( '.btn-item-upload-delete', this.container ).forEach( btn => btn.classList.add( 'hidden' ) );

		this.checkActiveInputs();
	}

	hide() {
		this.container.classList.add( formCssClasses.hidden );
	}

	show() {
		this.checkActiveInputs();
		this.container.classList.remove( formCssClasses.hidden );
	}
}