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
      this.$el.addClass(this.context.status);
      this.model.on("change:status", this.onStatusChanged, this);
      this.model.on("change:hidden", this.onHiddenChanged, this);
      this.model.on("change:writing", this.onWritingChanged, this);
      this.model.on("change:erasing", this.onErasingChanged, this);
      return this;
    },
    destroy: function () {
      this.model.off("change:status", this.onStatusChanged, this);
      this.model.off("change:hidden", this.onHiddenChanged, this);
      this.model.off("change:writing", this.onWritingChanged, this);
      this.model.off("change:erasing", this.onErasingChanged, this);
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
      app.showChat(this.model);
    },
    render: function () {
      this.$el.html(_.template(templates.user, this.context));
      return this;
    }
  });

  return UserView;
});


