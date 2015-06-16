define(['backbone', 'models/Account', 'models/Filter', 'models/User', 'collections/Users'], function (Backbone, Account, Filter, User, Users) {
    "use strict";

    return Backbone.Model.extend({
        defaults: {
            account: new Account({id: 0, name: "anonymous", status: localStorage['pm-status'] || 'online'}),
            users: new Users(),
            filter: new Filter()
        }
    });
});
