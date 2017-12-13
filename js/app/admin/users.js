/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */
import { $, $$ } from '../utils/$';
import doFetch from '../utils/fetch';
import AdminForm from './form';

( function( doc ) {
    'use strict';

    const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
    let roleId = -1;
    let userId = GUID_EMPTY;

    let adminForm = new AdminForm( {
        labelItemText: '',
        labelItemsText: '',
        loadItems: {
            fn: 'profilesGetJsonForAdmin',
            params: _ => {
                return {
                    profileId: -1,
                    userId: '',
                    roleId: roleId,
                    mlsId: '',
                    mlsOfficeId: '',
                    isActive: false
                };
            },
            rowTmpl: '<div class="admin-grid-row{{rowClass}}" data-id="{{profileId}}">' +
                     '<div class="admin-grid-col admin-grid-col-primary">{{displayName}}</div>' +
                     '<div class="admin-grid-col admin-grid-col-primary">{{role}}</div>' +
                     '<div class="admin-grid-col admin-grid-col-primary">{{isActive}}</div>' +
                     '<div class="admin-grid-col"><button class="btn btn-ripple btn-edit">Edit</button><button class="btn btn-ripple btn-delete">Delete</button></div>' +
                     '</div>',
            rowTmplHeaders: ['', 'Name', 'Role', 'Is Active'],
            rowTmplProps: ['profileId', 'displayName', 'role', 'isActive']
        },
        dragDropForOrder: false,
        editItem: {
            fn: 'profilesGetJsonForAdmin',
            params: {
                profileId: -1,
                userId: '',
                roleId: roleId,
                mlsId: '',
                mlsOfficeId: '',
                isActive: false
            },
            itemId: 'profileId',
            callback: editItemCallback
        },
        saveItem: {
            fn: 'profileSave',
            itemId: 'profileId',
            sendAsString: true,
            updateSortOrderFn: '',
            callback: saveItemCallback
        },
        deleteItem: {
            fn: 'profileDelete',
            itemId: 'profileId'
        },
        back: {
            fn: back
        },
        additionalProperties: {
            userId: GUID_EMPTY,
            profilePic: ''
        }
    } );

    const ddlFilterRole = $( '#ddl-filter-role' );
    const tbPwdConfirm = $( '#tb-pwd-confirm' );
    const ddlRole = $( '#ddl-role' );

    ddlFilterRole.Select.setChangeEvent( _ => {
        roleId = parseInt( ddlFilterRole.Select.getValue() );

        if ( roleId === -999 ) {
            roleId = -1;
        }

        adminForm.loadItems();
    } );

    async function editItemCallback( obj ) {
        try {
            tbPwdConfirm.value = obj.pwd;
            adminForm.formEdit.checkActiveInputs();

            userId = obj.userId;

            const rsp = await doFetch( '/api/membership/rolesGetJson', {
                body: {
                    roleId: -1,
                    role: '',
                    userId: userId
                }
            } );

            if ( rsp.success ) {
                const data = rsp.obj;

                if ( data.length === 1 ) {
                    const role = data[0];
                    ddlRole.Select.setValue( role.roleId );
                }
            }
            else {
                console.log( `Error loading user role ${rsp.msg}` );
            }
        }
        catch ( err ) {
            console.log( `Error loading user role ${err}` );
        }
    }

    async function saveItemCallback( fn ) {
        try {
            const rid = parseInt( ddlRole.Select.getValue() );

            const rsp = await doFetch( '/api/membership/userAssignRoleByProfile', {
                body: {
                    profileId: adminForm.itemId,
                    roleId: rid
                }
            } );

            if ( rsp.success ) {
                if ( fn && typeof fn === 'function' ) {
                    fn();
                }
            }
            else {
                console.log( `Error saving user role - ${rsp.msg}` );
            }
        }
        catch ( err ) {
            console.log( `Error saving user role - ${err}` );
        }
    }

    function back() {
        userId = GUID_EMPTY;
    }

}( document ) );