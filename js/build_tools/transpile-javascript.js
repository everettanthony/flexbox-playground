'use strict';

const mkdirp = require( 'mkdirp' );
const fs = require( 'fs' );
const path = require( 'path' );
const babel = require( 'babel-core' );
const UglifyJS = require( 'uglify-js' );

const inDir = path.join( __dirname, '..', 'app', 'dev' );
const outDir = path.join( __dirname, '..', 'app', 'dist' );

// Standalone folders for specific pages
const stadaloneFolders = [
	'admin',
    'pages'
];

// Create files and directories for standalone files
//  that are not concatenated
stadaloneFolders.forEach( folder => {
    const dir = `${inDir}\\${folder}\\`;

    const walk = dir => {
        const list = fs.readdirSync( dir );

        list.forEach( file => {
            dir += '\\';
            dir = dir.replace( /\\\\/g, '\\' );

            let filePath = dir + file;

            const stat = fs.statSync( filePath );

            if ( stat && stat.isDirectory() ) {
                return walk( filePath );
            }

            // do a replace on jsx in case React is used
            const outFilename = dir.replace( inDir, outDir ) + file;
            const code = babel.transformFileSync( filePath, {} ).code;
            const codeMin = UglifyJS.minify( code );

            mkdirp( path.dirname( `${outFilename}` ), err => {
                if ( err ) {
                    throw err;
                }

                fs.writeFile( `${outFilename}`, codeMin.code, 'utf-8', rsp => { } );
            } );
        } );
    };

    walk( dir );
} );