const terserPlugin = require("terser-webpack-plugin");

module.exports = {
  module: {
    loaders: [
      // {
      //   test: /\.css$/,
      //   loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
      // },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
    rules: [{
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new terserPlugin({ parallel: true, minify: true })
    ]
  }
}