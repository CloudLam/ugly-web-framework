/* selects.js | @cloudlam */

'use strict';

function Selects(object) {
  if (!object.node || object.node.tagName.toLowerCase() != 'select') {
    throw new Error('Unknown target, only select tag supported');
  }

  var selects = {
    node: object.node || null,
    name: object.name || '',
    class: object.class || 'uwf-selects',
    selected: [],
    options: [],
    init: _init
  };

  function _init (request, callback) {
    var div = document.createElement('div');
    var span = document.createElement('span');
    var list = document.createElement('ul');

    div.style.width = getStyle(this.node, 'width');
    div.style.height = getStyle(this.node, 'height');
    div.style.lineHeight = getStyle(this.node, 'height');
    div.style.textAlign = 'left';
    div.style.verticalAlign = getStyle(this.node, 'vertical-align');
    div.style.display = 'inline-block';
    div.setAttribute('class', this.class);

    span.innerHTML = '&#10010;';
    span.style.float = 'right';
    span.style.cursor = 'pointer';
    span.style.height = getStyle(this.node, 'height');
    span.onclick = function (event) {
      list.style.display = 'block';
    };

    list.style.display = 'none';

    div.appendChild(span);
    div.appendChild(list);

    this.node.parentNode.insertBefore(div, this.node);

    this.node.height = '0';
    this.node.border = '0';
    this.node.style.display = 'none';

    if (!request) {
      var options = this.node.options;
      for (var i = 0; i < options.length; i++) {
        this.options.push([options[i].value, options[i].innerText]);
      }
      _listInit.call(this, list);
      _listener.call(this);
      if (callback) {
        callback();
      }
    } else {
      ajax({
        method: 'get',
        url: request,
        success: function(result) {
          var options = JSON.parse(result).data;
          for (var i = 0; i < options.length; i++) {
            _this.options.push([options[i].value, options[i].innerText]);
          }
          _listInit.call(_this, list);
          _listener.call(_this);
          if (callback) {
            callback();
          }
        }
      });
    }
  }

  function _listInit(container) {
    var list = '';
    for (var i = 0; i < this.options.length; i++) {
      list += '<li value="' + this.options[i][0] + '">' + this.options[i][1] + '</li>';
    }
    container.innerHTML = list;
  }

  function _listener() {}

  return selects;
}
