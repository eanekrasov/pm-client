define([
        'backbone',
        'marionette',

        'AppRouter',
        'controllers/App',

        'collections/Users',
        'models/Account',
        'models/App',
        'models/Filter',
        'models/Message',
        'models/User',

        'views/AddPerson',
        'views/App',
        'views/Account',
        'views/Dialog',
        'views/Filter'
    ],
    function (Backbone,
              Marionette,
              AppRouter,
              AppController,
              Users,
              Account,
              AppModel,
              Filter,
              Message,
              User,
              AddPersonView,
              AppView,
              AccountView,
              DialogView,
              FilterView) {
    "use strict";

        return Marionette.Application.extend({
            // config
        debug: true,
        io_url: 'http://dev.evorch.ru:11345',

            // data
            model: new AppModel(),
        chatViews: {},
        current: null,
            socket: null,

            // own handlers
            onStart: function () {
                this._debug('app:onStart');
                this.controller = new AppController();
                this.router = new AppRouter({
                    controller: this.controller
            });
                this.view = new AppView({model: this.model});
                this.addRegions({
                    'root': '#messenger'
                });
                this.root.show(this.view);
                this.channel.reply('appView', this.view);
                var accountView = new AccountView({model: this.model.get('account')});
                this.view.showChildView('account', accountView);
                var filterView = new FilterView({model: this.model.get('filter')});
                this.view.showChildView('filter', filterView);
                var addPersonView = new AddPersonView({
                    model: new Backbone.Model({
                        text: "",
                        users: []
                    })
                });
                this.view.showChildView('add_person', addPersonView);
                if (Backbone.history) {
                    Backbone.history.start();
            }
        },

            // socket events
            socket_events: {
                'connect': function () {
                    this._debug('connect');
                    this.trigger('socket:connect');
                },
                'disconnect': function () {
                    this._debug('disconnect');
                    this.trigger('socket:disconnect');
                },
                'message': function (msg) {
                    this._debug("message", msg);
                    this.trigger('socket:message', msg);
                    if (msg.event) {
                        var e = msg.event;
                        if (this.message_handlers.hasOwnProperty(e)) {
                            this.message_handlers[e].call(this, msg);
                        }
                    }
            }
        },

            // message handlers
            message_handlers: {
                'connected': function (msg) {
                    this.model.get('account').set({
                        id: msg.id,
                        name: msg.name,
                        avatar: msg.avatar
                    });
                },
                'friends': function (msg) {
                    // TODO: handle friends removing
                    var users = this.model.get('users');
                    for (var i in msg.users) {
                        if (msg.users.hasOwnProperty(i)) {
                            var user = new User(msg.users[i]);
                            users.add(user);
                        }
                    }
                    this.channel.command('socket:messages', msg.id);
                },
                'message:sent': function (msg) {
                var ownerId = parseInt(msg.owner);
                var receiverId = parseInt(msg.receiver);
                    var account = this.model.get('account');
                    var users = this.model.get('users');
                    var owner = (account.id == ownerId) ? account : users.get(ownerId);
                    var user = users.get((account.id == ownerId) ? receiverId : ownerId);
                msg.avatar = owner.get('avatar');
                    user.messages.add([new Message(msg)]);
                },
                'message:received': function (msg) {
                    var ownerId = parseInt(msg.owner);
                    var receiverId = parseInt(msg.receiver);
                    var account = this.model.get('account');
                    var users = this.model.get('users');
                    var owner = (account.id == ownerId) ? account : users.get(ownerId);
                    var user = users.get((account.id == ownerId) ? receiverId : ownerId);
                    msg.avatar = owner.get('avatar');
                    user.messages.add([new Message(msg)]);
                },
                'messages': function (msgs) {
                    var messages = msgs.messages.reverse();
                    for (var i in messages) {
                        if (messages.hasOwnProperty(i)) {
                            var msg = messages[i];
                            var ownerId = parseInt(msg.owner);
                            var receiverId = parseInt(msg.receiver);
                            var account = this.model.get('account');
                            var users = this.model.get('users');
                            var owner = (account.id == ownerId) ? account : users.get(ownerId);
                            msg.avatar = owner.get('avatar');
                            var user = users.get((account.id == ownerId) ? receiverId : ownerId);
                            user.messages.add(new Message(msg), {at: 0});
                        }
                    }
                },
                'status': function (msg) {
                    this.model.get('account').set('status', msg.status);
                },
                'user:status': function (msg) {
                    this.model.get('users').get(msg.id).set('status', msg.status);
                },
                'user:erasing': function (msg) {
                    if (this.writingTimeout) {
                        clearTimeout(this.writingTimeout);
                        this.writingTimeout = undefined;
                    }
                    if (this.erasingTimeout) {
                        clearTimeout(this.erasingTimeout);
                        this.erasingTimeout = undefined;
                    }
                    var user = this.model.get('users').get(msg.owner);
                    user.set({
                        'erasing': true,
                        'writing': false
                    });
                    this.erasingTimeout = setTimeout(function () {
                        user.set('erasing', false);
                        this.erasingTimeout = undefined;
                    }.bind(this), 5000);
                },
                'user:writing': function (msg) {
                    if (this.writingTimeout) {
                        clearTimeout(this.writingTimeout);
                        this.writingTimeout = undefined;
                    }
                    if (this.erasingTimeout) {
                        clearTimeout(this.erasingTimeout);
                        this.erasingTimeout = undefined;
                    }
                    var user = this.model.get('users').get(msg.owner);
                    user.set({
                        'erasing': false,
                        'writing': true
                    });
                    this.writingTimeout = setTimeout(function () {
                        user.set('writing', false);
                        this.writingTimeout = undefined;
                    }.bind(this), 5000);
                },
                'users': function (msg) {
                    var view = this.view.add_person.currentView;
                    var users = view.model.set('users', msg.users);
                    view.render();
            }
            },

            initialize: function () {
                this._debug('app:initialize');
                if (typeof io !== "undefined") {
                    this.socket = io.connect(this.io_url);
                    this._bind(this.socket_events, this.socket.on, this.socket, true);
                    this._bind(this.commands, this.channel.comply, this.channel, true);
                } else {
                    console.log("io is undefined");
            }
                this.channel.reply('model', this.model);
                this.channel.reply('account', this.model.get('account'));
                this.channel.reply('filter', this.model.get('filter'));
                this.channel.reply('users', this.model.get('users'));
        },

            // helpers
            _bind: function (events, fn, context, bind) {
                bind = bind || false;
                if (events && _.size(events) > 0) {
                    for (var key in events) {
                        if (events.hasOwnProperty(key)) {
                            var data = events[key];
                            if (!_.isFunction(data)) {
                                data = this[events[key]];
                            }
                            if (!data) {
                                throw new Error('Method "' + events[key] + '" does not exist');
                            }
                            if (bind) {
                                data = data.bind(this);
                            }
                            fn.call(context, key, data);
                        }
                    }
                }
            },
            _send: function (event, data) {
                data.event = event;
                this._debug("_send", data);
            this.socket.send(data);
        },
            _debug: function () {
            if (this.debug) {
                console.log.apply(console, arguments);
            }
        },
            commands: {
                'users:filter': function (value) {
                    this.model.get('users').each(function (model) {
                        if (value == '') {
                            model.set('hidden', false);
                        } else {
                            var name = model.get('name').toLowerCase();
                            model.set('hidden', name.indexOf(value.toLowerCase()) == -1);
                        }
                    });
                },
                'navigate': function (url) {
                    this.view.$el.addClass('expanded');
                    this.router.navigate(url, {trigger: true});
                },
                'showChat': function (user) {
                    this.view.showChildView('dialog', new DialogView({model: user}));
                },
                'socket:send': function (data) {
                    this._debug("socket:send", data);
                    data.owner = this.model.get('account').id;
                    this._send("message", data);
                },
                'socket:status': function (status) {
                    this._debug("socket:status", status);
                    this._send("status", {
                        status: status
                    });
                },
                'socket:messages': function (id) {
                    this._debug("socket:messages", id);
                    this._send("messages", {
                        id: id
                    });
                },
                'socket:users': function (text) {
                    this._send("users", {
                        text: text
                    });
                },
                'socket:writing': function (receiver) {
                    this._debug("socket:writing", receiver);
                    this._send("writing", {
                        receiver: receiver
                    });
                },
                'socket:erasing': function (receiver) {
                    this._debug("socket:erasing", receiver);
                    this._send("erasing", {
                        receiver: receiver
                    });
                },
                'socket:relation': function (type, id) {
                    this._debug("socket:relation", type, id);
                    this._send("relation", {
                        type: type,
                        id: id
                    });
                }
        }
        });
});
