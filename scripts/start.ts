import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import {webpackConfig} from './webpack.common';

const compiler = webpack(webpackMerge(webpackConfig, {
    // 模式：开发
    mode: 'development',
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ]
}));

compiler.watch({
    aggregateTimeout: 300
}, (err, status) => {
    if(err || status.hasErrors()){
        console.log(err);
    }

    console.log(status.toString({
        chunks: false,
        colors: true
    }))
});
