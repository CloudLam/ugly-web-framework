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
    this.router.route('index', function () {
      _this.board.card.innerHTML = '';
      app.head.title = 'TITLE';
      app.head.subtitle = 'SUBTITLE';
    });
    this.router.route('welcome', function () {
      _this.board.card.innerHTML = '';
      _this.board.tab.create('welcome', {
        'tab-id': 'welcome', 
        'tab-title': 'WELCOME'
      }, function () {
        app.head.title = 'TITLE';
        app.head.subtitle = 'SUBTITLE';
        load({
          node: _this.board.card,
          url: './component/page/welcome.html'
        }, function (xhr, dom) {});
      });
    });
    this.router.route('table', function () {
      _this.board.card.innerHTML = '';
      _this.board.tab.create('table', {
        'tab-id': 'table', 
        'tab-title': 'TABLE'
      }, function () {
        app.head.title = 'TABLE';
        app.head.subtitle = '';
        load({
          node: _this.board.card,
          url: './component/page/table.html'
        }, function (xhr, dom) {
          var table = new Table({
            parent: dom[0],
            col: ['NO.', 'NAME', 'GENDER', 'AGE', 'JOB'],
            source: [['1', 'Apple', 'Female', '18', 'Student'], ['2', 'Banana', 'Female', '30', 'Teacher']],
            render: {
              search: {
                id: 'uwf-table',
                class: 'uwf-table-search',
                title: '<i class="material-icons">search</i>'
              },
              page: {
                class: 'uwf-table-page',
                first: '<i class="material-icons">first_page</i>',
                prev: '<i class="material-icons">chevron_left</i>',
                next: '<i class="material-icons">chevron_right</i>',
                last: '<i class="material-icons">last_page</i>',
                more: '<i class="material-icons">more_horiz</i>',
              }
            }
          });
          table.init();
        });
      });
    });
    this.router.route('setting', function () {
      _this.board.card.innerHTML = '';
      _this.board.tab.create('setting', {
        'tab-id': 'setting', 
        'tab-title': 'SETTING'
      }, function () {
        app.head.title = 'SETTING';
        app.head.subtitle = '';
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
