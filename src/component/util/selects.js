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
    var div = document.createElement('div');
    var span = document.createElement('span');

    div.style.position = 'relative';
    div.style.width = getStyle(this.node, 'width');
    div.style.height = getStyle(this.node, 'height');
    div.style.lineHeight = getStyle(this.node, 'height');
    div.style.textAlign = 'left';
    div.style.verticalAlign = getStyle(this.node, 'vertical-align');
    div.style.display = 'inline-block';

    span.innerHTML = '&#10010;';
    span.style.float = 'right';
    span.style.cursor = 'pointer';
    span.style.height = getStyle(this.node, 'height');

    div.appendChild(span);

    this.node.parentNode.insertBefore(div, this.node);

    this.node.height = '0';
    this.node.border = '0';
    this.node.style.display = 'none';
  }

  return selects;
}
