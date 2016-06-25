'use strict';

var hot_pepper_logger = require('hot-pepper-logger-interface/lib/FileLogInterface').default || require('hot-pepper-logger-interface/lib/FileLogInterface');
hot_pepper_logger = new hot_pepper_logger({ 'file': 'logger.log' });