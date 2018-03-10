/* sidebar.config.js | @cloudlam */

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
  