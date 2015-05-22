define(['backbone', 'models/Message', 'models/User'], function(Backbone, Message, User) {
  "use strict";

  return _.extend({
  	root: "/",
  	debug: true,
  	io_url: 'http://dev.evorch.ru:11345',
  	socket_events: {
  		'connect': 'onSocketConnect',
  		'disconnect': 'onSocketDisconnect',
  		'message': 'onSocketMessage',
  	},
    user: new User({name: "anonymous"}),
    chatViews: {},
  	messages: new Backbone.Collection(null, {model: Message}),
    users: new Backbone.Collection(null, {model: User}),
  	init: function () {
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
	      };
      }
      this.on('socket:send', function (data) {
      	this.socket.send(data);
      }, this);
		},
		onSocketDisconnect: function () {
			this.trigger('socket:disconnect');
	    //this.addMsg(('[sys]Дисконнект (Не авторизован).[/sys]')
	    //    .replace(/\[([a-z]+)\]/g, '<span class="$1">')
	    //    .replace(/\[\/[a-z]+\]/g, '</span>') + '<br>');
		},
    onSocketMessage: function (msg) {
      this.trigger('socket:message', msg);
      if (msg.event) {
        var e = msg.event;
        this.trigger('socket:message:' + e, msg);
      }
      //this.addMsg(strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%time\%/, msg.time).replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>');
    },
    onSocketConnect: function () {
    	this.trigger('socket:connect');
    	// TODO: load users
		}
  }, Backbone.Events);
});
