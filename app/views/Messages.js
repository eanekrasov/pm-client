define(['marionette', 'views/Message'], function (Marionette, MessageView) {
  "use strict";

  return Marionette.CollectionView.extend({
    className: 'messages',
    childView: MessageView
  });
});


