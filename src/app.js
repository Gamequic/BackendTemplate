const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const routerApi = require('./features/loader');

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

const corsOptions = {
  origin: ['http://192.168.1.78/', 'http://192.168.1.78/'],
};

app.get('/', (req, res) => {
  res.send('Online');
});

routerApi(app, corsOptions);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use('/public', express.static(path.join(__dirname, 'public')));

module.exports = app;