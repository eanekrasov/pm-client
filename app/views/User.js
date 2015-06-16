define(['marionette', 'text!templates/user.html'], function (Marionette, template) {
  "use strict";

  return Marionette.ItemView.extend({
    template: function (serialized) {
      return _.template(template)(serialized);
    },
    className: 'user',
    ui: {},
    events: {
      'click': 'onClick'
    },
    modelEvents: {
      "change:status": "onStatusChanged",
      "change:hidden": "onHiddenChanged",
      "change:writing": "onWritingChanged",
      "change:erasing": "onErasingChanged"
    },
    onHiddenChanged: function (model, value) {
      this.$el.toggleClass('hidden', value);
    },
    onWritingChanged: function (model, value) {
      this.$el.toggleClass('writing', value);
    },
    onErasingChanged: function (model, value) {
      this.$el.toggleClass('erasing', value);
    },
    onStatusChanged: function (model, value) {
      this.$el.removeClass(model._previousAttributes.status).removeClass(model.attributes.status).addClass(value);
    },
    onClick: function () {
      Backbone.Radio.channel('global').command('navigate', "#chat/" + this.model.get('id'));
    }
  });
});
