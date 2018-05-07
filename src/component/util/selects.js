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
    var container = document.createElement('div');

    container.style.position = 'relative';
    container.style.width = getStyle(this.node, 'width');
    container.style.height = getStyle(this.node, 'height');
    container.style.verticalAlign = getStyle(this.node, 'vertical-align');
    container.style.display = 'inline-block';

    this.node.parentNode.insertBefore(container, this.node);

    this.node.height = '0';
    this.node.border = '0';
    this.node.style.display = 'none';
  }

  return selects;
}
