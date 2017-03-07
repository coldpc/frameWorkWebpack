function EventListener(){
}

	$$.EventListener = function(){
		var _this = this;
		_this.events = {};

		_this.addEventListener = function (type, func, para) {
			(_this.events[type] || (_this.events[type] = [])).push({
				call: func,
				para: para
			});
		};

		_this.removeEventListener = function (type, func) {
			var events = this.events[type];
			if (events) {
				var event;
				for (var i = 0, l = events.length; i < l; i++) {
					event = events[i];
					if (event.call == func) {
						events.splice(i, 1);
						break;
					}
				}
			}
		};

		_this.dispatch = function (type, msg) {
			var events = this.events[type];
			if (events) {
				var event;
				for (var i = 0, l = events.length; i < l; i++) {
					event = events[i];
					if (typeof event.call == "function") {
						event.call(msg, event.para);
					}
				}
			}
		};
	};
}
