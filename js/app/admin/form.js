/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1
 *
 * Configuration/Info
 *
 * Label for item has class lbl-item
 * Label for items has class lbl-items
 * For grid, expects grid container to have ID grid-container
 * Expects form-grid for item listing
 * Expects form-edit for manipulating item data
 *
 * Expects add new button with ID btn-new
 */
import { $, $$ } from '../utils/$';
import doFetch from '../utils/fetch';
import * as Utils from '../utils/utils';
import Alert from '../components/alert';
import Toast from '../components/toast';
import Form from '../forms/form';

'use strict';

let config = {
	btnBack: 'btn-back',
	btnDelete: 'btn-delete',
	btnNew: 'btn-new',
	btnSave: 'btn-save',
	formGrid: 'form-grid',
	formEdit: 'form-edit',
	gridContainerId: 'grid-container',
	gridRowClass: 'admin-grid-row',
	hiddenClass: 'hidden',
	lblItem: 'lbl-item',
	lblItems: 'lbl-items',
	wsUrl: '/api/'
};

const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';

const toast = new Toast();
const alert = new Alert();
const defaultUrl = window.location.pathname;

export default class AdminForm {
	constructor( options ) {
		// extract data from options
		this.options = options;

		this.labelItemText = options.labelItemText;
		this.labelItemsText = options.labelItemsText;

		// user custom wsURL path
		this.wsUrl = options.wsPath;

		if ( this.wsUrl ) {
			config.wsUrl = this.wsUrl;
		}

		// init new item
		this.initItemFn = options.initItem ? options.initItem.callback : null;

		// load items information
		this.loadItemsFn = options.loadItems.fn;
		this.loadItemsParams = options.loadItems.params;
		this.loadItemsRowHTML = options.loadItems.rowTmpl;
		this.loadItemsRowHeaders = options.loadItems.rowTmplHeaders;
		this.loadItemsRowProps = options.loadItems.rowTmplProps;

		// edit item options
		this.editItemFn = options.editItem.fn;
		this.editItemParams = options.editItem.params;
		this.editItemItemId = options.editItem.itemId;
		this.editItemCallback = options.editItem.callback;

		// save item
		this.saveItemFn = options.saveItem.fn;
		this.saveItemId = options.saveItem.itemId;
		this.saveItemIsGuid = options.saveItem.isGuid || false;
		this.sendAsString = options.saveItem.sendAsString || false;
		this.saveCallback = options.saveItem.callback;
		this.updateSortOrderFn = options.saveItem.updateSortOrderFn;

		// delete item
		this.deleteItemFn = options.deleteItem.fn;
		this.deleteItemItemId = options.deleteItem.itemId;

		// back to options callback
		this.backToGridCallback = options.back.fn;

		// items
		this.items = [];

		// initialize our form objects
		this.formGrid = new Form( $( '#' + config.formGrid ) );
		this.formEdit = new Form( $( '#' + config.formEdit ) );

		// do we want to have drag/drop for sort order
		this.dragDropForOrder = options.dragDropForOrder || false;

		// buttons
		this.btnNew = $( '#' + config.btnNew );
		this.btnBack = $( '#' + config.btnBack );
		this.btnDelete = $( '#' + config.btnDelete );
		this.btnSave = $( '#' + config.btnSave );

		// tracking data
		this.itemId = -1;
		this.additionadditionalPropertiesDefault = Utils.cloneObj( options.additionalProperties || {} );
		this.additionalProperties = Utils.cloneObj( options.additionalProperties || {} );

		// bind this to our functions
		this.setLabels = this.setLabels.bind( this );
		this.loadItems = this.loadItems.bind( this );
		this.buildGrid = this.buildGrid.bind( this );
		this.initNewItem = this.initNewItem.bind( this );
		this.editData = this.editData.bind( this );
		this.saveItem = this.saveItem.bind( this );
		this.backToGrid = this.backToGrid.bind( this );
		this.btnDeleteClickHandler = this.btnDeleteClickHandler.bind( this );
		this.deleteItem = this.deleteItem.bind( this );
		this.popstateHanlder = this.popstateHanlder.bind( this );

		// set display labels
		this.setLabels();

		// assign event listeners
		this.addEventListeners();

		// load current database items
		this.loadItems();
	}

