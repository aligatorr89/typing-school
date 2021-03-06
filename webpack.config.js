const path = require('path');
const environment = require('./environment');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    "bundle": path.join(environment.root, "src", "app"),
    "worker": path.join(environment.root, "src", "web-workers"),
    "sw": path.join(environment.root, "src", "service-workers")
  } , // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    // options related to how webpack emits results
    path: path.resolve(environment.root, "public", "js"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "[name].js", // string
    // the filename template for entry chunks
    publicPath: environment.publicPath, // string
    // the url to the output directory resolved relative to the HTML page
    /*library: "MyLibrary", // string,
    // the name of the exported library
    libraryTarget: "umd", // universal module definition*/
    // the type of the exported library
    /* Advanced output configuration (click to show) */
    /* Expert output configuration (on own risk) */
  }
};
