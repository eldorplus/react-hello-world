const express = require('express');

const app = express();

app.use(express.static('static'));

const port = process.env.PORT || 8000;
const instance = parseInt(process.env.NODE_APP_INSTANCE, 10) + 1 || 0;
const instances = process.env.instances ? ` ${instance}/${process.env.instances}` : '';
const name = process.env.name || 'node';

app.listen(port, () => {
  console.log(`${name}${instances} listening on port ${port}`); // eslint-disable-line no-console
});