	setLabels() {
		$$( '.' + config.lblItem ).forEach( el => el.textContent = this.labelItemText );
		$$( '.' + config.lblItems ).forEach( el => el.textContent = this.labelItemsText );
	}

	addEventListeners() {
		this.btnNew.addEventListener( 'click', this.initNewItem, false );
		this.btnBack.addEventListener( 'click', this.backToGrid, false );
		this.btnSave.addEventListener( 'click', this.saveItem, false );
		this.btnDelete.addEventListener( 'click', this.btnDeleteClickHandler, false );
		window.addEventListener( 'popstate', this.popstateHanlder, false );
	}

	async loadItems() {
		try {
			let params = {};

			if ( typeof this.loadItemsParams === 'function' ) {
				params = this.loadItemsParams();
			}
			else {
				params = this.loadItemsParams;
			}

			const rsp = await doFetch( config.wsUrl + this.loadItemsFn, {
				body: params
			} );

			if ( rsp.success ) {
				this.items = rsp.obj;
				const type = ( typeof this.items ).toLowerCase();

				if ( type === 'string' ) {
					this.items = JSON.parse( this.items );
				}

				this.buildGrid();
			}
			else {
				console.log( `Error loading items: ${rsp.msg}` );
			}
		}
		catch ( err ) {
			console.log( `Error loading items: ${err}` );
		}
	}

	buildGrid() {
		const me = this;
		let html = '';
		let rowHtml = '';

		// add the header row
		rowHtml = this.loadItemsRowHTML;
		for ( let i = 0; i < this.loadItemsRowHeaders.length; i++ ) {
			let hdr = this.loadItemsRowHeaders[i];
			let itemProp = this.loadItemsRowProps[i];
			rowHtml = rowHtml.replace( '{{' + itemProp + '}}', hdr );
		}

		rowHtml = rowHtml.replace( '{{rowClass}}', ' hdr' );
		html += rowHtml;

		// loop through all of the items and add them
		for ( let i = 0; i < this.items.length; i++ ) {
			let item = this.items[i];
			rowHtml = this.loadItemsRowHTML.replace( '{{rowClass}}', '' );

			for ( let j = 0; j < this.loadItemsRowProps.length; j++ ) {
				let itemProp = this.loadItemsRowProps[j];
				let val = item[itemProp];

				if ( itemProp === 'active' || itemProp === 'isActive' ) {
					val = val === true ? 'Active' : 'Not Active';
				}
				else if ( itemProp === 'isFeatured' ) {
					val = val === true ? 'Yes' : 'No';
				}
				else if ( itemProp === 'isAdmin' ) {
					val = val === true ? 'Yes' : 'No';
				}

				rowHtml = rowHtml.replace( '{{' + itemProp + '}}', val );
			}

			html += rowHtml;
		}

		$( '#' + config.gridContainerId ).innerHTML = html;

		requestAnimationFrame( _ => {
			this.initRows().then( _ => {
				if ( this.dragDropForOrder && this.rows.length ) {
					this.initDragDrop();
				}
			} );
		} );
	}

	initRows() {
		return new Promise( ( resolve, reject ) => {
			const me = this;
			this.rows = [];

			$$( `.${config.gridRowClass}` ).forEach( row => this.rows.push( new FormRow( row, me ) ) );

			resolve();
		} );
	}

	initDragDrop() {
		dragula( [$( '#' + config.gridContainerId )], {
			isContainer: el => false,
			moves: ( el, source, handle, sibling ) => handle.classList.contains( 'btn-reorder' ),
			accepts: ( el, target, source, sibling ) => true,
			invalid: ( el, handle ) => false,
			direction: 'vertical',
			copy: false,
			copySortSource: false,
			revertOnSpill: false,
			removeOnSpill: false,
			mirrorContainer: document.body,
			ignoreInputTextSelect: true
		} ).on( 'drop', ( el, target, source, sibling ) => {
			const id = parseInt( el.getAttribute( 'data-id' ), 10 );
			const sortedRowIds = $$( '.admin-grid-row:not(.hdr)' ).map( el => parseInt( el.getAttribute( 'data-id' ), 10 ) );
			const index = sortedRowIds.findIndex( elId => elId === id );

			doFetch( config.wsUrl + this.updateSortOrderFn, {
				body: {
					id: id,
					sortOrder: index + 1
				}
			} ).then( rsp => {
				if ( rsp.success ) {
					toast.show( 'Display order updated.' );
				}
			} );
		} );
	}

