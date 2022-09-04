/*
 * @Author: lingyong.zeng
 * @Date: 2022-05-07 17:03:10
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-29 11:21:45
 * @Description: 
 * @FilePath: /nextop-core/rollup.config.js
 */
const path = require('path');
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: path.resolve(__dirname, 'src/index.js'),
    output: [
        {
            name: 'NextopCore',
            exports: 'named',
            file: 'lib/index.min.js',
            format: 'umd',
            globals: {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'dayjs': 'dayjs',
                'qs': 'Qs',
                '@master_vantop/vantop-util': 'VantopUtil',
                '@nextop/nextop-http': 'NextopHttp'
            }
        },
        {
            // 兼容本地 node_modules 用法
            name: 'NextopCore',
            exports: 'named',
            file: 'lib/index.cjs.min.js',
            format: 'cjs'
        }
    ],
    external: [
        'vue',
        'vue-router',
        'axios',
        'dayjs',
        'qs',
        '@master_vantop/vantop-util'
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({ 
            babelHelpers: 'runtime', 
            exclude: 'node_modules/**',
            presets: [
                "@babel/preset-env",
                "@babel/typescript"
            ],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/proposal-object-rest-spread",
                ["@babel/plugin-transform-runtime", { "regenerator": true }]
            ]
        }),
        terser()
    ]
};