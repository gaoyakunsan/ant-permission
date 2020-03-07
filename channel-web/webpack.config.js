var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

let devServer = {}
let plugins = [
    new webpack.DefinePlugin({
        ISDEV: JSON.stringify(process.env.NODE_ENV === 'development'), // 返回是否是开发模式
    }),
    new HtmlWebpackPlugin({
        template: "./src/main/resources/templates/index.html",
/*
        favicon: "./src/main/resources/static/rescource/image/favicon.ico",
*/
        inject: true
    }),
]
if (process.env.NODE_ENV === 'development') {
    devServer = {
        contentBase: path.join(__dirname, './src/main/resources/templates/dist'),
        host:'localhost',
        port:'8000',
        open:true, //自动拉起浏览器
        hot:true,//热加载
        //hotOnly:true
    }
    plugins.push(new webpack.HotModuleReplacementPlugin())
}



module.exports = {
    entry: './src/main/resources/static/index.js',
    output: {
        path: path.resolve(__dirname, './src/main/resources/templates/dist'),
        publicPath: process.env.NODE_ENV === 'development' ? '' : './templates/dist/',
        //filename: 'build.[chunkhash].js'
        filename: process.env.NODE_ENV === 'development' ? 'build.js' : 'build.[chunkhash].js'
    },
    module: {
        rules: [
          // {
          //       test: /\.vue$/,
          //       loader: 'vue-loader',
          //       options: {
          //           loaders: {
          //               // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          //               // the "scss" and "sass" values for the lang attribute to the right configs here.
          //               // other preprocessors should work out of the box, no loader config like this necessary.
          //               'scss': 'vue-style-loader!css-loader!sass-loader',
          //               'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          //           }
          //           // other vue-loader options go here    小颖在这里http://www.cnblogs.com/yingzi1028/p/6925387.html
          //
          //       }
          //   },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // enforce: 'pre',
                use: [{
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"],
                    plugins: ['@babel/plugin-proposal-object-rest-spread', "@babel/plugin-proposal-function-bind", '@babel/plugin-proposal-class-properties']
                  }
                },
                // {
                //   loader: 'eslint-loader', // 指定启用eslint-loader
                //   options: {
                //     formatter: require('eslint-friendly-formatter'),
                //     emitWarning: false
                //   }
                // }
              ]
            },
//            {
//                test: /.jsx$/, //使用loader的目标文件。这里是.jsx
//                loader: 'babel-loader'
//            },
//            {
//                test: /\.js$/,
//                loader: 'babel-loader',
//                exclude: /node_modules/,
//                query: {
//                    presets: ['es2015', 'stage-0']
//                }
//            },
            {
                test: /\.(scss|css|less)$/,
                exclude: /node_modules/,  //这个用于你自己的样式处理，所以去除掉node_modules里的项
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true,   //采用className={styles.xxx}的方式进行添加样式
                        localIdentName: '[local]--[hash:base64:5]'
                    }
                }, {
                    loader: "less-loader",
                }]
            },
            {
                test: /\.(scss|css|less)$/,
                include: /node_modules/,  //这个是用于antd 必须要处理node_modules
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "less-loader",
                    options: {
                        modifyVars: {   //自定义主题色
                            "primary-color": "#6E54B0",
                            "link-color": "#6E54B0",
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
    	extensions: ['.js', '.jsx', '.json'],
	  },
    performance: { hints: false },
    plugins: plugins,
    devServer
}
