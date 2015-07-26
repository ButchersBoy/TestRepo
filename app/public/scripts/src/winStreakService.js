function WinStreakService() {
	this.value = 0;	
	this.subscribers = [];
};

WinStreakService.prototype.subscribe = function(listener) {
	this.subscribers.push(listener);
};
WinStreakService.prototype.inc = function() {
	this.value++;
	for (var i = 0; i < this.subscribers.length; i++)
		this.subscribers[i](this.value);
};
WinStreakService.prototype.reset = function() {
	this.value = 0;
	for (var i = 0; i < this.subscribers.length; i++)
		this.subscribers[i](this.value);
};

var winStreakService = new WinStreakService();

module.exports = winStreakService;