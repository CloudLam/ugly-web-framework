/* app.js | @cloudlam */

'use strict';

var app = new Application();

window.onload = function () {
  app.init();
}

function Application () {
  var app = {
    router: null,
    head: null,
    sidebar: null,
    borad: null,
    tab: null,
    init: _init
  };

  var prop = {
    type: 0 // 0: Simplified, 1: Detailed
  }
  Object.defineProperties(app, {
    'type': {
      get: function () {
        return prop.type;
      },
      set: function (value) {
        prop.type = value;
        _setType.call(this);
      }
    }
  });

  function _init () {
    // Router
    this.router = new Router();
    this.router.init();

    // Head
    this.head = new Head();
    this.head.init();

    // Sidebar
    this.sidebar = new Sidebar();
    this.sidebar.init(this);

    // Board
    this.board = new Board();
    this.board.init();

    // Routes
    var _this = this;
    this.router.route('person/info', function () {
      console.log('person/info');
    });
    this.router.route('setting', function () {
      _this.board.card.innerHTML = '';
      _this.board.tab.create({
        'tab-id': 'setting', 
        'tab-title': 'SETTING'
      }, function () {
        load({
          node: _this.board.card,
          url: './component/page/setting.html'
        }, function (xhr, dom) {});
      });
    });
  }

  function _setType() {
    this.head.setType(this.type);
    this.sidebar.setType(this.type);
    this.board.setType(this.type);
  }

  return app;
}
