/* tab.js | @cloudlam */

'use strict';

function Tab (object) {
  object = object || {};

  var tab = {
    node: null,
    tabs: [],
    href: [],
    cache: [],
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
    document.addEventListener('click', function (event) {
      if (event.target != list && event.target.parentNode != list) {
        listItems.setAttribute('class', listItems.getAttribute('class').replace(' show', ''));
      }
    }, false);
    listItems.addEventListener('click', function (event) {
      tab.open(event.target.getAttribute('for') || event.target.parentNode.getAttribute('for'));
    }, false);
  }

  function _create (href, data, callback) {
    if (tab.href.indexOf(href) > -1) {
      var index = tab.href.indexOf(href);
      tab.open(data['tab-id']);
      if (callback) {
        callback(function () {
          for (var i = 0; i < tab.cache[index].length; i++) {
            document.getElementById(tab.cache[index][i].id).value = tab.cache[index][i].value;
          }
        });
      }
    } else {
      load({
        url: './component/board/tab.html',
        data: data
      }, function (xhr, dom) {
        if (tab.href.indexOf(href) > -1) {
          return;
        }
        var item = '<div for=' + dom[0].id + '><label>' + dom[0].children[0].innerHTML + '</label></div>';
        listItems.appendChild(parseDOM(item)[0]);
        tab.tabs.push(dom[0]);
        tab.href.push(href);
        tab.cache.push([]);
        _active.call(tab.tabs, dom[0]);
        tab.node.insertBefore(dom[0], next);
        if (callback) {
          callback();
        }
      });
    }
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
        this.cache.splice(i, 1);
        break;
      }
    }
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].getAttribute('class').indexOf('hide') <= -1) {
        var max = Math.floor(this.node.offsetWidth / this.tabs[i].offsetWidth) - 1;
        if (this.tabs[i+max]) {
          this.tabs[i+max-1].setAttribute('class', tab.tabs[i+max-1].getAttribute('class').replace(' hide', ''));
        } if (this.tabs[i-1]) {
          this.tabs[i-1].setAttribute('class', tab.tabs[i-1].getAttribute('class').replace(' hide', ''));
        }
        break;
      }
    }
  }

  function _active(element) {
    if (!element) {
      location.hash = 'index';
      return;
    }
    var active = { old: 0, new: 0 };
    for (var i = 0; i < this.length; i++) {
      if (this[i].getAttribute('class').indexOf('active') > -1) {
        active.old = i;
        _cache.call(tab, i, document.querySelectorAll('[cache]'));
      }
      if (this[i] == element) {
        active.new = i;
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
      var max = Math.floor(tab.node.offsetWidth / this[active.old].offsetWidth) - 1;
      if (this.length > max) {
        if (active.new == this.length - 1) {
          this[active.new-max].setAttribute('class', this[active.new-max].getAttribute('class') + ' hide');
        }
        if (this[active.new].getAttribute('class').indexOf('hide') > -1) {
          if (active.new < active.old) {
            _show(active.new, active.new + max - 1);
          } else {
            _show(active.new - max + 1, active.new);
          }
        }
      }
    }
  }

  function _cache (index, elements) {
    this.cache[index] = [];
    for (var i = 0; i < elements.length; i++) {
      this.cache[index].push({id: elements[i].id, value: elements[i].value});
    }
  }

  function _show(from, to) {
    for (var i = 0; i < tab.tabs.length; i++) {
      if (i < from || i > to) {
        if (tab.tabs[i].getAttribute('class').indexOf('hide') <= -1) {
          tab.tabs[i].setAttribute('class', tab.tabs[i].getAttribute('class') + ' hide');
        }
      } else {
        tab.tabs[i].setAttribute('class', tab.tabs[i].getAttribute('class').replace(' hide', ''));
      }
    }
  }

  return tab;
}
