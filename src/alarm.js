"use strict";

var alarmStates = module.exports.alarmStates = require('./alarmStates.js');

/**
 * Constructor of the main object, it defines methods to handle buttons
 * and managing the alarm system
 * 
 * @param {object} beeper  The beeper object, has method 'beep'
 * @param {object} blinker The blinker object, has method 'blink'
 */
var CarAlarm = module.exports.CarAlarm = function (beeper, blinker) {
	// The interval of beeping and blinking in alarmed mode
	this.interval = 20000; // in milliseconds

	if (beeper) {
		this.beeper = beeper;
	} else {
		this.beeper = new Beeper();
	}

	if (blinker) {
		this.blinker = blinker;
	} else {
		this.blinker = new Blinker();
	}

	// Initially the alarm os off
	this.state = alarmStates.turnedOff;
};

/**
 * This method is called when the user pushes first button, which
 * turns on the alarm
 */
CarAlarm.prototype.handleButton1 = function () {
	this._turnOn();

	this.beeper.beep();
	this.blinker.blink();
};

/**
 * This method is called when the user pushes the second button, 
 * which turns the alarm off
 */
CarAlarm.prototype.handleButton2 = function () {
	this._turnOff();

	this.beeper.beep();
	this.blinker.blink();
	this.beeper.beep();
	this.blinker.blink();
};

/**
 * The method that turns on beeping and blinking aka alarmed mode
 */
CarAlarm.prototype.alarm = function () {
	var self = this;

	this.state = alarmStates.alarmed;

	setTimeout(function () {
		if (self.state === alarmStates.alarmed) {
			self.state = alarmStates.turnedOn;
		}
	}, this.interval);
};

/**
 * Internal method that turns on the alarm
 */
CarAlarm.prototype._turnOn = function () {
	this.state = alarmStates.turnedOn;
};

/**
 * internal method that turns off the alarm
 */
CarAlarm.prototype._turnOff = function () {
	this.state = alarmStates.turnedOff;
};

// ---------------Blinker------------------
var Blinker = module.exports.Blinker = function () {};

Blinker.prototype.blink = function () {
	console.log('I\'m blinking');
};

// ---------------Beeper-------------------
var Beeper = module.exports.Beeper = function () {};

Beeper.prototype.beep = function () {
	console.log('I\'m beeping');
};