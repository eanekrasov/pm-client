define(['marionette', 'text!templates/filter.html'], function (Marionette, template) {
    "use strict";

    return Marionette.ItemView.extend({
        template: function (serialized) {
            return _.template(template)(serialized);
        },
        ui: {
            text: ".filter-text",
            reset: ".filter-reset",
            submit: ".filter-submit"
        },
        events: {
            'click @ui.reset': 'onClickReset',
            'click @ui.submit': 'onClickSubmit',
            'keyup @ui.text': 'onKeyUp'
        },
        modelEvents: {
            'change:value': "onValueChanged"
        },
        onValueChanged: function (model, value) {
            if (!this.ui.text.is(':focus')) {
                this.ui.text.val(value);
            }
        },
        onKeyUp: function (e) {
            var ESC_KEY = 27,
                ESC_ENTER = 13,
                char = e.which !== 0 ? e.which : e.keyCode,
                value = this.ui.text.val().trim();
            e.preventDefault();
            if (char == ESC_KEY) {
                this.resetValue();
            } else if (char == ESC_ENTER) {
                this.submitValue();
            } else {
                this.model.set('value', value);
                Backbone.Radio.channel('global').command('users:filter', value);
            }
        },
        submitValue: function () {
            Backbone.Radio.channel('global').command("socket:users", this.ui.text.val().trim());
        },
        resetValue: function () {
            this.model.set('value', '');
            this.ui.text.val('').blur();
            Backbone.Radio.channel('global').command('users:filter', '');
            Backbone.Radio.channel('global').request('model').get('evorch_users').reset([]);
        },
        onClickReset: function () {
            this.resetValue();
        },
        onClickSubmit: function () {
            this.submitValue();
        }
    });
});


