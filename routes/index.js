var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();

/* GET home page. */
router.get('/', function(req, res, next) {
  model.find(null, function(err, data) {
    if(err){
      throw err;
    }

    res.render('index', { title: 'Express', tasks: data});
  })
});

router.post('/add', function(req, res, next) {
  var body = req.body;
  body.status = false;
  model.create(body, function(err, data){
    if(err){
      throw err;
    }
    res.redirect('/')
  })
});

router.get('/turn/:id', function(req, res, next) {
  var id = req.params.id;
  model.findById(id, function(err, data){
    if(err){
      throw err;
    }
    data.status = !data.status;
    data.save(function() {
      res.redirect('/');
    })
  });
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  model.findById(id, function(err, data) {
    if(err){
      throw err;
    }
    model.remove({"_id" : data}, function (err) {
      if(err){
        throw err;
      }
      res.redirect('/');
    });
  })
});


module.exports = router;