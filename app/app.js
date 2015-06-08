define(['backbone', 'models/Message', 'models/User'], function (Backbone, Message, User) {
    "use strict";

    return _.extend({
        root: "/",
        debug: true,
        io_url: 'http://dev.evorch.ru:11345',
        socket_events: {
            'connect': 'onSocketConnect',
            'disconnect': 'onSocketDisconnect',
            'message': 'onSocketMessage'
        },
        user: new User({id: 0, name: "anonymous", status: localStorage['pm-status'] || 'online'}),
        chatViews: {},
        messages: new Backbone.Collection(null, {model: Message}),
        users: new Backbone.Collection(null, {model: User}),
        current: null,
        init: function () {
            if (io) {
                this.socket = io.connect(this.io_url);
                if (this.socket_events && _.size(this.socket_events) > 0) {
                    for (var key in this.socket_events) {
                        var method = this.socket_events[key];
                        if (!_.isFunction(method)) {
                            method = this[this.socket_events[key]];
                        }
                        if (!method) {
                            throw new Error('Method "' + this.socket_events[key] + '" does not exist');
                        }
                        method = _.bind(method, this);
                        this.socket.on(key, method);
                    }
                }
                this.on('socket:send', this.onSocketSend, this);
                this.on('socket:sendstatus', this.onSocketStatusSend, this);
                this.on('socket:sendwriting', this.onSocketSendWriting, this);
                this.on('socket:senderasing', this.onSocketSendErasing, this);
                this.on('socket:getmessages', this.onSocketGetMessages, this);
                this.on('socket:message:message:sent', this.onSocketMessageMessage, this);
                this.on('socket:message:message:received', this.onSocketMessageMessage, this);
                this.on('socket:message:connected', this.onSocketMessageConnected, this);
                this.on('socket:message:status', this.onSocketMessageStatus, this);
                this.on('socket:message:user:writing', this.onSocketMessageUserWriting, this);
                this.on('socket:message:user:erasing', this.onSocketMessageUserErasing, this);
                this.on('socket:message:messages', this.onSocketMessageMessages, this);
                window.messenger = this;
            }
        },
        onSocketMessageConnected: function (msg) {
            this.user.set({
                id: msg.id,
                name: msg.name,
                avatar: msg.avatar
            });
            for (var i in msg.users) {
                var user = new User(msg.users[i]);
                this.users.push([user]);
            }
            this.trigger('socket:getmessages', msg.id);
        },
        onSocketMessageStatus: function (msg) {
            this.users.get(msg.id).set('status', msg.status);
        },
        onSocketMessageUserWriting: function (msg) {
            if (this.writingTimeout) {
                clearTimeout(this.writingTimeout);
                this.writingTimeout = undefined;
            }
            if (this.erasingTimeout) {
                clearTimeout(this.erasingTimeout);
                this.erasingTimeout = undefined;
            }
            var user = this.users.get(msg.owner);
            user.set({
                'erasing': false,
                'writing': true
            });
            this.writingTimeout = setTimeout(function () {
                user.set('writing', false);
                this.writingTimeout = undefined;
            }.bind(this), 5000);
        },
        onSocketMessageUserErasing: function (msg) {
            if (this.writingTimeout) {
                clearTimeout(this.writingTimeout);
                this.writingTimeout = undefined;
            }
            if (this.erasingTimeout) {
                clearTimeout(this.erasingTimeout);
                this.erasingTimeout = undefined;
            }
            var user = this.users.get(msg.owner);
            user.set({
                'erasing': true,
                'writing': false
            });
            this.erasingTimeout = setTimeout(function () {
                user.set('erasing', false);
                this.erasingTimeout = undefined;
            }.bind(this), 5000);
        },
        onSocketMessageMessage: function (msg) {
            var ownerId = parseInt(msg.owner);
            var receiverId = parseInt(msg.receiver);
            var owner = (this.user.id == ownerId) ? this.user : this.users.get(ownerId);
            msg.avatar = owner.get('avatar');
            var user = this.users.get((this.user.id == ownerId) ? receiverId : ownerId);
            user.messages.push([new Message(msg)]);
            this.view.dialogView.update();
        },
        onSocketMessageMessages: function (msgs) {
            var messages = msgs.messages.reverse();
            for (var i in messages) {
                var msg = messages[i];
                var ownerId = parseInt(msg.owner);
                var receiverId = parseInt(msg.receiver);
                var owner = (this.user.id == ownerId) ? this.user : this.users.get(ownerId);
                msg.avatar = owner.get('avatar');
                var user = this.users.get((this.user.id == ownerId) ? receiverId : ownerId);
                user.messages.add(new Message(msg), {at: 0});
            }
            if (this.view.dialogView) {
                this.view.dialogView.update();
            }
        },
        onSocketSend: function (data) {
            if (this.debug) console.log(data);
            data.owner = this.user.id;
            data.event = "message";
            this.socket.send(data);
        },
        onSocketStatusSend: function (status) {
            this.socket.send({
                event: "status",
                status: status
            });
        },
        onSocketSendWriting: function (receiver) {
            this.socket.send({
                event: "writing",
                receiver: receiver
            });
        },
        onSocketSendErasing: function (receiver) {
            this.socket.send({
                event: "erasing",
                receiver: receiver
            });
        },
        onSocketGetMessages: function (id) {
            this.socket.send({
                event: "messages",
                id: id
            });
        },
        onSocketDisconnect: function () {
            this.trigger('socket:disconnect');
        },
        onSocketMessage: function (msg) {
            if (this.debug) {
                console.log(msg);
            }
            this.trigger('socket:message', msg);
            if (msg.event) {
                var e = msg.event;
                this.trigger('socket:message:' + e, msg);
            }
        },
        onSocketConnect: function () {
            this.trigger('socket:connect');
        },
        showChat: function (user) {
            this.current = user;
            this.view.$el.addClass('expanded');
            this.view.showChat(this.current);
            // TODO: view.focus();
        }
    }, Backbone.Events);
});
