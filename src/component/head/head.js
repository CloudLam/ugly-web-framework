/* head.js | @cloudlam */

'use strict';

function Head (object) {
  object = object || {};

  var parent = object.parent || document.getElementById('app');

  var head = {
    init: _init
  }

  var prop = {
    node: null,
    title: object.title || '',
    subtitle: object.subtitle || '',
    type: object.type || 0,
    color: object.color || ''
  }
  Object.defineProperties(head, {
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
        this.node.setAttribute('class', ('uwf-head short ' + this.color).replace(/(^\s*)|(\s*$)/g, ""));
      } else {
        this.node.setAttribute('class', ('uwf-head ' + this.color).replace(/(^\s*)|(\s*$)/g, ""));
      }
    }
  }

  return head;
}
