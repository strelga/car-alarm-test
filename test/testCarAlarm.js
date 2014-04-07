"use strict";

var assert = require('assert')
	, sinon = require('sinon')
	, alarm = require('../src/alarm.js')
	;

describe('CarAlarm', function () {
	var CarAlarm = alarm.CarAlarm;
	var Beeper = alarm.Beeper;
	var Blinker = alarm.Blinker;
	var alarmStates = alarm.alarmStates;

	describe('Basic tests', function () {
		describe('Constructor with parameters', function () {
			it('initiates disarmed', function () {
				var beeper = new Beeper();
				var blinker = new Blinker();
				var carAlarm = new CarAlarm(beeper, blinker);

				assert.equal(carAlarm.state, alarmStates.turnedOff);
			});
		});

		describe('Constructor without parameters', function () {
			it('initiates disarmed', function () {
				var carAlarm = new CarAlarm();

				assert.equal(carAlarm.state, alarmStates.turnedOff);
			});
		});
	});

	describe('Button tests after startup', function () {
		var beeper;
		var blinker;
		var carAlarm;

		beforeEach(function () {
			beeper = new Beeper();
			sinon.stub(beeper, 'beep', function () {});
			
			blinker = new Blinker();
			sinon.stub(blinker, 'blink', function () {});
			
			carAlarm = new CarAlarm(beeper, blinker);
		});

		describe('Button 1 pushed', function () {
			it('beeps once', function () {
				carAlarm.handleButton1();
				assert(beeper.beep.calledOnce);
			});

			it('blinks once', function () {
				carAlarm.handleButton1();
				assert(blinker.blink.calledOnce);
			});

			it('turns alarm turned on', function () {
				carAlarm.handleButton1();
				assert.equal(carAlarm.state, alarmStates.turnedOn);
			});
		});

		describe('Button 2 pushed', function () {
			it('beeps twice', function () {
				carAlarm.handleButton2();
				assert(beeper.beep.calledTwice);
			});

			it('blinks twice', function () {
				carAlarm.handleButton2();
				assert(blinker.blink.calledTwice);
			});

			it('leaves alarm off', function () {
				carAlarm.handleButton2();
				assert.equal(carAlarm.state, alarmStates.turnedOff);
			});
		});
	});

	describe('Alarm tests', function () {
		var beeper;
		var blinker;
		var carAlarm;
		
		beforeEach(function () {
			beeper = new Beeper();
			sinon.stub(beeper, 'beep', function () {});
			
			blinker = new Blinker();
			sinon.stub(blinker, 'blink', function () {});
			
			carAlarm = new CarAlarm(beeper, blinker);

			carAlarm.alarm();
		});

		describe('Fire alarm', function () {
			it('alarms', function () {
				assert.equal(carAlarm.state, alarmStates.alarmed);
			});
		});

		describe('Button 1 pushed while alarm', function () {
			it('beeps once', function () {
				carAlarm.handleButton1();
				assert(beeper.beep.calledOnce);
			});

			it('blinks once', function () {
				carAlarm.handleButton1();
				assert(blinker.blink.calledOnce);
			});

			it('turns off alarmed mode and leaves alarm on', function () {
				carAlarm.handleButton1();
				assert.equal(carAlarm.state, alarmStates.turnedOn);
			});
		});

		describe('Button 2 pushed while alarm', function () {
			it('beeps twice', function () {
				carAlarm.handleButton2();
				assert(beeper.beep.calledTwice);
			});

			it('blinks twice', function () {
				carAlarm.handleButton2();
				assert(blinker.blink.calledTwice);
			});

			it('turns alarmed mode off and alarm itself off', function () {
				carAlarm.handleButton2();
				assert.equal(carAlarm.state, alarmStates.turnedOff);
			});
		});
	});
});