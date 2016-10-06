var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./plugins/motion/front/src/index.jsx",
	output: {
		path: "./plugins/motion/front/assets",
		filename: "motion.js"
	},
	module: {
		loaders: [
			{
				test: /(\.js|\.jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query:
				{
					presets: ['es2015', 'react']
				}
			},
			{
				test: /(\.scss|\.css)$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!sass')
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=public/fonts/[name].[ext]'
			},
			// {
      //   test: /\.js$/,
      //   loader: 'webpack-replace',
      //   query: {
      //     search: /React'/g,
      //     replace: 'window.React'
      //   }
      // }
		],
		// noParse: [
		// 	/\/react\//g
		// ]
	},
	externals: {
    React: 'react'
	},
	resolve: {
		extensions: ['', '.scss', '.css', '.js', '.jsx', '.json'],
		modulesDirectories: [
			'node_modules',
			path.resolve(__dirname, './node_modules')
		]
	},
	plugins: [
		new ExtractTextPlugin('app.css', { allChunks: true }),
	]
};