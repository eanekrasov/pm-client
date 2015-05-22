define(['backbone', 'models/Message', 'models/User'], function(Backbone, Message, User) {
  "use strict";

  return _.extend({
    users: new Backbone.Collection(null, {model: User}),
  	messages: new Backbone.Collection(null, {model: Message}),
  	init: function () {
      messenger.on("eventname", function () {
      });
		},
  }, Backbone.Events);
});
