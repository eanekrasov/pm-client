define(['backbone', 'models/Message'], function (Backbone, Message) {
  "use strict";

  // Chat user model
  return Backbone.Model.extend({
    defaults: {
      status: "offline",
      id: null,
      name: null,
      avatar: "",
      hidden: false,
      writing: false,
      erasing: false
    },
    initialize: function(){
      this.messages = new Backbone.Collection(null, {model: Message});
    }
  });
});
