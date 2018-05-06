/* selects.js | @cloudlam */

'use strict';

function Selects(object) {
  if (!object.node || object.node.tagName.toLowerCase() != 'select') {
    throw new Error('Unknown target, only select tag supported');
  }

  var selects = {
    node: object.node || null,
    name: object.name || '',
    selected: [],
    options: {},
    init: _init
  };

  function _init () {
    this.node.style.height = '0';
    this.node.style.border = '0';
    this.node.style.opacity = '0';
    this.node.setAttribute('disabled', '');
  }

  return selects;
}
