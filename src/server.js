const app = require('./app');
const { port } = require('./config/env');
const logger = require('./config/logger');

const server = app.listen(port, () => logger.info(`api listening on :${port}`));

process.on('SIGINT', () => { server.close(() => process.exit(0)); });
process.on('SIGTERM', () => { server.close(() => process.exit(0)); });
