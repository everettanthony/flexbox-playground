/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 * @version: 1.1.0
 */
import { $, $$ } from '../utils/$';
import * as Utils from '../utils/utils';

'use strict';

const cssClasses = {
	ERROR_LABEL: 'error-label',
	INVALID_REQ_FIELD: 'invalid',
	MD_MENU: 'md-select',
	MENU: 'md-select-menu',
	MENU_OPEN: 'active',
	LIST_ITEM: 'md-select-menu-item',
	LIST_ITEM_HOVER: 'keyover',
	REQUIRED_FIELD: 'req',
	SEARCHBAR: 'md-select-searchbar'
};

if ( !String.prototype.startsWith ) {
	String.prototype.startsWith = function( searchString, position ) {
		position = position || 0;
		return this.substr( position, searchString.length ) === searchString;
	};
}

export default class Select {
	constructor( select ) {
		// if on a touch device, default to native select
		if ( 'ontouchstart' in document.documentElement && ( window.matchMedia && window.matchMedia( '(max-width:1024px)' ).matches ) ) {
			return;
		}

		// elements
		this.select = select;
		this.select.classList.add( cssClasses.MD_MENU );
		this.container = this.select.parentNode;
		this.label = this.container.querySelector( 'label' );
		this.menu = null;
		this.searchBar = null;
		this.searchString = '';

		// if this is a multiple select
		this.multiple = this.select.multiple;

		this.hasSearch = this.select.hasAttribute( 'data-search' );

		this.open = false;
		this.currentIndex = 0;

		this.listItems = [];

		this.createMenu = this.createMenu.bind( this );
		this.setMenuPosition = this.setMenuPosition.bind( this );
		this.showMenu = this.showMenu.bind( this );
		this.hideMenu = this.hideMenu.bind( this );
		this.changeHandler = this.changeHandler.bind( this );
		this.focusHanlder = this.focusHanlder.bind( this );
		this.blurHandler = this.blurHandler.bind( this );
		this.keyDownHandler = this.keyDownHandler.bind( this );
		this.bodyClickHandler = this.bodyClickHandler.bind( this );
        this.checkIfRequired = this.checkIfRequired.bind( this );

        this.select.Select = this;

		this.createMenu();
		this.addEventListeners();
	}

	addEventListeners() {
		this.selectPlaceholder.addEventListener( 'click', this.focusHanlder, false );
	}

	// add change event
	setChangeEvent( fn ) {
		this.onChange = fn;
	}

	// create the drop down
	createMenu() {
		let opts = this.select.children;
		let len = opts.length;
		let i;
		let opt;
		let listItem;
		let li;

		this.menu = document.createElement( 'ul' );
		this.menu.classList.add( cssClasses.MENU );

		this.searchBar = document.createElement( 'div' );
		this.searchBar.setAttribute( 'contenteditable', 'true' );
		this.searchBar.classList.add( cssClasses.SEARCHBAR );

		// loop through all of the options and create the ListItems
		for ( i = 0; i < len; i++ ) {
			opt = opts[i];

			listItem = new ListItem( opt, i, this );
			this.listItems.push( listItem );
			this.menu.appendChild( listItem.listItem );
		}

		if ( this.select.selectedIndex > 0 && this.listItems[0].dataVal !== '-1' ) {
			this.select.classList.add( 'not-default' );
		}

		document.body.appendChild( this.menu );

		if ( this.hasSearch ) {
			document.body.appendChild( this.searchBar );
		}
		this.replaceSelect();
		this.setMenuPosition();
	}

	// reset the menu
	reloadMenu() {
		let container;

		if ( this.menu ) {
			container = this.menu.parentNode;
			container.removeChild( this.menu );
			this.listItems = [];
			this.createMenu();
		}
	}

	// set the menu position on the page
	setMenuPosition() {
		const rect = this.selectPlaceholder.getBoundingClientRect();
		this.menu.style.top = rect.bottom + Utils.getWindowScrollPosition() + 'px';
		this.menu.style.left = rect.left + 'px';
		this.menu.style.width = this.selectPlaceholder.offsetWidth + 'px';

		if ( this.hasSearch ) {
			this.searchBar.style.top = ( rect.top + Utils.getWindowScrollPosition() + 10 ) + 'px';
			this.searchBar.style.left = rect.left + 'px';
			this.searchBar.style.width = ( this.selectPlaceholder.offsetWidth - 30 ) + 'px';
		}


	}

