const path = require( 'path' );
const webpack = require( 'webpack' );

const adminCommonsPlugin = new webpack.optimize.CommonsChunkPlugin( {
    name: 'commonChunks',
    filename: 'common.js'
} );

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin( {
    name: 'commonChunks',
    filename: 'common.js'
} );

module.exports = [
	{
        entry: {
			users: './js/app/admin/users.js'
		},
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, 'js/app/dev/admin/' )
		},
		plugins: [adminCommonsPlugin]
	},
	{
		entry: {
			home: './js/app/pages/home.js',
			login: './js/app/pages/login.js'
		},
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, 'js/app/dev/pages/' )
		},
		plugins: [commonsPlugin]
	}
];