/*
 * @Author: lingyong.zeng
 * @Date: 2021-05-11 09:58:54
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-07 15:30:57
 * @Description: 
 * @FilePath: /nextop-http/rollup.config.js
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
            name: 'NextopHttp',
            exports: 'named',
            file: 'lib/index.min.js',
            format: 'umd',
            globals: {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'nprogress': 'NProgress',
                'element-ui': 'ELEMENT',
                'async-validator': 'AsyncValidator',
                '@vantop/vantop-util': 'VantopUtil',
                '@nextop/nextop-core': 'NextopCore',
            }
        },
        // 兼容本地 node_modules 用法
        {
            name: 'NextopHttp',
            exports: 'named',
            file: 'lib/index.cjs.min.js',
            format: 'cjs',
        },
    ],
    external: [
        'vue',
        'vue-router',
        'axios',
        'nprogress',
        'element-ui',
        'async-validator',
        '@vantop/vantop-util',
        '@nextop/nextop-core',
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
}