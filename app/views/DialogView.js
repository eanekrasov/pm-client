define(['backbone', './ActivePersonView', './MessagesView', '../app', '../models/Message', '../templates'], function (Backbone, ActivePersonView, MessagesView, app, Message, templates) {
  "use strict";
  var DialogView = Backbone.View.extend({
    className: 'dialog-wrap',
    events: {
      'click .send': 'send',
      'keyup .input': 'inputKeyUp'
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

      this.update();

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
    inputKeyUp: function (e) {
      var code = (e.which > 0 ) ? e.which : e.keyCode;
      if (code == 13) { // enter
        this.send();
      }
      if (code == 8 || code == 46) { // backspace or delete
        app.trigger('socket:senderasing', this.model.id);
      } else {
        app.trigger('socket:sendwriting', this.model.id);
      }
    }
  });
  return DialogView;
});


