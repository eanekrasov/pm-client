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
            var ESC_KEY = 27;
            var char = e.which !== 0 ? e.which : e.keyCode;
            var value = '';
            e.preventDefault();
            if (char !== ESC_KEY) {
                value = this.ui.text.val().trim();
            } else {
                this.ui.text.blur();
            }
            this.model.set('value', value);
            Backbone.Radio.channel('global').command('users:filter', value);
        },
        onClickReset: function () {
            this.model.set('value', '');
            Backbone.Radio.channel('global').command('users:filter', '');
        }
    });
});


