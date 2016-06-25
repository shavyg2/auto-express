'use strict';

var _ControllerBooter = require('./lib/ControllerBooter');

var _ControllerBooter2 = _interopRequireDefault(_ControllerBooter);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hot_pepper_logger = require('hot-pepper-logger-interface/lib/FileLogInterface').default || require('hot-pepper-logger-interface/lib/FileLogInterface');
hot_pepper_logger = new hot_pepper_logger({ 'file': 'logger.log' });

var booter = new _ControllerBooter2.default(_express2.default);
hot_pepper_logger.log({
    'filename': 'C:\\Users\\shava\\Documents\\dev\\TaskFactor\\src\\app\\boot.js',
    'variable': 'booter'
}, booter);
booter.start();
booter.listen(3000);