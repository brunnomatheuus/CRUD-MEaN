module.exports = function () {
  var db = require('./../libs/connect_db')();
  var schema = require('mongoose');

  var task = schema.Schema({
    title: String,
    description: String,
    status: Boolean
  });

  return schema.model('tasks', task);
};
