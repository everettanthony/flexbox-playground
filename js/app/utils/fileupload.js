export default class FileUpload {
    static get DEFAULT_HANDLER() {
        return '/img/uploadHandler.ashx';
    }

    static get DOC_HANDLER() {
        return '/admin/uploadDocHandler.ashx';
    }

    static upload( file, isImg, handler, headers ) {
        const fileName = file.name;
        const fileType = file.type;
        const fileSize = file.size;
        const reader = new FileReader();

        return new Promise( ( resolve, reject ) => {
            // confirm this file is allowed
            if ( !isImg || /^image\//.test( fileType ) ) {
                reader.onload = e => {
                    const xhr = new XMLHttpRequest();

                    xhr.open( 'POST', handler, true );
                    xhr.setRequestHeader( 'X-File-Name', fileName );
                    xhr.setRequestHeader( 'X-File-Size', fileSize );
                    xhr.setRequestHeader( 'X-File-Type', fileType );

                    for ( const key in headers ) {
                        xhr.setRequestHeader( key, headers[key] );
                    }

                    xhr.addEventListener( 'load', response => {
                        if ( response.target.response ) {
                            const rsp = JSON.parse( response.target.response );

                            if ( rsp.success ) {
                                resolve( rsp );
                            }
                            else {
                                reject( rsp );
                            }
                        }
                    }, false );

                    xhr.send( file );
                };

                reader.readAsDataURL( file );
            }
            else {
                reject( 'Only .jpg, .jpeg, and .png files are allowed.' );
            }
        } );
    }
}