const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const cors = require('cors');

const config = require('./config');
const api = require('./api');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'demo-app-api-server' },
    transports: [new winston.transports.Console()],
});

const app = express();

app.use(cors());

app.use(expressWinston.logger({
    winstonInstance: logger,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
    msg: 'HTTP {{req.method}} {{req.url}}',
}));

app.use('/api', api);

app.get('/healthz', (req, res) => {
    res.status(200).send('ok');
});

app.get('/readyz', (req, res) => {
    res.status(200).send('ok');
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    next();
});

app.listen(config.port, () => {
    logger.info(`app listening on port: ${config.port}`);
});
