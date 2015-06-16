define(['backbone', 'marionette', 'text!templates/dialog-input.html'],
    function (Backbone, Marionette, template) {
        "use strict";
        return Marionette.ItemView.extend({
            template: function (serialized) {
                return _.template(template)(serialized);
            },
            className: 'field-input-text',
            ui: {
                send: '.send',
                input: '.input',
                photo: '.add-photo',
                smile: '.add-smile'
            },
            events: {
                'click @ui.photo': 'clickPhoto',
                'click @ui.smile': 'clickSmile',
                'click @ui.send': 'clickSend',
                'keyup @ui.input': 'inputKeyUp'
            },
            clickPhoto: function () {
                // TODO: not implemented
            },
            clickSmile: function () {
                // TODO: not implemented
            },
            clickSend: function () {
                var data = this.ui.input.val();
                this.ui.input.val('');
                Backbone.Radio.channel('global').command('socket:send', {
                    receiver: this.model.get('id'),
                    text: data
                });
            },
            inputKeyUp: function (e) {
                var KEY_ENTER = 13;
                var KEY_BACKSPACE = 8;
                var KEY_DELETE = 46;
                var code = (e.which > 0 ) ? e.which : e.keyCode;
                if (code == KEY_ENTER) {
                    this.clickSend();
                }
                if (code == KEY_BACKSPACE || code == KEY_DELETE) {
                    Backbone.Radio.channel('global').command('socket:erasing', this.model.id);
                } else {
                    Backbone.Radio.channel('global').command('socket:writing', this.model.id);
                }
            }
        });
    });