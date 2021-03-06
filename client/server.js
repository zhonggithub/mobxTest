/**
* @Author: Zz
* @Date:   2016-09-09 10:09:20
* @Email:  quitjie@gmail.com
* @Project: hms-group-web
* @Last modified by:   Zz
* @Last modified time: 2016-10-09T20:23:25+08:00
*/
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const fs = require('fs');
const webpackConfig = require('./webpack.config');
const moment = require('moment');
//const swig  = require('swig');
const React = require('react');
const Router = require('react-router');
//const routes = require('./src/routes');
const bodyParser = require('body-parser');
import fetch from 'node-fetch';
import { config } from './src/common';

const app = express();
app.set('trust proxy', 1) // trust first proxy

const compiler = webpack(webpackConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(webpackDevMiddleware(compiler, {
  publicPath : webpackConfig.output.publicPath,
  status: {
    colors: true
  }
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/group/api/groups/:groupId/users', (req, res, next) => {
  const total = 12;
  const data = {
    total,
    items: [],
  };
  for (let i = 0; i < total; i += 1) {
    data.items.push({
      id: Math.random(),
      name: `${Math.random()}test${i}`,
      tel: `${Math.random()}`
    });
  }
  res.writeHead(200, { 'Content-type': 'application/json'});
  res.write(JSON.stringify({ code: 200, message: 'success', data, }))
  res.end();
});

app.use('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(`${compiler.outputPath}index.html`,
  (err, rst) => {
    if(err){
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.end(rst);
  });
});

app.listen(3001, () => {
  console.log('listen 3001');
});
