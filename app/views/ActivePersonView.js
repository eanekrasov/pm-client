define(['backbone', '../templates'], function (Backbone, templates) {
  "use strict";

  var ActivePersonView = Backbone.View.extend({
    className: 'active-person',
    events: {},
    statuses: {
      'online': 'В сети',
      'offline': 'Не в сети',
      'do_not_disturb': 'Не беспокоить',
      'away': 'Нет на месте'
    },
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      this.model.on('change', this.render, this);
      return this;
    },
    render: function () {
      this.$el.html(_.template(templates.active_person, this.context));
      this.$('.status').addClass('status_' + this.context.status);
      this.$('.status').text(this.statuses[this.context.status]);
      return this;
    }
  });

  return ActivePersonView;
});


