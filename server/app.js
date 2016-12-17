/**
 * @description 服务入口
 * @author wangzhipei
 * @date 2016/12/15/0015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var multipart = require('connect-multiparty');
var session = require('express-session');
var logger = require('express-logger');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var cors = require('cors');
var fs = require('fs');
var router = require("./router");

module.exports = function(app){
  app.use(express.static(path.join(__dirname, 'public')));
  var dbUrl = 'mongodb://localhost/collect-book';
  mongoose.connect(dbUrl);
  var models_path = __dirname + '/models';
  var walk = function(path) {
    fs
      .readdirSync(path)
      .forEach(function(file){
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);

        if(stat.isFile()){
          if(/(.*)\.(js|coffee)/.test(file)){
            require(newPath)
          }
        }
        else if (stat.isDirectory()){
          walk(newPath);
        }
      })
  };

// 引入所有的model
  walk(models_path);
  app.set('views', './app/views/pages');
  app.set('view engine', 'jade');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser());
  app.use(cookieParser());
  app.use(multipart());
  app.use(session({
    secret: 'collect-book'
    , store: new mongoStore({
      url: dbUrl,
      collection: 'sessions'
    })
  }));
  app.use('/api',cors());

  if ('development' === app.get("env")){
    //能够在browser端打出错误
    app.set('showStackError', true);
    app.use(logger({path:'logs.txt'}));
    app.locals.pretty = true;
    mongoose.set('debug', true);
  }

  router(app);
};