	replaceSelect() {
		if ( !this.select.classList.contains( 'hidden' ) ) {
			let selectHeight = window.getComputedStyle( this.select ).getPropertyValue( 'height' );
			let selectWidth = window.getComputedStyle( this.select ).getPropertyValue( 'width' );

			this.selectPlaceholder = document.createElement( 'div' );

			let spanText = document.createElement( 'span' );
			let arrow = document.createElement( 'i' );

			this.selectPlaceholder.appendChild( spanText );
			this.selectPlaceholder.appendChild( arrow );
			arrow.classList.add( 'material-icons' );
			arrow.innerHTML = 'arrow_drop_down';

			this.selectPlaceholder.style.width = selectWidth;
			this.selectPlaceholder.style.height = selectHeight;
			this.selectPlaceholder.style.lineHeight = selectHeight;
			this.selectPlaceholder.classList.add( 'select-placeholder' );
			this.select.parentNode.insertBefore( this.selectPlaceholder, this.select.parentNode.childNodes[0] );
			this.setPlaceholderText();
			this.select.classList.add( 'hidden' );
		} else {
			this.setPlaceholderText();
		}
	}

	setPlaceholderText() {
		let textSpan = this.selectPlaceholder.querySelector( 'span' );
		textSpan.innerHTML = this.getTextValue();
	}

	// show the menu
	showMenu() {
		let me = this;

		//Check to see if there is another Select currently open on the document
		if ( document.Select ) {
			document.Select.hideMenu();
			document.Select = null;
		}

		// always start at the top of the list
		this.menu.scrollTop = 0;

		this.currentIndex = -1;
		this.menu.classList.add( cssClasses.MENU_OPEN );
		this.searchBar.classList.add( cssClasses.MENU_OPEN );
		this.searchString = '';
		this.searchBar.innerHTML = '';
		this.open = true;

		setTimeout( function() {
			document.body.addEventListener( 'keydown', me.keyDownHandler, false );
			document.body.addEventListener( 'click', me.bodyClickHandler, false );

			me.select.blur();

			let slctdEle = me.menu.querySelector( 'li[selected="true"]' );
			if ( slctdEle ) {

				let menuScrollTop = me.menu.scrollTop;
				let menuHeight = me.menu.offsetHeight;

				if ( slctdEle.offsetTop + slctdEle.offsetHeight > menuScrollTop + menuHeight ) {
					me.menu.scrollTop = slctdEle.offsetTop;// menuScrollTop + slctdEle.offsetHeight;
				}

			}

			me.setHighlighted( 0 );

			if ( me.hasSearch ) {
				me.searchBar.focus();
			}

		}, 100 );



		//Set the current global select so that it can be closed if it is open when another show menu on a different element is pressed.
		document.Select = this;

		// disable window from scrolling
		//app.util.disableWindowScroll();
	}

	// hide the menu
	hideMenu() {
		let item;

		this.menu.classList.remove( cssClasses.MENU_OPEN );

		if ( this.hasSearch ) {
			this.searchBar.classList.remove( cssClasses.MENU_OPEN );
		}

		this.open = false;
		this.searchString = '';

		// make sure no listItems ahve the keyover class
		item = this.menu.querySelector( '.' + cssClasses.LIST_ITEM_HOVER );

		if ( item ) {
			item.classList.remove( cssClasses.LIST_ITEM_HOVER );
		}

		// remove event listeners
		document.body.removeEventListener( 'keydown', this.keyDownHandler, false );
		document.body.removeEventListener( 'click', this.bodyClickHandler, false );

		this.filterList();

		// remove the current select from the document.
		document.Select = null;

		// re-enable window scrolling
		//app.util.enableWindowScroll();
	}

	focusHanlder( e ) {
		if ( !this.open ) {
			this.setMenuPosition();
			this.showMenu();
		}
	}

	blurHandler( e ) {
	}

