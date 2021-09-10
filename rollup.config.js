/*
 * @Author: Archy
 * @Date: 2021-09-10 14:57:36
 * @LastEditors: Archy
 * @LastEditTime: 2021-09-10 16:50:46
 * @FilePath: \textures-gradient\rollup.config.js
 * @description: 
 */
import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'textures-gradient',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: ['node_modules/**']
			}),
			uglify(),
			resolve(),
			commonjs()
		]
	},
	{
		input: 'src/main.js',
		external: ['ms'],
		output: [
			{file: pkg.module, format: 'es'}
		],
		plugins: [
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
