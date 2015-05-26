define(['backbone', './ActivePersonView', './MessagesView', '../app', '../models/Message', '../templates'], function (Backbone, ActivePersonView, MessagesView, app, Message, templates) {
  "use strict";
  var DialogView = Backbone.View.extend({
    className: 'dialog-wrap',
    events: {
      'click .send': 'send',
      'keypress .input': 'inputKeyPress'
    },
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      return this;
    },
    render: function () {
      this.$el.html(_.template(templates.dialog, this.context));

      $(".messenger-box .dialog-wrap .content .dialog").customScrollbar({
        fixedThumbHeight: 45,
        hScroll: false,
        updateOnWindowResize: true
      });

      this.$el_input = this.$('.input');
      this.$el_active = this.$('.active-person');
      this.activePersonView = new ActivePersonView({context: this.model, el: this.$el_active[0]});
      this.activePersonView.render();

      this.$(".dialog").customScrollbar({
        fixedThumbHeight: 45,
        hScroll: false,
        animationSpeed: 0,
        updateOnWindowResize: true
      });

      this.$el_messages = this.$('.dialog .overview');
      this.messagesView = new MessagesView({collection: this.model.messages, el: this.$el_messages[0]});
      this.messagesView.render();
      return this;
    },
    send: function () {
      var data = this.$el_input.val();
      app.trigger('socket:send', {
        receiver: this.model.id,
        text: data,
        time: 0
      });
      this.$el_input.val('');
    },
    update: function () {
      this.$(".dialog").customScrollbar("resize", true);
      this.$(".dialog").customScrollbar("scrollToY", this.$el_messages[0].scrollHeight);
    },
    inputKeyPress: function (e) {
      if (e.which == '13') { // enter
        this.send();
      }
    }
  });
  return DialogView;
});


