# Express LoadApp

Auto reload express app without restarting the process or the HTTP server.

```js
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(8080);
```

If you change `hello world` to `hello beautiful` the change won't take effect unless you restart the process. Express LoadApp automatically reload your code everytime it changes.

```js
const express = require('express');
const loadapp = require('express-loadapp');
const app = express();
loadapp(app, require.resolve('./app'));
app.listen(8080);
```

```js
// app.js
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });
}
```

Now everytime app.js and any other file referenced by app.js is changed the changes will take effect immediately when you access the server.

The difference between this library and other auto-reload library is that this library doesn't perform auto-reload by restarting the process or server but it re-require your code/module (after deleting the caches). Read [index.js](/index.js) for the implementation.

## Usage

```js
loadapp(expressApp, fullPathToFile);
```

- `expressApp` is the thing you create from calling `express()`.
- `fullPathToFile` is the "main" file to be autoreloaded. Writing full path as `/home/myname/myproject/myfile.js` is super dumb so it is recommended to write it as `require.resolve('./myfile')`.
- The "main" file must exports a function that has one parameter which is `expressApp`. Use it to write middlewares and routes and everything. Read [example/app.js](/example/app.js) for an example.

Note that Express LoadApp is intended for development uses only. It re-require the "main" code which practically load the whole app and it isn't wise to do it in every request in production environment. You can do something like this (can be seen in [example/index.js](/example/index.js)):

```js
const app = express();
if (app.get('env') !== 'production') {
  loadapp(app, require.resolve('./app'));
} else {
  require('./app')(app);
}
```

## Installation

Just copy the file. Not on npm (yet) because it's so darn simple I don't think it's "package" worthy.
