/* board.js | @cloudlam */

'use strict';

function Board (object) {
  object = object || {};

  var parent = object.parent || document.getElementById('app');

  var board = {
    tab: new Tab(),
    card: null,
    init: _init,
    setType: _setType
  }

  var prop = {
    node: null,
    type: object.type || 0
  }
  Object.defineProperties(board, {
    'node': {
      get: function () {
        return prop.node;
      },
      set: function (value) {
        prop.node = value;
        _setType.call(this);
        _setColor.call(this);
      }
    },
    'type': {
      get: function () {
        return prop.type;
      },
      set: function (value) {
        prop.type = value;
        _setType.call(this);
      }
    },
    'color': {
      get: function () {
        return prop.color;
      },
      set: function (value) {
        prop.color = value;
        _setColor.call(this);
      }
    }
  });

  function _init (callback) {
    this.tab = new Tab();
    load({
      url: './component/board/board.html'
    }, function (xhr, dom) {
      board.node = dom[0];
      board.tab.node = dom[0].children[0];
      board.tab.init(callback);
      board.card = dom[0].children[1];
      parent.appendChild(board.node);
      _listenerInit();
    });
  }

  function _listenerInit () {
    delegate('uwf-tabs', 'click', 'uwf-tab-close', function(event) {
      board.tab.close(event.target.parentNode.id);
    });
    delegate('uwf-tabs', 'click', 'uwf-tab', function(event) {
      board.tab.open(event.target.id || event.target.parentNode.id);
    });
  }

  function _setType () {
    if (this.node) {
      if (this.type) {
        if (this.node.getAttribute('class').indexOf('short') > -1) {
          return;
        }
        this.node.setAttribute('class', this.node.getAttribute('class') + ' short');
      } else {
        this.node.setAttribute('class', this.node.getAttribute('class').replace(' short', ''));
      }
    }
  }

  function _setColor () {
    if (this.node) {
      if (this.type) {
        this.node.setAttribute('class', ('uwf-board short ' + this.color).replace(/(^\s*)|(\s*$)/g, ""));
      } else {
        this.node.setAttribute('class', ('uwf-board ' + this.color).replace(/(^\s*)|(\s*$)/g, ""));
      }
    }
  }

  return board;
}
