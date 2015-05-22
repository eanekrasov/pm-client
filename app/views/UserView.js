define(['backbone', './ChatView'], function(Backbone, ChatView) {
  "use strict";

  var UserView = Backbone.View.extend({
    className: 'user',
    events: {
      'click': 'showChat'
    },
    initialize: function(options){
      this.template = $('#user-template').html();
      this.model = options.context;
      this.context = this.model.attributes;
      this.$el.toggleClass('online', this.context.online);
      return this;
    },
    showChat: function () {
      var view = null;
      if (messenger.chatViews.hasOwnProperty(this.model.id)) {
        view = messenger.chatViews[this.model.id];
      } else {
        view = new ChatView({context: this.model});
        messenger.chatViews[this.model.id] = view; 
        $('body').append(view.render().el);
      }
      // TODO: view.focus();
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      return this;
    }
  });

  return UserView;
});


