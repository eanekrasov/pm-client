define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var Message = require("./Message");

  // Chat user model
  var User = Backbone.Model.extend({
    defaults: {
      status: "offline", // TODO: get from local storage or something
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

  module.exports = User;
});
