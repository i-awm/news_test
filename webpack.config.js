const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

config = {
    mode:'production',
    entry:{
        index:path.resolve(__dirname,'./src/js/index.js'),
        detail:path.resolve(__dirname,'./src/js/detail.js'),
        collections:path.resolve(__dirname,'./src/js/collection.js')
    },
    output:{
        path:path.resolve(__dirname+'/dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname,'node_modules'),
                query:{
                    'presets':['@babel/preset-env']
                }
            },
            {
                test:/\.tpl$/,
                loader:'ejs-loader'
            },
            
            {
                test:/\.scss$/,
                use:[
                    {
                        loader:miniCssExtractPlugin.loader,
                        options:{ //热更新
                            hmr:process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:function(){
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|jpg|jpeg|gif|ico)$/i,
                loader:[
                    // 'file-loader',
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins:[
        new uglify(),
        new htmlWebpackPlugin({
            minify:{
                removeComments: true,
                collapseWhitespace: true
            },
            filename:'index.html',
            template:path.resolve(__dirname,'src/index.html'),
            title:'js++新闻头条',
            chunksSortMode:'manual',
            chunks:['index'],
            excludeChunks:['node-modules'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify:{
                removeComments: true,
                collapseWhitespace: true
            },
            filename:'detail.html',
            template:path.resolve(__dirname,'src/detail.html'),
            title:'新闻详情',
            chunksSortMode:'manual',
            chunks:['detail'],
            excludeChunks:['node-modules'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify:{
                removeComments: true,
                collapseWhitespace: true
            },
            filename:'collections.html',
            template:path.resolve(__dirname,'src/collections.html'),
            title:'我的收藏',
            chunksSortMode:'manual',
            chunks:['collections'],
            excludeChunks:['node-modules'],
            hash: true
        }),
        new miniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],
    devServer:{
        watchOptions:{
            ignored:/node_modules/
        },
        host:'localhost',
        port:3000
    }
}

module.exports = config;

/**
 * npm i webpack webpack-cli -D  
 * npm i webpack-dev-server -D
 * 
 * css  npm i css-loader style-loader sass-loader node-sass postcss-loader -D
 * npm i autoprefixer -D
 * 
 * js npm i babel-loader babel-core babel-preset-latest -D
 * 
 * html npm i html-loader -D 
 * 
 * 文件 npm i file-loader url-loader -D
 * 
 * ejs tpl npm i ejs ejs-loader -D
 * 
 * npm install image-webpack-loader --save-dev
 * 
 * 插件
 *  npm i uglifyjs-webpack-plugin -D
 *  npm i mini-css-extract-plugin -D
 *  npm i html-webpack-plugin -D
 * 
 */