define(['marionette', 'views/User'], function (Marionette, UserView) {
  "use strict";
  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'users',
    childView: UserView
  });
});


