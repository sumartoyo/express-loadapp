const express = require('express');
const loadapp = require('../../express-loadapp');

const app = express();

loadapp(app, require.resolve('./app'), app.get('env') !== 'production');

const PORT = 7000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
