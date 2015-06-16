define(['backbone', 'marionette'], function (Backbone, Marionette) {
    "use strict";

    return Marionette.Controller.extend({
        initialize: function () {
            console.log('AppController:initialize');
            this.channel = Backbone.Radio.channel("global");
        },
        index: function () {
            console.log('AppController:index');
        },
        chat: function (id) {
            var user = this.channel.request('users').get(id);
            console.log("navigate chat", user);
            this.channel.command('showChat', user);
        }
    });
});
