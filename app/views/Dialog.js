define(['jquery',
  'marionette',
  'views/ActivePerson',
  'views/DialogInput',
  'views/Messages',
  'text!templates/dialog.html'
], function (jquery,
             Marionette,
             ActivePersonView,
             DialogInputView,
             MessagesView,
             template) {
  "use strict";
  return Marionette.LayoutView.extend({
    template: function (serialized) {
      return _.template(template)(serialized);
    },
    regions: {
      //"messages": "#messages",
      "dialog-input": "#dialog-input",
      "person": '#person'
    },
    ui: {
      dialog: ".dialog",
      messages: "#messages"
    },
    events: {},
    onShow: function () {
      jquery(this.ui.dialog).customScrollbar({
        fixedThumbHeight: 45,
        hScroll: false,
        updateOnWindowResize: true
      });
      this.addRegion("messages", '#messages .overview');
      this.showChildView("messages", new MessagesView({collection: this.model.messages}));
      this.listenTo(this.model.messages, "add", this.update);
      this.update();
    },
    onRender: function () {
      this.showChildView("dialog-input", new DialogInputView({model: this.model}));
      this.showChildView("person", new ActivePersonView({model: this.model}));
    },
    update: function () {
      jquery(this.ui.dialog).customScrollbar("resize", true);
      jquery(this.ui.dialog).customScrollbar("scrollToY", this.$('.messages')[0].scrollHeight);
    }
  });
});


