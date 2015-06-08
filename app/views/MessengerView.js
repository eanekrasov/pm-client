define(['backbone', './MessagesView', './UsersView', './PersonView', '../app', 'views/DialogView', '../templates'], function (Backbone, MessagesView, UsersView, PersonView, app, DialogView, templates) {
  "use strict";

  // event.type must be 'keypress'
  function getChar(event) {
    return event.which !== 0 ? event.which : event.keyCode;
  }


  var MessengerView = Backbone.View.extend({
    className: 'messenger-box',
    events: {
      'click .filter-reset': 'onClickFilterReset',
      'click .filter-submit': 'onClickFilterSubmit',
      'keyup .filter-text': 'onClickFilterSubmit',
      'keypress .filter-text': 'onKeyPressFilterText'
    },
    onKeyPressFilterText: function (event) {
      if (getChar(event) == 27) {
        this.onClickFilterReset();
        event.preventDefault();
      }
    },
    onClickFilterReset: function () {
      this.$('.filter-text').val('');
      app.users.each(function (model) {
        model.set('hidden', false);
      });
    },
    onClickFilterSubmit: function () {
      var value = this.$('.filter-text').val();
      app.users.each(function (model) {
        var name = model.get('name').toLowerCase();
        model.set('hidden', name.indexOf(value.toLowerCase()) == -1);
      });
    },
    initialize: function(options){
      this.context = options.context;
      app.trigger('socket:sendstatus', localStorage['pm-status'] || 'online');
      return this;
    },
    render: function () {
      this.$el.html(_.template(templates.messenger, this.context));
      this.$el_users = this.$('.list-friends ul');
      this.usersView = new UsersView({collection: app.users, el: this.$el_users[0]});
      this.usersView.render();

      this.$el_person = this.$('.person');
      this.personView = new PersonView({context: app.user, el: this.$el_person[0]});
      this.personView.render();

      return this;
    },
    showChat: function (user) {
      this.$el_dialog = this.$('.dialog-wrap');
      if (this.dialogView) {
        // COMPLETELY UNBIND THE VIEW
        this.dialogView.undelegateEvents();
        this.dialogView.$el.removeData().unbind();
      }
      this.dialogView = new DialogView({context: user, el: this.$el_dialog[0]});
      this.dialogView.render();
    },
    addMsg: function(msg) {
      //var view = new UserView({model: user});
      //$(this.user_list).append(view.render().el);
      this.$el_messages.html(msg);
      this.$el_messages[0].scrollTop = this.$el_messages[0].scrollHeight;
    }
  });
  return MessengerView;
});


