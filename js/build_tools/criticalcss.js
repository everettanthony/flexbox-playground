'use strict';

const mkdirp = require( 'mkdirp' );
const fs = require( 'fs' );
const path = require( 'path' );
const critical = require( 'critical' );

critical.generate( {
    inline: true,
    base: './',
    src: 'critical.html',
    dest: 'criticalcss.html',
    minify: true,
    width: 1800,
    height: 950
} );