	keyDownHandler( e ) {
		let index = this.currentIndex;
		let keyCode = -1;

		if ( e && e.keyCode ) {
			keyCode = e.keyCode;

			if ( keyCode === 9 ) {
				this.hideMenu();
				this.select.focus();
				//e.preventDefault();
			}

			// move down the list
			else if ( keyCode === 40 ) {
				e.preventDefault();
				this.setHighlighted( 1 );
			}

			// move up the list
			else if ( keyCode === 38 ) {
				e.preventDefault();
				this.setHighlighted( -1 );
			}

			// enter key is clicked
			else if ( keyCode === 13 ) {
				e.preventDefault();

				if ( this.currentIndex === -1 ) {
					this.currentIndex = 0;
				}

				// trigger list item click
				this.listItems[this.currentIndex].selectItem();
			}

			// if escape key is clicked
			else if ( keyCode === 27 ) {
				e.preventDefault();
				this.hideMenu();
			}

			// anyother key is pressed
			else {
				if ( this.hasSearch ) {

					if ( keyCode === 8 ) {
						this.searchString = this.searchString.substr( 0, this.searchString.length - 1 );
					} else {
						if ( e.key.length === 1 && /^[a-zA-Z0-9 _]+$/.test( e.key ) ) {
							this.searchString += e.key;
						}
					}

					this.filterList();

				} else {
					e.preventDefault();
				}

			}
		}
	}

	filterList() {
		if ( this.hasSearch && this.listItems.length > 0 ) {
			let fndCntr = 0;
			let fndItem = null;
			let ul = this.listItems[0].listItem.parentNode;
			ul.classList.add( 'hidden' );
			for ( var i = 0; i < this.listItems.length; i++ ) {
				let thisItem = this.listItems[i].listItem;
				if ( thisItem.innerText.toUpperCase().startsWith( this.searchString.toUpperCase() ) || thisItem.getAttribute( 'selected' ) === 'true' ) {
					thisItem.classList.remove( 'hidden' );

					if ( fndCntr < 2 && thisItem.innerText.toUpperCase().startsWith( this.searchString.toUpperCase() ) ) {
						fndItem = thisItem;
						fndCntr += 1;
					}

				} else {
					thisItem.classList.add( 'hidden' );
				}
			}
			ul.classList.remove( 'hidden' );
			if ( fndCntr === 1 ) {
				fndItem.click();
			}
		}
	}

	setHighlighted( direction ) {
		//Find the selected item and set the current index.  Used upon show menu.
		if ( direction === 0 ) {
			for ( let i = 0; i < this.listItems.length; i++ ) {
				let thisItem = this.listItems[i].listItem;
				if ( thisItem.getAttribute( 'selected' ) === 'true' ) {
					this.currentIndex = i;
					break;
				}
			}
		} else {

			for ( let i = this.currentIndex + direction; i < this.listItems.length && i >= 0; i += direction ) {
				let thisItem = this.listItems[i].listItem;
				if ( !thisItem.classList.contains( 'hidden' ) ) {
					if ( this.currentIndex >= 0 ) {
						this.listItems[this.currentIndex].listItem.classList.remove( cssClasses.LIST_ITEM_HOVER );
					}
					this.currentIndex = i;
					thisItem.classList.add( cssClasses.LIST_ITEM_HOVER );

					let menuScrollTop = this.menu.scrollTop;
					let menuHeight = this.menu.offsetHeight;

					if ( direction > 0 ) {
						// check scroll top
						if ( thisItem.offsetTop + thisItem.offsetHeight > menuScrollTop + menuHeight ) {
							this.menu.scrollTop = menuScrollTop + thisItem.offsetHeight;
						}
					} else {
						// check scroll top
						if ( thisItem.offsetTop < menuScrollTop ) {
							this.menu.scrollTop = menuScrollTop - thisItem.offsetHeight;
						}
					}

					break;
				}
			}
		}

	}

	changeHandler( e ) {
		this.setPlaceholderText();

		if ( this.onChange && typeof this.onChange === 'function' ) {
			this.onChange();
		}
	}

	bodyClickHandler( e ) {
		if ( e && e.target && ( e.target === this.select || e.target.classList.contains( cssClasses.LIST_ITEM ) || e.target.classList.contains( 'btn-ripple-container' ) || e.target.classList.contains( 'btn-ripple-element' ) || e.target.classList.contains( 'md-select-searchbar' ) ) ) {
			// let the list item click event handle this
		}
		else {
			// clicked outside of the menu, hide the menu
			this.hideMenu();
		}
	}

	checkForValue() {

	}

