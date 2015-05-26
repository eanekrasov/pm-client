define(['backbone', '../templates'], function (Backbone, templates) {
  "use strict";

  var ActivePersonView = Backbone.View.extend({
    className: 'active-person',
    events: {},
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      this.model.on('change', this.render, this);
      return this;
    },
    render: function () {
      this.$el.html(_.template(templates.active_person, this.context));
      return this;
    }
  });

  return ActivePersonView;
});


