const config = require('./config/config');
const app = require('./src/app');

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`App runing on port: ${port}`);
});
