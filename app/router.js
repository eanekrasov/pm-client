define(['backbone', './messenger', 'views/UsersView', 'views/ChatView', 'views/MessengerView', 'views/MessagesView', 'models/Message'], function(Backbone, messenger, UsersView, ChatView, MessengerView, MessagesView, Message) {
  "use strict";

  // Defining the application router.
  var Router = Backbone.Router.extend({
    routes: {
      "*page": "index"
    },
    initialize: function (options) {
    	this.messenger = options.app;
    },
    chat: function (model) {
      // TODO: fetch messages from server
    },
    index: function(page) {
	    window.view = new MessengerView({context: messenger});
	    $('body').append(window.view.el);
      window.view.render();
      //window.messages = new Backbone.Collection(null, {model: Message}),
      //window.view2 = new MessagesView({collection: window.messages});
      //$('body').append(window.view2.render().el);
    }
  });

  return Router;
});
