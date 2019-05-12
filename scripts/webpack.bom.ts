import {Configuration} from "webpack";
import * as path from 'path';

export const bomWebpackConfig: Configuration = {
    entry: {
        main: path.resolve(__dirname, '../src/admin/index')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build/admin')
    }
};