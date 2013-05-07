/* nodejs test script */

'use strict';

var Memory = require('./memory.js');
var RegisterFile = require('./register_file.js');
var InstructionType = require('./instruction_type.js');
var ReservationStation = require('./reservation_station.js');
var CommonDataBus = require('./common_data_bus.js');
var Instruction = require('./instruction.js');
var Main = require('./main.js');

var System = {};
System.memory = new Memory(4096);
System.registerFile = new RegisterFile(20, 'F');
System.commonDataBus = new CommonDataBus();
System.reservationStations = {
	ADD_1: new ReservationStation('ADD_1'),
	ADD_2: new ReservationStation('ADD_2'),
	ADD_3: new ReservationStation('ADD_3'),

	MUL_1: new ReservationStation('MUL_1'),
	MUL_2: new ReservationStation('MUL_2'),

	LOAD_1: new ReservationStation('LOAD_1'),
	LOAD_2: new ReservationStation('LOAD_2'),
	LOAD_3: new ReservationStation('LOAD_3'),

	STORE_1: new ReservationStation('STORE_1'),
	STORE_2: new ReservationStation('STORE_2'),
	STORE_3: new ReservationStation('STORE_3')

};

System.instructionTypes = {
	'ADDD': new InstructionType('ADDD', 2, 0,
	                            [InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER],
	                            function(p) { return p[1] + p[2]; },
	                            [System.reservationStations['ADD_1'],
	                             System.reservationStations['ADD_2'],
	                             System.reservationStations['ADD_3']]),

	'SUBD': new InstructionType('SUBD', 2, 0,
	                            [InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER],
	                            function(p) { return p[1] - p[2]; },
	                            [System.reservationStations['ADD_1'],
	                             System.reservationStations['ADD_2'],
	                             System.reservationStations['ADD_3']]),

	'MULD': new InstructionType('MULD', 10, 0,
	                            [InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER],
	                            function(p) { return p[1] * p[2]; },
	                            [System.reservationStations['MUL_1'],
	                             System.reservationStations['MUL_2']]),

	'DIVD': new InstructionType('DIVD', 40, 0,
	                            [InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER,
	                             InstructionType.PARAMETER_TYPE_REGISTER],
	                            function(p) { return p[1] / p[2]; },
	                            [System.reservationStations['MUL_1'],
	                             System.reservationStations['MUL_2']]),

	'LD': new InstructionType('LD', 2, 0,
	                          [InstructionType.PARAMETER_TYPE_REGISTER,
	                           InstructionType.PARAMETER_TYPE_ADDRESS],
							  function(p, memory) { return memory.load(p[1]); },
	                          [System.reservationStations['LOAD_1'],
							   System.reservationStations['LOAD_2'],
	                           System.reservationStations['LOAD_3']]),

	'ST': new InstructionType('ST', 2, -1,
	                          [InstructionType.PARAMETER_TYPE_REGISTER,
	                           InstructionType.PARAMETER_TYPE_ADDRESS],
							  function(p, memory) { return p[0]; },
	                          [System.reservationStations['STORE_1'],
							   System.reservationStations['STORE_2'],
	                           System.reservationStations['STORE_3']])
};


var main = new Main(' ld F6, 105' +
					 ' ld f2, 101' +
					 ' muld f0, f2, f4' +
					 ' subd f8, f6, f2' +
					 ' divd f10, f0, f6' +
					 ' addd f6, f8, f2' +
					 '', System);
main.run();
console.log(main.instructions);

