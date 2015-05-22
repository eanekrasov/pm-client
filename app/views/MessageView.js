define(['../messenger', 'backbone'], function(messenger, Backbone) {
  "use strict";

  var MessageView = Backbone.View.extend({
    className: 'message-wrap',
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      this.template =  $((messenger.user.id == this.context.id) ? '#message-user-template' : '#message-contact-template').html();
      return this;
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      this.$el.addClass((messenger.user.id == this.context.id) ? 'message-wrap-user' : 'message-wrap-contact');
      return this;
    }
  });

  return MessageView;
});


