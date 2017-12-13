'use strict';

const mkdirp = require( 'mkdirp' );
const fs = require( 'fs' );
const path = require( 'path' );
const autoprefixer = require( 'autoprefixer' );
const postcss = require( 'postcss' );

const timeStart = new Date();

console.log( 'Starting Sass compilation in transpile-sass.js...' );

const inPath = path.join( __dirname, '..', '..', 'css', 'sass' );
const outPath = path.join( __dirname, '..', '..', 'css' );

const files = [
    {
        in: path.join( inPath, 'styles.scss' ),
        out: path.join( outPath, 'styles.css' )
    }
];

const CleanCSS = require( 'clean-css' );
const sass = require( 'node-sass' );

files.forEach( file => {
    sass.render( {
        file: file.in
    }, ( err, result ) => {
        if ( err ) {
            throw err;
        }

        mkdirp( path.dirname( file.out ), err => {
            if ( err ) {
                throw err;
            }

            postcss( [ autoprefixer ] ).process( result.css ).then( rsp => {
                const output = new CleanCSS().minify( rsp.css );
                fs.writeFile( file.out, output.styles, 'utf-8', rsp => {} );

                const timeEnd = new Date();
                const timeDiff = parseFloat( ( timeEnd - timeStart ) / 1000 ).toFixed( 4 );

                console.log( `Sass compilation complete. Time elapsed: ${timeDiff} seconds.` );
            } );
        } );
    } );
} );