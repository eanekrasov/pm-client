define(['backbone', '../templates', './MessagesView', './UsersView', './PersonView', '../messenger', 'jquery', 'msDropDown'], function(Backbone, templates, MessagesView, UsersView, PersonView, messenger, jquery) {
  "use strict";

  var MessengerView = Backbone.View.extend({
    className: 'messenger-box',
    events: {
      'click .send': 'send',
      'keypress .input': 'inputKeyPress'
    },
    initialize: function(options){
      this.template = $('#messenger-template').html();
      this.context = options.context;
      return this;
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      //this.$(".select-status-box .select-status").msDropDown();
      this.$el_users = this.$('.list-friends ul');
      this.usersView = new UsersView({collection: messenger.users, el: this.$el_users[0]});
      this.usersView.render();

      this.$el_person = this.$('.person');
      this.personView = new PersonView({context: messenger.user, el: this.$el_person[0]});
      this.personView.render();
      this.$el.width('178px');

      // TODO: on click this.$('.wrap-content').append(new DialogView);

      //this.$el_messages = this.$('.overview');
      //this.messagesView = new MessagesView({collection: this.context.messages, el: this.$el_messages[0]});
      //this.messagesView.render();
      //this.$el_send = this.$('.send');
      //this.$el_input = this.$('.input');
      return this;
    },
    addMsg: function(msg) {
      //var view = new UserView({model: user});
      //$(this.user_list).append(view.render().el);
      this.$el_messages.html(msg);
      this.$el_messages[0].scrollTop = this.$el_messages[0].scrollHeight;
    },
    send: function () {
      var data = this.$el_input.val();
      this.context.trigger('socket:send', escape(data));
      this.$el_input.val('');
    },
    inputKeyPress: function(e) {
      if (e.which == '13') { // enter
        this.send();
      }
    }
  });
  return MessengerView;
});


