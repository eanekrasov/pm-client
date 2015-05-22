define(['backbone'], function(Backbone) {
  "use strict";

  var ActivePersonView = Backbone.View.extend({
    className: 'active-person',
    events: {},
    initialize: function(options){
      this.template = $('#active-person-template').html();
      this.model = options.context;
      this.context = this.model.attributes;
      this.model.on('change', this.render, this);
      return this;
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      return this;
    }
  });

  return ActivePersonView;
});


