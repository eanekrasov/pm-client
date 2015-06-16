define(['backbone', 'marionette', 'text!templates/message_user.html', 'text!templates/message_contact.html'], function (Backbone, Marionette, template_user, template_contact) {
  "use strict";

  return Marionette.ItemView.extend({
    className: 'message-wrap',
    template: function (serialized) {
      var account = Backbone.Radio.channel('global').request('account');
      return _.template((account.id == serialized.owner) ? template_user : template_contact)(serialized);
    },
    onRender: function () {
      var account = Backbone.Radio.channel('global').request('account');
      this.$el.addClass((account.id == this.model.get('owner')) ? 'message-wrap-user' : 'message-wrap-contact');
    }
  });
});


