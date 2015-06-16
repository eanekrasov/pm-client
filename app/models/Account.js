define(['backbone'], function (Backbone) {
    "use strict";

    return Backbone.Model.extend({
        defaults: {
            id: null,
            name: null,
            avatar: "",
            status: "offline" // TODO: extract from localStorage
        }
    });
});
