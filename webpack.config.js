var path = require('path');
module.exports = {
    context: __dirname,
    entry: "./lib/boom_boy.js",
    output: {
	path: path.resolve(__dirname),
	filename: "bundle.js"
    },
    module: {
	loaders: [
	    {
		test: [/\.js$/],
		exclude: /(node_modules)/,
		loader: 'babel-loader',
		query: {
		    presets: ['es2015']
		}
	    },
	    {
		test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
		loader: "file"
	    }
	]
    },
    externals: {
	"createjs": "createjs",
	"createjs-easeljs": "createjs-easeljs"
    },
    resolve: {
	extensions: [".js", "*"]
    },
    devtool: 'source-map'
};
