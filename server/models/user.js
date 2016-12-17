/**
 * @description
 * @author wangzhipei
 * @date 2016/12/15/0015.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User',UserSchema);

module.exports = User;
