const { Router } = require('express');
const fetch = require('node-fetch');

const { services, service, version } = require('../config');

const router = new Router();

router.get('/', (req, res) => {
    res.json({
        service,
        version,
    });
});

router.get('/svc1', async (req, res) => {
    const response = await fetch(services.svc1);
    res.json(await response.json());
});

router.get('/svc2', async (req, res) => {
    const response = await fetch(services.svc2);
    res.json(await response.json());
});

router.get('/svc3', async (req, res) => {
    const response = await fetch(services.svc3);
    res.json(await response.json());
});

module.exports = router;
