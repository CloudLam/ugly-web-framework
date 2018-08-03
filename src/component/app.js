/* app.js | @cloudlam */

'use strict';

var app = new Application({
  name: 'Ugly Web Framework'
});

window.onload = function () {
  app.init();
}

function Application (object) {
  object = object || {};

  var app = {
    name: object.name || '',
    router: null,
    head: null,
    sidebar: null,
    board: null,
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
    // Title
    document.title = this.name;

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

    // Notice
    this.notice = new Notice();
    this.notice.init();

    // Routes
    Routes(this);

    // Date Picker
    var datepicker = new DatePicker();

    // Local Settings
    app.type = parseInt(localStorage.getItem('uwfAppType')) || 0;
    app.sidebar.color = localStorage.getItem('uwfAppColor') || 'black';
    app.head.color = localStorage.getItem('uwfAppHeadColor') || '';
    app.board.color = localStorage.getItem('uwfAppHeadColor') || '';
  }

  function _setType() {
    this.head.type = this.type;
    this.sidebar.type = this.type;
    this.board.type = this.type;
  }

  return app;
}
