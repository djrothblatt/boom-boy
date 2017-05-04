var path = require('path');
module.exports = {
    context: __dirname,
    entry: "./app/boom_boy.js",
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
