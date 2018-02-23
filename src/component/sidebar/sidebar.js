/* sidebar.js | @cloudlam */

'use strict';

// Sidebar Buttons Config
var SIDEBAR_BUTTON = {
  'person': {
    'icon': 'person',
    'name': 'PERSON',
    'href': '',
    'sub': {
      'info': {'name': 'INFORMATION', 'href': '#person/info'},
      'password': {'name': 'CHANGE PWD', 'href': '#'}
    }
  },
  'group': {
    'icon': 'group',
    'name': 'GROUP',
    'href': '',
    'sub':  {
      'info': {'name': 'INFORMATION', 'href': '#'}
    }
  },
  'subject': {
    'icon': 'subject',
    'name': 'SUBJECT',
    'href': '',
    'sub':  {
      'project': {'name': 'PROJECT', 'href': '#'},
      'requirement': {'name': 'REQUIREMENT', 'href': '#'},
      'task': {'name': 'TASK', 'href': '#'}
    }
  },
  'share': {
    'icon': 'share',
    'name': 'SHARE',
    'href': '',
    'sub': {}
  },
  'setting': {
    'icon': 'settings',
    'name': 'SETTING',
    'href': '#setting',
    'sub': {}
  },
  'about': {
    'icon': 'help',
    'name': 'ABOUT',
    'href': '',
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
    color: object.color || 'blue',
    type: object.type || 0
  }
  Object.defineProperties(sidebar, {
    'node': {
      get: function () {
        return prop.node;
      },
      set: function (value) {
        prop.node = value;
        _setColor.call(this);
        _setType.call(this, app.type);
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
    },
    'type': {
      get: function () {
        return prop.type;
      },
      set: function (value) {
        prop.type = value;
        _setType.call(this);
      }
    }
  });

  function _init (app) {
    // Sidebar Buttons
    var buttons = [];
    for (var button in SIDEBAR_BUTTON) {
      buttons.push({
        'sidebar-button-id': button,
        'sidebar-button-icon': SIDEBAR_BUTTON[button]['icon'],
        'sidebar-button-name': SIDEBAR_BUTTON[button]['name'],
        'sidebar-button-href': SIDEBAR_BUTTON[button]['href']
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
      if (app) app.type = app.type ? 0 : 1;
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

  function _setType () {
    if (this.node) {
      if (this.type) {
        this.node.setAttribute('class', this.node.getAttribute('class') + ' long');
        this.node.lastChild.firstChild.innerHTML = 'keyboard_arrow_left';
      } else {
        this.node.setAttribute('class', this.node.getAttribute('class').replace(' long', ''));
        this.node.lastChild.firstChild.innerHTML = 'keyboard_arrow_right';
      }
    }
  }

  return sidebar;
}
