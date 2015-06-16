define([
    'jquery',
    'marionette',
    'views/Account',
    'views/Users',
    'text!templates/app.html'
], function (jquery,
             Marionette,
             AccountView,
             UsersView,
             template) {
    "use strict";

    return Marionette.LayoutView.extend({
        template: function (serialized) {
            return _.template(template)(serialized);
        },
        className: 'messenger-box',
        regions: {
            filter: "#filter",
            account: "#account",
            add_person: "#add_person",
            //users: "#users",
            dialog: "#dialog"
        },
        ui: {
            users: '#users',
            add: ".add-person",
            close: ".close",
            add_person: "#add_person",
            btn_search: ".btn-search"
        },
        events: {
            "click @ui.add": "clickAdd",
            "click @ui.btn_search": "clickAdd",
            "click @ui.close": "clickClose"
        },
        clickAdd: function () {
            this.ui.add_person.toggleClass('hidden');
        },
        clickClose: function () {

        },
        onShow: function () {
            jquery(this.ui.users).customScrollbar({
                fixedThumbHeight: 45,
                hScroll: false,
                updateOnWindowResize: true
            });
            this.addRegion("users", '#users .overview');
            var users = this.model.get('users');
            this.showChildView('users', new UsersView({collection: users}));
            this.listenTo(users, "add", this.update);
            this.update();
        },
        update: function () {
            jquery(this.ui.users).customScrollbar("resize", true);
        }
        //app.command('socket:status', localStorage['pm-status'] || 'online');
    });
});