	initNewItem() {
		this.itemId = -1;

		if ( this.formEdit.container.querySelector( '#tb-sort-order' ) ) {
			this.formEdit.container.querySelector( '#tb-sort-order' ).value = this.items.length + 1;
		}

		this.formGrid.hide();
		this.formEdit.show();
		this.btnDelete.classList.add( config.hiddenClass );

		if ( this.initItemFn && typeof this.initItemFn === 'function' ) {
			this.initItemFn();
		}

		history.pushState( { page: 'edit' }, 'Edit', '?edit' );
	}

	editData( id ) {
		toast.show( 'Loading item details...', -1 );
		this.itemId = id;
		this.editItemParams[this.editItemItemId] = this.itemId;

		doFetch( config.wsUrl + this.editItemFn, {
			body: this.editItemParams
		} ).then( rsp => {
			let obj;

			if ( rsp.success && rsp.obj.length ) {
				obj = rsp.obj[0];
				this.formEdit.setFieldValues( obj );
				this.formEdit.show();
				this.formGrid.hide();
				this.btnDelete.classList.remove( config.hiddenClass );

				if ( this.additionalProperties ) {
					Object.getOwnPropertyNames( this.additionalProperties ).forEach( val => {
						this.additionalProperties[val] = obj[val];
					} );
				}

				window.scrollTo( 0, 0 );
				toast.hide( true );

				if ( this.editItemCallback && typeof this.editItemCallback === 'function' ) {
					this.editItemCallback( obj );
				}

				history.pushState( { page: 'edit' }, 'Edit', '?edit' );
			}
		} ).catch( rsp => {
			console.log( rsp );
		} );
	}

	saveItem() {
		const me = this;
		let isValid = this.formEdit.validateFields();
		let params = {};

		if ( !isValid ) {
			toast.show( 'Fields marked with * are required.' );
			return;
		}

		toast.show( 'Saving data, please wait...' );

		params = this.formEdit.collectData();

		if ( this.additionalProperties ) {
			Object.getOwnPropertyNames( this.additionalProperties ).forEach( val => {
				params[val] = this.additionalProperties[val];
			} );
		}

		params[this.saveItemId] = this.itemId;

		if ( this.saveItemIsGuid && this.itemId === -1 ) {
			params[this.saveItemId] = GUID_EMPTY;
		}

		if ( this.sendAsString ) {
			params = {
				data: JSON.stringify( params )
			};
		}

		doFetch( config.wsUrl + this.saveItemFn, {
			body: params
		} ).then( rsp => {
			if ( rsp.success ) {
				toast.show( 'Data saved successfully.', 2000 );

				if ( this.itemId === -1 ) {
					this.itemId = rsp.obj;
				}

				if ( this.saveCallback && typeof this.saveCallback === 'function' ) {
					this.saveCallback( _ => {
						me.loadItems();
						me.backToGrid();
					} );
				}
				else {
					me.loadItems();
					setTimeout( _ => me.backToGrid(), 1500 );
				}
			}
			else {
				toast.show( 'Unable to save at this time, please try again. ' + rsp.msg, -1 );
				console.log( 'Error:', rsp.msg || 'No error data.' );
			}
		} ).catch( rsp => {
			toast.show( 'Unable to save at this time, please try again.', -1 );
			console.log( 'Error:', rsp || 'No error data.' );
		} );
	}

	backToGrid() {
		this.formEdit.hide();
		this.formEdit.clearForm();
		this.formGrid.show();

		// reset tracked data
		this.itemId = -1;

		if ( this.additionalProperties ) {
			Object.getOwnPropertyNames( this.additionalProperties ).forEach( val => {
				this.additionalProperties[val] = this.additionadditionalPropertiesDefault[val];
			} );
		}

		if ( this.backToGridCallback && typeof this.backToGridCallback === 'function' ) {
			this.backToGridCallback();
		}

		window.scrollTo( 0, 0 );

		history.pushState( { page: '' }, 'Options', defaultUrl );

		this.formEdit.clearForm();
	}

