define(['backbone'], function(Backbone) {
  "use strict";
  var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    active: false,
    views: [],
    viewClass: null,
    initialize: function(options){
      this.collection.on('add', this.onAdd, this);
      return this;
    },
    onAdd: function (model) {
      var view = new this.viewClass({context: model});
      this.views.push(view);
      this.$el.append(view.render().el);
    },
    render: function () {
      if (!this.active) {
        this.active = true;
        this.collection.each(this.onAdd, this);
      }
      return this;
    }
  });

  return CollectionView;
});


