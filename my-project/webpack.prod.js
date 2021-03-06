'use strict';
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')  //CSS压缩  官方准备弃用
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");  // CSS压缩
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            // new OptimizeCSSAssetsPlugin({
            //     assetNameRegExp: /\.css$/g,
            //     cssProcessor: require('cssnano')
            // }),
            new CssMinimizerPlugin(),
        ]
    },
    module:{
        rules: [
            {
                test: /.html$/,
                use: 'inline-html-loader'
            },
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins:[
                                    require('autoprefixer')({
                                        browsers: ['last 2 version', '>1%', 'ios 7']
                                    })
                                ]
                            } 
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,  //rem相对于px转换单位  1个rem代表75px
                            remPrecision: 8   //px转rem小数点位数
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano')
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),  // 模版所在位置
            filename: 'index.html', // 打包出来html文件名字
            chunks: ['index'], // html使用哪些chunks
            inject: true, // 打包出来chunk css js 会自动注入点 html 中来
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        // contentBase: './dist', //服务基础目录
        static: './dist',
        hot: true,
    }
}   