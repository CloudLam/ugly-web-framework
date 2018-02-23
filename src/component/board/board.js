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
        this.node.setAttribute('class', this.node.getAttribute('class') + ' short');
      } else {
        this.node.setAttribute('class', this.node.getAttribute('class').replace(' short', ''));
      }
    }
  }

  return board;
}
