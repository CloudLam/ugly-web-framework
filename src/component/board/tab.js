/* tab.js | @cloudlam */

'use strict';

function Tab (object) {
  object = object || {};

  var tab = {
    node: null,
    tabs: [],
    init: _init,
    newTab: _newTab
  }

  var prev = document.createElement('div');
  prev.setAttribute('class', 'uwf-tab-prev');
  prev.innerHTML = '<span></span>';

  var next = document.createElement('div');
  next.setAttribute('class', 'uwf-tab-next');
  next.innerHTML = '<span></span>';

  var list = document.createElement('div');
  list.setAttribute('class', 'uwf-tab-list');
  list.innerHTML = '<span></span>';

  function _init () {
    tab.node.appendChild(prev);
    tab.node.appendChild(next);
    tab.node.appendChild(list);
    load({
      url: './component/board/tab.html',
      data: {'tab-title': 'WELCOME'}
    }, function (xhr, dom) {
      tab.tabs.push(dom[0]);
      _active.call(tab.tabs, dom[0]);
      tab.node.insertBefore(dom[0], next);
    });
  }

  function _newTab (data) {
    load({
      url: './component/board/tab.html',
      data: data
    }, function (xhr, dom) {
      tab.tabs.push(dom[0]);
      _active.call(tab.tabs, dom[0]);
      tab.node.insertBefore(dom[0], next);
    });
  }

  function _active(element) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == element) {
        this[i].setAttribute('class', this[i].getAttribute('class') + ' active');
      } else {
        this[i].setAttribute('class', this[i].getAttribute('class').replace(' active', ''));
      }
    }
  }

  return tab;
}
