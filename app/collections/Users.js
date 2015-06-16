define(['backbone', '../models/User'], function (Backbone, User) {
    "use strict";
    return Backbone.Collection.extend({
        model: User,
        //localStorage: new Backbone.LocalStorage('todos-backbone-marionette'),
        comparator: 'id'
    });
});


