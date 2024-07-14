const path = require('path');

module.exports = {
  // Other configuration options...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/videos',
            },
          },
        ],
      },
      // Other rules...
    ],
  },
  // Other configuration options...
};
