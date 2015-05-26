define(function (require, exports, module) {
  "use strict";
  var Backbone = require('backbone'),
      app = require('./app'),
      UsersView = require('views/UsersView'),
      MessengerView = require('views/MessengerView');
  // Defining the application router.
  var Router = Backbone.Router.extend({
    routes: {
      "*page": "index"
    },
    index: function () {
      app.init();
      app.view = new MessengerView({context: app});
      $('body').append(app.view.el);
      app.view.render(); // Need render after appending element into DOM
    }
  });

  return Router;
});
