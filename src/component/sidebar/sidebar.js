/* sidebar.js | @cloudlam */

'use strict';

// Sidebar Buttons Config
var SIDEBAR_BUTTON = {
  'person': {
    'icon': 'person',
    'name': 'PERSON',
    'sub': {
      'info': {'name': 'INFORMATION', 'href': '#person/info'},
      'password': {'name': 'CHANGE PWD', 'href': '#'}
    }
  },
  'group': {
    'icon': 'group',
    'name': 'GROUP',
    'sub':  {
      'info': {'name': 'INFORMATION', 'href': '#'}
    }
  },
  'subject': {
    'icon': 'subject',
    'name': 'SUBJECT',
    'sub':  {
      'project': {'name': 'PROJECT', 'href': '#'},
      'requirement': {'name': 'REQUIREMENT', 'href': '#'},
      'task': {'name': 'TASK', 'href': '#'}
    }
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

  var parent = object.parent || document.getElementById('app');

  var sidebar = {
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
      url: './component/sidebar/sidebar.html'
    }, function (xhr, dom) {
      sidebar.node = dom[0];
      parent.appendChild(sidebar.node);
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

  function _listenerInit () {
    delegate('uwf-sidebar-more', 'click', 'uwf-sidebar-more', function(event) {
      if (sidebar.node.getAttribute('class').indexOf('long') > -1) {
        sidebar.node.setAttribute('class', sidebar.node.getAttribute('class').replace('long', ''));
        this.children[0].innerHTML = 'keyboard_arrow_right';
      } else {
        sidebar.node.setAttribute('class', sidebar.node.getAttribute('class') + ' long');
        this.children[0].innerHTML = 'keyboard_arrow_left';
      }
    });
  }

  function _subMenuInit () {
    for (var button in SIDEBAR_BUTTON) {
      if (!SIDEBAR_BUTTON[button]['sub'] || isEmptyObject(SIDEBAR_BUTTON[button]['sub'])) {
        continue;
      }
      var element = document.getElementById(button);
      var submenu = '<ul class="uwf-sidebar-submenu"><span class="triangle"></span>' + 
        '<li><label class="uwf-sidebar-submenu-title">' + SIDEBAR_BUTTON[button]['name'] + '</label></li>';
      for (var key in SIDEBAR_BUTTON[button]['sub']) {
        submenu += '<li id="' + 
          button + '_' + key + 
          '" class="uwf-sidebar-submenu-button"><a href="' + 
          SIDEBAR_BUTTON[button]['sub'][key]['href'] + '"><label>' + 
          SIDEBAR_BUTTON[button]['sub'][key]['name'] + 
          '</a></label></li>';
      }
      submenu += '</ul>';
      element.appendChild(parseDOM(submenu)[0]);
    }
  }

  function _setColor () {
    if (this.node) {
      this.node.setAttribute('class', 'uwf-sidebar ' + this.color);
    }
  }

  return sidebar;
}
