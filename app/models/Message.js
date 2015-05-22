define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  // Chat message model
  var Message = Backbone.Model.extend({
    defaults: {
      owner: 0,
      receiver: 0,
      text: "",
      time: ""
    },
    initialize: function(){
      this.on("change:text", function(model){
        //model.get("message");
      });
    }
  });

  module.exports = Message;
});
