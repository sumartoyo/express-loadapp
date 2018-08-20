const express = require('express');
const loadapp = require('../../express-loadapp');

const app = express();

if (app.get('env') !== 'production') {
  loadapp(app, require.resolve('./app'));
} else {
  require('./app')(app);
}

const PORT = 7000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
