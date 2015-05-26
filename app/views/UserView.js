define(['backbone', '../app', '../templates'], function (Backbone, app, templates) {
  "use strict";

  var UserView = Backbone.View.extend({
    className: 'user',
    events: {
      'click': 'onClick'
    },
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      this.$el.toggleClass('online', this.context.online);
      return this;
    },
    onClick: function () {
      app.showChat(this.model);
    },
    render: function () {
      this.$el.html(_.template(templates.user, this.context));
      return this;
    }
  });

  return UserView;
});


