define(['backbone', './MessageView', './CollectionView'], function(Backbone, MessageView, CollectionView) {
  "use strict";
  var MessagesView = CollectionView.extend({
    className: 'messages',
    viewClass: MessageView
  });

  return MessagesView;
});


