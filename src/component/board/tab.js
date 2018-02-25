/* tab.js | @cloudlam */

'use strict';

function Tab (object) {
  object = object || {};

  var tab = {
    node: null,
    tabs: [],
    href: [],
    init: _init,
    create: _create,
    open: _open,
    close: _close
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

  var listItems = document.createElement('div');
  listItems.setAttribute('class', 'uwf-tab-list-items');
  listItems.innerHTML = '<div class="triangle"><span></span></div>';
  list.appendChild(listItems);

  function _init (callback) {
    tab.node.appendChild(prev);
    tab.node.appendChild(next);
    tab.node.appendChild(list);
    _listenerInit();
    if (callback) {
      callback();
    }
  }

  function _listenerInit () {
    prev.onclick = function (event) {
      var active = document.querySelector('.uwf-tab.active');
      if (tab.tabs.indexOf(active) > 0) {
        _active.call(tab.tabs, tab.tabs[tab.tabs.indexOf(active) - 1]);
      }
    }
    next.onclick = function (event) {
      var active = document.querySelector('.uwf-tab.active');
      if (tab.tabs.indexOf(active) < tab.tabs.length - 1) {
        _active.call(tab.tabs, tab.tabs[tab.tabs.indexOf(active) + 1]);
      }
    }
    list.onclick = function (event) {
      if (tab.tabs.length == 0) {
        return;
      }
      if (listItems.getAttribute('class').indexOf('show') > -1) {
        listItems.setAttribute('class', listItems.getAttribute('class').replace(' show', ''));
      } else {
        listItems.setAttribute('class', listItems.getAttribute('class') + ' show');
      }
    }
    document.onclick = function (event) {
      if (event.target != list && event.target.parentNode != list) {
        listItems.setAttribute('class', listItems.getAttribute('class').replace(' show', ''));
      }
    }
    listItems.addEventListener('click', function (event) {
      tab.open(event.target.getAttribute('for') || event.target.parentNode.getAttribute('for'));
    }, false);
  }

  function _create (href, data, callback) {
    load({
      url: './component/board/tab.html',
      data: data
    }, function (xhr, dom) {
      if (tab.href.indexOf(href) > -1) {
        tab.open(dom[0].id);
      } else {
        var item = '<div for=' + dom[0].id + '><label>' + dom[0].children[0].innerHTML + '</label></div>';
        listItems.appendChild(parseDOM(item)[0]);
        tab.tabs.push(dom[0]);
        tab.href.push(href);
        _active.call(tab.tabs, dom[0]);
        tab.node.insertBefore(dom[0], next);
      }
      if (callback) {
        callback();
      }
    });
  }

  function _open (id) {
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].id == id) {
        if (this.tabs[i].getAttribute('class').indexOf('active') > -1) {
          return;
        }
        _active.call(tab.tabs, this.tabs[i]);
        return;
      }
    }
  }

  function _close (id) {
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].id == id) {
        if (this.tabs[i].getAttribute('class').indexOf('active') > -1) {
          if (this.tabs[i+1]) {
            _active.call(tab.tabs, this.tabs[i+1]);
          } else {
            _active.call(tab.tabs, this.tabs[i-1]);
          }
        }
        this.tabs[i].parentNode.removeChild(this.tabs[i]);
        listItems.removeChild(listItems.children[i+1]);
        this.tabs.splice(i, 1);
        this.href.splice(i, 1);
        return;
      }
    }
  }

  function _active(element) {
    if (!element) {
      location.hash = 'index';
      return;
    }
    for (var i = 0; i < this.length; i++) {
      if (this[i] == element) {
        this[i].setAttribute('class', this[i].getAttribute('class') + ' active');
        listItems.children[i+1].setAttribute('class', 
          listItems.children[i+1].getAttribute('class') + ' active');
        if (tab.href[i]) {
          location.hash = '#' + tab.href[i];
        }
      } else {
        this[i].setAttribute('class', this[i].getAttribute('class').replace(' active', ''));
        listItems.children[i+1].setAttribute('class', 
          listItems.children[i+1].getAttribute('class').replace(' active', ''));
      }
    }
    if (this.length > 1) {
      var max = Math.floor(this[0].parentNode.offsetWidth / this[0].offsetWidth) - 1;
    }
  }

  return tab;
}
