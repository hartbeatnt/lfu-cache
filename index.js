var cache = require('./lfu-cache');
const assert = (expect, describe) => console[expect ? 'log' : 'error'](describe);