/**
 * @description
 * @author wangzhipei
 * @date 2016/12/15/0015.
 */
var User = require('./controller/user');
var Bookrack = require('./controller/admin/bookrack');


module.exports = function (app) {
  app.use(function (req, res, next) {
    var _user = req.session.user;

    if (_user) {
      app.locals.user = _user;
    } else {
      delete app.locals.user;
    }

    return next();
  });

  // User
  app.post('/user/signup', User.singup);   //注册
  app.post('/user/signin', User.singin);   //登录
  app.get('/logout', User.logout); //退出
  app.get("/api/admin/user/list", User.signinRequired, User.adminRequired, User.list);
  app.delete("/api/admin/user/list", User.signinRequired, User.adminRequired, User.del);


  // Bookrack

}
