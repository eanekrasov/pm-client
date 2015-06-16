define(['jquery', 'backbone', 'marionette', 'text!templates/add_person.html'], function (jquery, Backbone, Marionette, template) {
    "use strict";
    return Marionette.ItemView.extend({
        template: function (serialized) {
            return _.template(template)(serialized);
        },
        ui: {
            text: 'input[type="text"]',
            submit: 'input[type="submit"]',
            scroll: '.scroll-box'
        },
        events: {
            'keyup @ui.text': "onKeyUp",
            'click @ui.submit': "clickSubmit"
        },
        clickSubmit: function () {
            _.each(this.model.get('users'), function (user) {
                if (this.$('input[name="add-person[' + user.id + ']"]')[0].checked) {
                    Backbone.Radio.channel('global').command("socket:relation", 'request', user.id);
                }
            }.bind(this));
        },
        onKeyUp: function (e) {
            var ESC_KEY = 27;
            var ESC_ENTER = 13;
            var char = e.which !== 0 ? e.which : e.keyCode;
            e.preventDefault();
            if (char == ESC_KEY) {
                this.ui.text.val('').blur();
            } else if (char == ESC_ENTER) {
                Backbone.Radio.channel('global').command("socket:users", this.ui.text.val().trim());
            } else {
                // nothing to do
            }
        },
        onRender: function () {
            if (this.isShown) {
                jquery(this.ui.scroll).customScrollbar({
                    fixedThumbHeight: 45,
                    hScroll: false,
                    updateOnWindowResize: true
                });
            }
        },
        onShow: function () {
            this.isShown = true;
            jquery(this.ui.scroll).customScrollbar({
                fixedThumbHeight: 45,
                hScroll: false,
                updateOnWindowResize: true
            });
        }
    });
});


