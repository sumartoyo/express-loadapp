var finalhandler = require('finalhandler');

module.exports = (app, path) => {
  app.handle = function handle(req, res, callback) {
    var router = this._router;

    // final handler
    var done = callback || finalhandler(req, res, {
      env: this.get('env'),
      onerror: logerror.bind(this)
    });

    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    });
    delete this._router;

    this.lazyrouter();

    var initApp = require(path);
    initApp(this);

    router = this._router;

    // no routes
    if (!router) {
      debug('no routes defined on app');
      done();
      return;
    }

    router.handle(req, res, done);
  };
}

function logerror(err) {
  /* istanbul ignore next */
  if (this.get('env') !== 'test') console.error(err.stack || err.toString());
}
