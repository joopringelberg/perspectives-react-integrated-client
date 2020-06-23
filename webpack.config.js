const path = require("path");

// The default port is 5678. Configure a port by providing the environment variable WEBPACK_DEVSERVER_PORT with a value.
// const port = process.env.WEBPACK_DEVSERVER_PORT || 5678;

module.exports = {
  entry:
    { index: path.join(__dirname, "src/index.js" )
  },
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public')
    },
  externals: {},
  watch: false,
  mode: "development",
  target: "electron-renderer",
  plugins: [
    ],
  module: {
    rules: [
      {
        test: /\.crl$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.html$/,
        loader: 'ignore-loader'
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
  // }
  // , devServer: {
  //     publicPath: "/",
  //     contentBase: path.join(__dirname, 'public'),
  //     port: port,
  //     watchContentBase: false
  // }
};
