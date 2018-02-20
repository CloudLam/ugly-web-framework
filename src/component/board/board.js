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
      parent.appendChild(board.node);
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
