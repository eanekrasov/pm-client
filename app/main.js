// Kick off the application.
require(["messenger", "router", "views/MessengerView", "views/MessageView", "models/Message", "views/UserView", "models/User"], function(messenger, Router, MessengerView, MessageView, Message, UserView, User) {
  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  messenger.router = new Router({app: messenger});
  messenger.init();

  messenger.on('socket:message', function (msg) {
    //console.log(msg);
  }, messenger);

  messenger.on('socket:message:message:sent', function (msg) {
    console.log(msg);
  	var message = new Message(msg);
    messenger.users.get(msg.receiver).messages.push([message]);
    //message.view = new MessageView({context: message});
    //messenger.view.$('.messages').append(message.view.render().el);
  }, messenger);

  messenger.on('socket:message:message:received', function (msg) {
    console.log(msg);
    var message = new Message(msg);
    messenger.users.get(msg.owner).messages.push([message]);
    //message.view = new MessageView({context: message});
    //messenger.view.$('.messages').append(message.view.render().el);
  }, messenger);

  messenger.on('socket:message:connected', function (msg) {
    /*messenger.user = new User({
      id: msg.id,
      name: msg.name,
      avatar: msg.avatar,
      status: 0 // TODO: set status
    });*/
    messenger.user.set({
      name: msg.name,
      avatar: msg.avatar
    });

    for (var i in msg.users) {
      var user = new User(msg.users[i]);
      //user.view = new UserView({context: user});
      //messenger.view.$('.users').append(user.view.render().el);
      messenger.users.push([user]);
      window.messenger = messenger;
    }
  }, messenger);

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in messenger.js.
  Backbone.history.start({ pushState: true, root: messenger.root });
});
