define(['backbone', '../app', '../templates', 'jquery', 'external/jquery.dd'], function (Backbone, app, templates, jquery) {
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
      this.$("#select-status").val(this.context.status);
      $("#select-status", this.el).msDropDown({
        on: {
          change: function (data) {
            console.log(data.value);
            localStorage['pm-status'] = data.value;
            app.trigger('socket:sendstatus', data.value);
          }.bind(this)
        }
      });
      return this;
    }
  });

  return PersonView;
});


