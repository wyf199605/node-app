import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import {webpackConfig} from "./webpack.common";


const compiler = webpack(webpackMerge(webpackConfig, {
    // 模式：开发
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {

    }
}), (err, status) => {
    if(err || status.hasErrors()){
        console.log(err);
    }

    console.log(status.toString({
        chunks: false,
        colors: true
    }))
});
