const config = require('./config/config');
const logger = require('./src/features/logger/logger')
const app = require('./src/app');

const port = config.port || 3000;

app.listen(port, () => {
    logger.info(`App runing on port: ${port}`);
});
