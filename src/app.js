const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

const routerApi = require('./features/loader');

const logger = require('./../src/features/logger/logger');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('.././middlewares/error.handler');

// const optionsHTTPS = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const app = express();

app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
);

app.use(morgan('combined', {
  stream: {
      write: (message) => logger.info(message.trim())
  }
}));

const corsOptions = {
  origin: ['http://192.168.1.78/', 'http://192.168.1.78/'],
};

app.get('/CheckHealth', (req, res) => {
  res.send('Online');
});

routerApi(app, corsOptions);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use('/public', express.static(path.join(__dirname, 'public')));

module.exports = app;