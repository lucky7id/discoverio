import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {Schema} from './data/schema';
import proxy from 'http-proxy-middleware';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Serve the Relay app
var compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      }
    ]
  },
  output: {filename: 'app.js', path: '/'}
});
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  proxy: {
      '/graphql': 'http://api.yukine.me'
  }
  stats: {colors: true}
});

// const auth = (req, res, next) => {
//     req.setHeader('X-Auth-Token', 'ilovecats');
//     next();
// }
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
// app.use('/graphql', proxy({
//     target: 'http://api.yukine.me',
//     headers: {
//         'X-Auth-Token': 'ilovecats'
//     }
// }))
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

// app.on('proxyReq', (proxyReq, req, res, options) => {
//     proxyReq.setHeader('X-Auth-Token', 'ilovecats');
// })
