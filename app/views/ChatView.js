define(['backbone', './MessagesView', 'jquery-ui'], function(Backbone, MessagesView, jui) {
  "use strict";

  var ChatView = Backbone.View.extend({
    className: 'chat',
    events: {
      'click .send': 'send',
      'keypress .input': 'inputKeyPress'
    },
    initialize: function(options){
      this.template = $('#chat-template').html();
      this.model = options.context;
      this.context = this.model.attributes;
      //ChatView.__super__.initialize.apply(this, arguments);
      this.model.messages.on('add', this.onAdd, this);
      return this;
    },
    onAdd: function () {
      var el = this.$('.input')[0];
      el.scrollTop = el.scrollHeight;
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      $(this.el).draggable({handle: '.header'});
      this.messagesView = new MessagesView({collection: this.model.messages, el: this.$('.messages')[0]});
      return this;
    },
    send: function () {
      app.trigger('socket:send', {
        event: 'message',
        receiver: this.model.id,
        message: this.$('.input').val()
      });
      this.$('.input').val('');
    },
    inputKeyPress: function(e) {
      if (e.which == '13') { // enter
        this.send();
      }
    }
  });
  return ChatView;
});


