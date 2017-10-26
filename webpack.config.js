/* eslint-disable strict */

'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'lib'),
	entry: {
		'super-duck': './index.js',
		'super-duck.min': './index.js'
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'superDuck',
		libraryTarget: 'umd'
	},
	externals: ['redux'],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				query: {
					babelrc: false,
					presets: [
						['es2015', {
							modules: false
						}]
					]
				}
			}]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			sourceMap: true,
			comments: false,
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			}
		})
	]
};
