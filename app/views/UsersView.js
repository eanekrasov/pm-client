define(['backbone', './UserView', './CollectionView'], function(Backbone, UserView, CollectionView) {
  "use strict";
  var UsersView = CollectionView.extend({
    className: 'users',
    viewClass: UserView
  });

  return UsersView;
});


