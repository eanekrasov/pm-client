define(['backbone'], function(Backbone) {
  "use strict";

  var PersonView = Backbone.View.extend({
    className: 'person',
    events: {
    },
    initialized: false,
    initialize: function(options){
      this.template = $('#person-template').html();
      this.model = options.context;
      this.context = this.model.attributes;
      this.model.on('change', this.render, this);
      return this;
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      this.$("#select-status").msDropDown();
      return this;
    }
  });

  return PersonView;
});


