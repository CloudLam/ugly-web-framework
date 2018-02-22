/* board.js | @cloudlam */

'use strict';

function Board (object) {
  object = object || {};

  var parent = object.parent || document.getElementById('app');

  var board = {
    node: null,
    tab: new Tab(),
    card: null,
    init: _init,
    setType: _setType
  }

  function _init () {
    this.tab = new Tab();
    load({
      url: './component/board/board.html'
    }, function (xhr, dom) {
      board.node = dom[0];
      board.tab.node = dom[0].children[0];
      board.tab.init();
      board.card = dom[0].children[1];
      parent.appendChild(board.node);
      _listenerInit();
      board.tab.create({
        'tab-id': 'welcome', 
        'tab-title': 'WELCOME'
      }, function () {
        board.card.innerHTML = '';
      });
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

  function _setType (type) {
    if (type) {
      this.node.setAttribute('class', this.node.getAttribute('class') + ' short');
    } else {
      this.node.setAttribute('class', this.node.getAttribute('class').replace(' short', ''));
    }
  }

  return board;
}
