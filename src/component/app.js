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
    this.board.init(function () {
      location.hash = '';
      location.hash = 'welcome';
    });

    // Routes
    var _this = this;
    this.router.route('welcome', function () {
      _this.board.card.innerHTML = '';
      _this.board.tab.create('welcome', {
        'tab-id': 'welcome', 
        'tab-title': 'WELCOME'
      }, function () {});
    });
    this.router.route('person/info', function () {
      console.log('person/info');
    });
    this.router.route('setting', function () {
      _this.board.card.innerHTML = '';
      _this.board.tab.create('setting', {
        'tab-id': 'setting', 
        'tab-title': 'SETTING'
      }, function () {
        load({
          node: _this.board.card,
          url: './component/page/setting.html'
        }, function (xhr, dom) {
          settingInit(app);
        });
      });
    });

    // Local Settings
    app.type = parseInt(localStorage.getItem('uwfAppType')) || 0;
    app.sidebar.color = localStorage.getItem('uwfAppColor') || 'blue';
  }

  function _setType() {
    this.head.type = this.type;
    this.sidebar.type = this.type;
    this.board.type = this.type;
  }

  return app;
}
