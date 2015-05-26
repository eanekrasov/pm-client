define(['../app', 'backbone', '../templates'], function (app, Backbone, templates) {
  "use strict";

  var MessageView = Backbone.View.extend({
    className: 'message-wrap',
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      return this;
    },
    render: function () {
      this.$el.html(_.template((app.user.id == this.context.owner) ? templates.message_user : templates.message_contact, this.context));
      this.$el.addClass((app.user.id == this.context.owner) ? 'message-wrap-user' : 'message-wrap-contact');
      return this;
    }
  });

  return MessageView;
});


