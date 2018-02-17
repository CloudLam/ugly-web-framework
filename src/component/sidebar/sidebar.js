/* sidebar.js | @cloudlam */

'use strict';

// Sidebar Buttons Config
var SIDEBAR_BUTTON = {
  'person': {
    'icon': 'person',
    'name': 'PERSON',
    'sub': {}
  },
  'group': {
    'icon': 'group',
    'name': 'GROUP',
    'sub': {}
  },
  'subject': {
    'icon': 'subject',
    'name': 'SUBJECT',
    'sub': {}
  },
  'share': {
    'icon': 'share',
    'name': 'SHARE',
    'sub': {}
  },
  'setting': {
    'icon': 'settings',
    'name': 'SETTING',
    'sub': {}
  },
  'about': {
    'icon': 'help',
    'name': 'ABOUT',
    'sub': {}
  }
}

function Sidebar (object) {
  object = object || {};

  var sidebar = {
    parent: object.parent || document.getElementById('app'),
    init: _init
  };

  var prop = {
    node: null,
    color: object.color || 'blue'
  }
  Object.defineProperties(sidebar, {
    'node': {
      get: function () {
        return prop.node;
      },
      set: function (value) {
        prop.node = value;
        _setColor.call(this);
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
    // Sidebar Buttons
    var buttons = [];
    for (var button in SIDEBAR_BUTTON) {
      buttons.push({
        'sidebar-button-id': button,
        'sidebar-button-icon': SIDEBAR_BUTTON[button]['icon'],
        'sidebar-button-name': SIDEBAR_BUTTON[button]['name']
      });
    }
    load({
      node: this.parent,
      url: './component/sidebar/sidebar.html'
    }, function (xhr, dom) {
      sidebar.node = dom[0];
      _listenerInit();
      load({
        node: document.getElementById('uwf-sidebar-buttons'),
        url: './component/sidebar/button.html',
        data: buttons
      }, function (xhr, dom) {
        _subMenuInit();
      });
    });
  }

  function _listenerInit () {}

  function _subMenuInit () {
    var element = document.getElementById('person');
    var submenu = '<div class="uwf-sidebar-submenu"><span class="triangle hide"></span></div>';
    element.appendChild(parseDOM(submenu)[0]);
  }

  function _setColor () {
    if (this.node) {
      this.node.setAttribute('class', 'uwf-sidebar ' + this.color);
    }
  }

  return sidebar;
}
