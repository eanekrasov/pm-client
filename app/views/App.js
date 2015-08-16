define([
    'jquery',
    'marionette',
    'views/Account',
    'views/AddPerson',
    'views/Filter',
    'views/Users',
    'text!templates/app.html'
], function (jquery,
             Marionette,
             AccountView,
             AddPersonView,
             FilterView,
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
            evorch_users: '#evorch-users',
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
            this.showChildView('add_person', new AddPersonView({
                model: new Backbone.Model({
                    text: "",
                    users: []
                })
            }));
            this.showChildView('account', new AccountView({model: this.model.get('account')}));
            this.showChildView('filter', new FilterView({model: this.model.get('filter')}));
            jquery(this.ui.users).customScrollbar({
                fixedThumbHeight: 45,
                hScroll: false,
                updateOnWindowResize: true
            });
            jquery(this.ui.evorch_users).customScrollbar({
                fixedThumbHeight: 45,
                hScroll: false,
                updateOnWindowResize: true
            });
            this.addRegion("users", '#users .overview');
            this.addRegion("evorch_users", '#evorch-users .overview');
            var users = this.model.get('users');
            var evorch_users = this.model.get('evorch_users');
            this.showChildView('users', new UsersView({collection: users}));
            this.showChildView('evorch_users', new UsersView({collection: evorch_users}));
            this.listenTo(users, "add", this.update);
            this.listenTo(evorch_users, "add", this.update);
            this.update();
        },
        update: function () {
            jquery(this.ui.users).customScrollbar("resize", true);
            jquery(this.ui.evorch_users).customScrollbar("resize", true);
        }
    });
});
