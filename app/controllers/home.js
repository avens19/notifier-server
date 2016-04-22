var express = require('express'),
  router = express.Router(),
  azure = require('azure'),
  Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});

router.post('/', function (req, res) {
  var notificationHubService = azure.createNotificationHubService('notifier', process.env.ENDPOINT_ADDRESS);
  var payload = req.body;
  notificationHubService.gcm.send(null, payload, function(error){
    if(!error){
      res.send({ message: 'sent!' });
      return;
    }
    res.status(500, 'boo!');
  });
});
