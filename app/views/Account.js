define(['backbone', 'marionette', 'app', 'text!templates/account.html', 'jquery'], function (Backbone, Marionette, app, template, jquery) {
    "use strict";
    return Marionette.ItemView.extend({
        className: 'person',
        template: function (serialized) {
            return _.template(template)(serialized);
        },
        ui: {
            select: "#select-status",
            avatar: "img",
            name: ".name"
        },
        events: {},
        modelEvents: {
            "change:status": "onStatusChanged",
            "change:avatar": "onAvatarChanged",
            "change:name": "onNameChanged"
        },
        onRender: function () {
            this.ui.select.val(this.model.get('status'));
        },
        onShow: function () {
            jquery(this.ui.select).msDropDown({
                on: {
                    change: function (data) {
                        localStorage['pm-status'] = data.value;
                        Backbone.Radio.channel('global').command('socket:status', data.value);
                    }.bind(this)
                }
            });
        },
        onStatusChanged: function () {
            this.ui.select.val(this.model.get('status')).trigger('change');
        },
        onAvatarChanged: function () {
            this.ui.avatar.attr('src', this.model.get('avatar'));
        },
        onNameChanged: function () {
            this.ui.name.text(this.model.get('name'));
        }
    });
});
