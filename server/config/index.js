const packagejson = require('../../package.json');

const development = {
    services: {
        svc1: 'http://localhost:8081',
        svc2: 'http://localhost:8082',
        svc3: 'http://localhost:8083',
    },
};

const kubernetes = {
    services: {
        svc1: 'http://svc1',
        svc2: 'http://svc2',
        svc3: 'http://svc3',
    },
};

module.exports = {
    version: packagejson.version,
    service: packagejson.name,
    port: parseInt(process.env.PORT, 10) || 8080,
    ...(process.env.ENV === 'production' ? kubernetes : development),
};
