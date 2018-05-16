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
      _listener.call(this, span, list);
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
          _listener.call(_this, span, list);
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

  function _add (value) {
    if (!value) {
      return;
    }
    if (this.selected.indexOf(value) > -1) {
      return;
    } else {
      this.selected.push(value);
    }
  }

  function _remove (value) {
    if (!value) {
      return;
    }
    if (this.selected.indexOf(value) > -1) {
      this.selected.splice(this.selected.indexOf(value), 1);
    }
  }

  function _selected (target) {
    if (target.hasAttribute('checked')) {
      target.removeAttribute('checked');
      _remove.call(selects, target.getAttribute('value'));
    } else {
      target.setAttribute('checked', '');
      _add.call(selects, target.getAttribute('value'));
    }
  }

  function _listener(span, list) {
    document.addEventListener('click', function (event) {
      if (event.target.parentNode == list) {
        _selected(event.target);
      } else if (event.target != list && event.target != span) {
        list.style.display = 'none';
      }
    }, false);
  }

  return selects;
}
