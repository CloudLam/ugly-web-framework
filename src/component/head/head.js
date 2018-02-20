/* head.js | @cloudlam */

'use strict';

function Head (object) {
  object = object || {};

  var parent = object.parent || document.getElementById('app');

  var head = {
    node: null,
    init: _init,
    setType: _setType
  }

  var prop = {
    title: object.title || '',
    subtitle: object.subtitle || ''
  }
  Object.defineProperties(head, {
    'title': {
      get: function () {
        return prop.title;
      },
      set: function (value) {
        prop.title = value;
        _setTitle.call(this);
      }
    },
    'subtitle': {
      get: function () {
        return prop.subtitle;
      },
      set: function (value) {
        prop.subtitle = value;
        _setTitle.call(this);
      }
    }
  });

  function _init () {
    load({
      url: './component/head/head.html'
    }, function (xhr, dom) {
      head.node = dom[0];
      head.title = 'TITLE';
      head.subtitle = 'SUBTITLE';
      parent.appendChild(head.node);
    });
  }

  function _setTitle () {
    this.node.children[0].innerHTML = this.title;
    this.node.children[1].innerHTML = this.subtitle;
  }

  function _setType (type) {
    if (type) {
      this.node.setAttribute('class', this.node.getAttribute('class') + ' short');
    } else {
      this.node.setAttribute('class', this.node.getAttribute('class').replace(' short', ''));
    }
  }

  return head;
}
