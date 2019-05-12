import {Configuration} from 'webpack'
const fs = require('fs');
const path = require('path');

// 不打包node_modules文件夹
let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const webpackConfig: Configuration = {
    // 入口文件
    entry: {
       main: path.resolve(__dirname, '../app/index.ts')
    },
    // 输出路径
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build/server')
    },
    // 模式
    mode: 'none',
    // 启用source-map
    devtool: 'source-map',
    // 生成node环境的代码
    target: "node",
    resolve: {
        // 默认文件后缀
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            // ts-loader
            {
                test: /.ts$/,
                loader: "awesome-typescript-loader"
            }
        ]
    },
    // 忽略node_modules目录下的文件
    externals: nodeModules
};

module.exports = webpackConfig;