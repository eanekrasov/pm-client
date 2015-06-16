define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  // Chat message model
  module.exports = Backbone.Model.extend({
    defaults: {
      owner: 0,
      receiver: 0,
      text: "",
      time: "",
      avatar: ""
    },
    initialize: function(){
      this.on("change:text", function(model){
        //model.get("message");
      });
    }
  });
});
