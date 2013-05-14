(function() {
	'use strict';

	function Buffer() {
		ReservationStation.apply(this, arguments);
		return this;
	}

	Buffer.prototype = new ReservationStation();

	if (typeof module === 'object') {
		module.exports = Buffer;
	} else {
		this.Buffer = Buffer;
	}

}).call(this);

