/* sidebar.config.js | @cloudlam */

'use strict';

// Sidebar Buttons Config
var SIDEBAR_BUTTON = {
    'input': {
      'icon': 'input',
      'name': 'INPUT',
      'href': '',
      'sub':  {
        'form': {'name': 'FORM', 'href': '#form'},
        'selects': {'name': 'SELECTS', 'href': '#selects'}
      }
    },
    'table': {
      'icon': 'reorder',
      'name': 'TABLE',
      'href': '#table',
      'sub': {}
    },
    'picker': {
      'icon': 'timer',
      'name': 'PICKER',
      'href': '',
      'sub': {
        'datepicker': {'name': 'DATE PICKER', 'href': '#datepicker'}
      }
    },
    'setting': {
      'icon': 'settings',
      'name': 'SETTING',
      'href': '#setting',
      'sub': {}
    },
    'help': {
      'icon': 'help',
      'name': 'HELP',
      'href': '#help',
      'sub': {}
    }
  }
  