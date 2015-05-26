define(['backbone', '../templates'], function (Backbone, templates) {
  "use strict";

  var PersonView = Backbone.View.extend({
    className: 'person',
    events: {
    },
    initialized: false,
    initialize: function(options){
      this.model = options.context;
      this.context = this.model.attributes;
      this.model.on('change', this.render, this);
      return this;
    },
    render: function () {
      this.$el.html(_.template(templates.person, this.context));
      this.$("#select-status").msDropDown({
        on: {
          change: function (data) {
            console.log(data.value);
            //TODO: messenger.trigger('socket:send', data);
          }.bind(this)
        }
      });
      return this;
    }
  });

  return PersonView;
});


