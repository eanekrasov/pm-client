define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var Message = require("./Message");

  // Chat user model
  var User = Backbone.Model.extend({
    defaults: {
      status: 0,
      id: null,
      name: null,
      avatar: "",
    },
    initialize: function(){
      this.messages = new Backbone.Collection(null, {model: Message});
    }
  });

  module.exports = User;
});