	btnDeleteClickHandler() {
		this.deleteItem( this.itemId );
	}

	deleteItem( id ) {
		const me = this;

		let params = {};
		params[this.deleteItemItemId] = id;

		alert.promptAlert( 'Confirm Delete', '<p>Are you sure you want to delete this item?', 'Delete', 'Cancel', evt => {
			alert.dismissAlert();
			toast.show( 'Deleting item...' );

			doFetch( config.wsUrl + this.deleteItemFn, {
				body: params
			} ).then( rsp => {
				if ( rsp.success ) {
					toast.show( 'Item successfully deleted.', 2500 );
					me.loadItems();

					setTimeout( _ => me.backToGrid(), 1000 );
				}
				else {
					toast.show( 'Unable to delete at this time. Please try again.' );
					console.log( 'Error:', rsp.msg || 'No error data' );
				}
			} ).catch( rsp => {
				toast.show( 'Unable to delete at this time. Please try again.' );
				console.log( 'Error:', rsp || 'No error data' );
			} );

			evt.preventDefault();
		}, evt => {
			alert.dismissAlert();
			evt.preventDefault();
		} );
	}

	setAdditionalPropertyData( key, val ) {
		this.additionalProperties[key] = val;
	}

	getAdditionalPropertyData( key ) {
		return this.additionalProperties[key];
	}

	popstateHanlder( e ) {
		if ( !e.state || e.state.page === '' ) {
			this.backToGrid();
		}
	}

	// helper function to handle image uploads
	//   @file - the file to be uploaded
	//   @isImg - boolean if uploading an image
	//   @handler - the ashx file to handle the file upload
	//   @fn - optional - callback function to run after the image has been uploaded
	uploadHelper( file, isImg, handler, headers, fn ) {
		let fileName = file.name;
		let fileType = file.type;
		let fReader = new FileReader();

		// confirm this file is allowed
		if ( !isImg || /^image\//.test( fileType ) ) {
			toast.show( 'Uploading file, please wait...', -1 );

			fReader.onload = function( e ) {
				let xhr = new XMLHttpRequest();

				// set the handler and all headers
				xhr.open( 'post', handler, true );
				xhr.setRequestHeader( 'X-File-Name', fileName );
				xhr.setRequestHeader( 'X-File-Size', file.size );
				xhr.setRequestHeader( 'X-File-Type', fileType );

				for ( const key in headers ) {
					xhr.setRequestHeader( key, headers[key] );
				}

				// callback of xhr load
				xhr.addEventListener( 'load', function( response ) {
					// when the request is complete
					if ( response.target.response ) {
						let rsp = JSON.parse( response.target.response );

						// if the upload was successful
						if ( rsp.success ) {
							toast.show( 'The file was successfully uploaded.' );
							setTimeout( _ => {
								toast.hide( true );
							}, 1000 );

							if ( fn && typeof fn === 'function' ) {
								fn( rsp.obj );
							}
						}
						else {
							toast.show( 'Unable to upload the file, please try again.', -1 );
							console.log( 'Error:', rsp.msg || 'No error data.' );
						}
					}
				}, false );

				xhr.send( file );
			};

			// begin the read operation
			fReader.readAsDataURL( file );
		}
		else {
			toast.show( 'Only .jpg, .jpeg, and .png files are allowed.', -1 );
		}
	}
}

class FormRow {
	constructor( row, form ) {
		this.container = row;
		this.AdminForm = form;
		this.id = row.getAttribute( 'data-id' );
		this.btnEdit = row.querySelector( '.btn-edit' );
		this.btnDelete = row.querySelector( '.btn-delete' );

		this.btnDrag = row.querySelector( '.btn-reorder' );
		this.dragOver = false;

		this.editItem = this.editItem.bind( this );
		this.deleteItem = this.deleteItem.bind( this );

		this.addEventListeners();
	}

	addEventListeners() {
		this.btnEdit.addEventListener( 'click', this.editItem, false );
		this.btnDelete.addEventListener( 'click', this.deleteItem, false );
	}

	editItem() {
		this.AdminForm.editData( this.id );
	}

	deleteItem() {
		this.AdminForm.deleteItem( this.id );
	}

	setId() {
		this.id = this.container.getAttribute( 'data-id' );
	}
}