	checkIfRequired() {
		let isValid = true;
		let selected = this.menu.querySelector( '[selected="true"]' );
		let errorLbl = this.container.querySelector( '.' + cssClasses.ERROR_LABEL );
		let lbl;

		// remove any previous error messages
		if ( errorLbl ) {
			this.container.removeChild( errorLbl );
		}

		// if we don't have a selected option and this is a required field
		if ( ( !selected || selected.getAttribute( 'data-val' ) === '-1' ) && this.select.classList.contains( cssClasses.REQUIRED_FIELD ) ) {
			lbl = document.createElement( 'span' );
			lbl.classList.add( cssClasses.ERROR_LABEL );
			lbl.textContent = 'Required field.';
			this.container.appendChild( lbl );
			this.select.classList.add( cssClasses.INVALID_REQ_FIELD );
			isValid = false;
		}

		// if we're all good, rmeove the invalid class
		else {
			this.select.classList.remove( cssClasses.INVALID_REQ_FIELD );
		}

		return isValid;
	}

	setValue( value ) {
		let li = this.menu.querySelector( '[data-val="' + value + '"]' );
		let i = 0;
		let len = this.listItems.length;
		let listItem = null;

		if ( li ) {
			for ( i = 0; i < len; i++ ) {
				listItem = this.listItems[i];

				if ( listItem.listItem === li ) {
					if ( !listItem.listItem.getAttribute( 'selected' ) ) {
						listItem.selectItem();
					}
				}
			}
		}
	}

	getValue() {
		if ( !this.multiple ) {
			return this.select.options[this.select.selectedIndex].value;
		}
	}

	getTextValue() {
		if ( !this.multiple ) {
			if ( this.select.selectedIndex >= 0 ) {
				return this.select.options[this.select.selectedIndex].text;
			} else {
				return '';
			}
		}
	}
}

class ListItem {
	constructor( opt, index, select ) {
		this.listItem = document.createElement( 'li' );
		this.select = select;
		this.index = index;
		this.isRequired = select.select.classList.contains( 'req' );
		this.dataVal = opt.value;
		this.isDefault = opt.value === '-1';

		this.listItem.classList.add( cssClasses.LIST_ITEM );
		this.listItem.classList.add( 'btn-ripple' );
		this.listItem.textContent = opt.textContent;
		this.listItem.setAttribute( 'data-val', opt.value );

		if ( this.isDefault ) {
			this.listItem.classList.add( 'default-item' );
		}

		if ( opt.selected ) {
			this.listItem.setAttribute( 'selected', 'true' );
		}

		this.selectItem = this.selectItem.bind( this );

		this.addEventListeners();

		return this;
	}

	addEventListeners() {
		this.listItem.addEventListener( 'click', this.selectItem, false );
	}

	selectItem( e ) {
		let selected;

		// if clicking the currently selected item
		if ( this.listItem.getAttribute( 'selected' ) === 'true' ) {
			if ( !this.isRequired ) {
				this.listItem.removeAttribute( 'selected' );

				if ( !this.select.multiple ) {
					this.select.select.value = '';
				}

				let defaultItem = this.select.select.querySelector( 'option[value="-1"]' );
				if ( defaultItem ) {
					this.select.select.classList.remove( 'not-default' );
					defaultItem.setAttribute( 'selected', 'selected' );
					this.select.select.value = '-1';
				}

				this.select.checkIfRequired();
			}
			else {
				// hide the menu if this is not a multiple select
				if ( !this.select.multiple ) {
					this.select.hideMenu();
				}
			}

		}
		else {
			// check if an item is already selected
			selected = this.select.menu.querySelector( '[selected="true"]' );

			// unselect a previously selected item if this is not a multiple select
			if ( selected && !this.select.multiple ) {
				selected.removeAttribute( 'selected' );
			}

			// select the selected item
			this.listItem.setAttribute( 'selected', 'true' );

			// update the selected element
			if ( !this.select.multiple ) {
				this.select.select.value = this.listItem.getAttribute( 'data-val' );
				this.select.checkIfRequired();
			}

			this.select.select.classList.remove( cssClasses.INVALID_REQ_FIELD );

			// hide the menu if this is not a multiple select
			if ( !this.select.multiple ) {
				this.select.hideMenu();
			}
		}

		if ( this.select.select.value !== '-1' ) {
			this.select.select.classList.add( 'not-default' );
		}

		this.select.changeHandler();

		if ( e ) {
			e.stopPropagation();
		}
	}
}