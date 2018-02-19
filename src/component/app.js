/* app.js | @cloudlam */

'use strict';

var app = new Application();

window.onload = function () {
  app.init();
}

function Application () {
  var app = {
    router: null,
    sidebar: null,
    init: _init
  };

  function _init () {
    // Router
    this.router = new Router();
    this.router.init();

    // Routes
    this.router.route('person/info', function () {
      console.log('person/info');
    });

    // Head
    this.head = new Head();
    this.head.init();

    // Sidebar
    this.sidebar = new Sidebar();
    this.sidebar.init();
  }

  return app;
}
