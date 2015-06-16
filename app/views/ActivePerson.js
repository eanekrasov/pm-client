define(['backbone', 'marionette', 'text!templates/active_person.html'], function (Backbone, Marionette, template) {
  "use strict";
  return Marionette.ItemView.extend({
    className: 'active-person',
    template: function (serialized) {
      return _.template(template)(serialized);
    },
    modelEvents: {
      'all': 'render'
    },
    ui: {
      status: ".status"
    },
    statuses: {
      'online': 'В сети',
      'offline': 'Не в сети',
      'do_not_disturb': 'Не беспокоить',
      'away': 'Нет на месте'
    },
    onRender: function () {
      this.ui.status.addClass('status_' + this.model.get('status'));
      this.ui.status.text(this.statuses[this.model.get('status')]);
    }
  });
});


