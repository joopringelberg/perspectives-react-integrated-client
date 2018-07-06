const path = require("path");

// The default port is 5678. Configure a port by providing the environment variable WEBPACK_DEVSERVER_PORT with a value.
const port = process.env.WEBPACK_DEVSERVER_PORT || 5678;

module.exports = {
  entry: path.join(__dirname, "src/index.js" ),
  output: {path: path.join(__dirname, 'public'), filename: "bundle.js"},
  watch: true,
  mode: "development",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "env",
                "react"
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
  },
  resolve: {
    alias: {
      Public: path.resolve( __dirname, "public")
    },
    symlinks: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: port
  }
};
