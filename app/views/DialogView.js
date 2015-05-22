define(['backbone'], function(Backbone) {
  "use strict";
  var DialogView = Backbone.View.extend({
    className: 'dialog-wrap',
    events: {},
    initialize: function(options){
      this.template = $('#dialog-template').html();
      this.model = options.context;
      this.context = this.model.attributes;
      return this;
    },
    render: function () {
      this.$el.html(_.template(this.template, this.context));
      return this;
    }
  });
  return DialogView;
});


