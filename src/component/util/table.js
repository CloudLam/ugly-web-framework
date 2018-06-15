/* table.js | @cloudlam */

'use strict';

/**
 * Table
 * @param {dom} object.parent
 * @param {array} object.col
 * @param {string} object.source
 * @param {integer} object.max
 * @param {object} object.pagination type = ['locale'|'remote']
 * @param {object} object.render
 * @param {boolean} object.multiSelect
 * @returns {object}
 * @throws {DOMNotFoundError}
 */
function Table(object) {
  var table = {
    parent: object.parent || null,
    node: null,
    col: object.col || [],
    row: 0,
    source: object.source || null,
    attributes: {},
    order: [],
    max: object.max || 5,
    pagination: {
      type: object.pagination ? object.pagination.type || 'locale' : 'locale',
      pageParam: object.pagination ? object.pagination.pageParam || 'page' : 'page',
      searchParam: object.pagination ? object.pagination.searchParam || 'search' : 'search'
    },
    render: object.render || {
      column: [],
      search: {
        id: 'table-id',
        class: '',
        title: 'Search'
      },
      page: {
        class: '',
        first: 'First',
        prev: 'Prev',
        next: 'Next',
        last: 'Last',
        more: '...'
      }
    },
    multiSelect: object.multiSelect ? true : false,
    init: _init,
    sort: _sort,
    first: _first,
    prev: _prev,
    next: _next,
    last: _last,
    jump: _jump,
    search: _search,
    filter: _filter
  };

  var prop = {
    current: 1
  }
  Object.defineProperties(table, {
    'current': {
      get: function () {
        return prop.current;
      },
      set: function (value) {
        if (isNaN(value)) {
          return;
        }
        prop.current = value;
        _draw.call(table, value);
      }
    }
  });

  function _init () {
    if (!object.parent) {
      throw new Error('Parent node not found');
      return;
    }

    var searchNode = '<div class="' + this.render.search.class +
      '"><label for="' + this.render.search.id + 
      '">' + this.render.search.title + 
      '</label><input id="' + this.render.search.id + 
      '" type="text"></div>';

    var pageNode = '<div class="' + this.render.page.class + '"></div>';

    this.parent.innerHTML = searchNode + pageNode;

    var tableNode = '<thead><tr>';
    for (var i = 0; i < this.col.length; i++) {
      if (this.render.column && this.render.column.length > i) {
        tableNode += '<th width="' + this.render.column[i].width + '"><label>' + this.col[i] + '</label>';
        if (this.render.column[i].filter) {
          tableNode += '<div><select><option>All</option></select></div>';
        }
        tableNode += '</th>';
      } else {
        tableNode += '<th>' + this.col[i] + '</th>';
      }
    }
    tableNode += '</tr></thead><tbody></tbody>';

    this.node = document.createElement('table');
    this.node.innerHTML = tableNode;

    this.parent.insertBefore(this.node, this.parent.lastElementChild || this.parent.lastChild);

    _listener.call(this);

    if (this.source instanceof Array) {
      _set.call(table, this.source);
      this.current = 1;
    } else {
      ajax({
        method: 'get',
        url: this.source,
        success: function(result) {
          _set.call(table, JSON.parse(result).data);
          table.current = 1;
        }
      });
    }
  }

  function _sort (column, flag) {
    if (flag) {
      if (flag == 1) {
        _quickSort(this.order, this.attributes[column], 0, this.order.length - 1);
      }
      if (flag == 2) {
        this.order.reverse();
      }
    } else {
      this.order.sort(function(a, b) {return a - b;});
    }
    this.current = 1;
  }

  function _first () {
    this.current = 1;
  }

  function _prev () {
    if (this.current > 1) {
      this.current = this.current - 1;
    }
  }

  function _next () {
    if (this.current < Math.ceil(this.row / this.max)) {
      this.current = this.current + 1;
    }
  }

  function _last () {
    this.current = Math.ceil(this.row / this.max);
  }

  function _jump (page) {
    this.current = page;
  }

  function _search (value) {
    if (value) {
      if (this.pagination.type == 'remote') {
        _searchRemote.call(this, value);
        return;
      }
      this.order = [];
      for (var key in this.attributes) {
        if (key == 'rowid') {
          continue;
        }
        for (var i = 0; i < this.attributes[key].length; i++) {
          if (this.attributes[key][i].toUpperCase().indexOf(value.toUpperCase()) > -1 && 
            this.order.indexOf(i) == -1) {
            this.order.push(i);
          }
        }
      }
      this.order.sort(function(a, b) {return a - b;});
    } else {
      this.order = [];
      for (var i = 0; i < this.row; i++) {
        this.order.push(i);
      }
    }
    this.current = 1;
  }

  function _searchRemote (value) {
    ajax({
      method: 'get',
      url: this.source + '?' + this.pagination.searchParam + '=' + value,
      success: function(result) {}
    });
  }

  function _filter (key, value) {
    if (value == 'all') {
      this.order = [];
      for (var i = 0; i < this.row; i++) {
        this.order.push(i);
      }
    } else {
      this.order = [];
      for (var i = 0; i < this.attributes[key].length; i++) {
        if (this.attributes[key][i].toUpperCase() == value.toUpperCase() && 
          this.order.indexOf(i) == -1) {
          this.order.push(i);
        }
      }
      this.order.sort(function(a, b) {return a - b;});
    }
    this.current = 1;
  }

  function _set (data) {
    for (this.row = 0; this.row < data.length; this.row++) {
      this.order.push(this.row);
      for (var index in data[this.row]['result']) {
        this.attributes[this.col[index]] = this.attributes[this.col[index]] || [];
        this.attributes[this.col[index]].push(data[this.row]['result'][index] || '');
      }
      this.attributes['rowid'] = this.attributes['rowid'] || [];
      this.attributes['rowid'].push(data[this.row]['rowid'] || '');
    }
    var selects = this.node.querySelectorAll('table thead tr th select');
    for (var i = 0; i < selects.length; i++) {
      var head = selects[i].parentNode.previousSibling || selects[i].parentNode.previousElementSibling;
      var temp = [];
      for (var j = 0; j < this.attributes[head.innerText].length; j++) {
        if (temp.indexOf(this.attributes[head.innerText][j]) > -1) {
          continue;
        } else {
          temp.push(this.attributes[head.innerText][j]);
          selects[i].innerHTML += '<option>' + this.attributes[head.innerText][j] + '</option>';
        }
      }
    }
  }

  function _draw (page) {
    if (page - 1 < 0) {
      return;
    }

    if (this.pagination.type == 'remote') {
      _drawRemote.call(this, page);
      return;
    }

    this.node.children[1].innerHTML = '';

    var html = '';
    for (var j = (page - 1) * this.max; j < page * this.max && j < this.order.length; j++) {
      html += '<tr rowid="' + this.attributes['rowid'][this.order[j]] + '">';
      for (var key in this.col) {
        html += '<td>' + this.attributes[this.col[key]][this.order[j]] + '</td>';
      }
      html += '</tr>';
    }

    this.node.children[1].innerHTML = html;

    _pageButton.call(this);
  }

  function _drawRemote (page) {
    ajax({
      method: 'get',
      url: this.source + '?' + this.pagination.pageParam + '=' + page,
      success: function(result) {}
    });
  }

  function _pageButton () {
    var pageNode = this.node.nextElementSibling || this.node.nextSibling;

    var html = '<button first>' + this.render.page.first + 
      '</button><button prev>' + this.render.page.prev + 
      '</button>';

    if (this.current / 10.5 > 1) {
      html += '<button prev-pages>' + this.render.page.more + '</button>';
    }

    var page = Math.floor(this.current / 10.5) * 10;
    for (var i = 1; i < 11; i++) {
      page += 1;
      if (page > Math.ceil(this.order.length / this.max)) {
        break;
      }
      if (page == this.current) {
        html += '<button disabled>' + page + '</button>';
      } else {
        html += '<button>' + page + '</button>';
      }
    }

    if (page + 1 < Math.ceil(this.order.length / this.max)) {
      html += '<button next-pages>' + this.render.page.more + '</button>';
    }

    html += '<button next>' + this.render.page.next + 
      '</button><button last>' + this.render.page.last + 
      '</button>';

    pageNode.innerHTML = html;
  }

  function _quickSort (array, data, left, right) {
    if (left < right) {
      var pivot = array[left];
      var low = left;
      var high = right;
      while (low < high) {
        while (low < high && data[array[high]] >= data[pivot]) {
          high--;
        }
        array[low] = array[high];
        while (low < high && data[array[low]] <= data[pivot]) {
          low++;
        }
        array[high] = array[low];
      }
      array[low] = pivot;
      _quickSort(array, data, left, low - 1);
      _quickSort(array, data, low + 1, right);
    }
    return array;
  }

  function _checkClear () {
    for (var i = 0; i < this.children[1].children.length; i++) {
      this.children[1].children[i].removeAttribute('checked');
    }
  }

  function _listener() {
    var searchNode = this.node.previousElementSibling || this.node.previousSibling;
    var pageNode = this.node.nextElementSibling || this.node.nextSibling;

    if (isIE(9)) {
      searchNode.children[1].addEventListener('change', function (event) {
        table.search(this.value);
      }, false);
    }

    searchNode.children[1].addEventListener('input', function (event) {
      table.search(this.value);
    }, false);

    this.node.addEventListener('click', function (event) {
      var target = event.target;
      if (target.tagName.toUpperCase() == 'LABEL' && target.parentNode.tagName.toUpperCase() == 'TH') {
        target = target.parentNode;
      }
      if (target.tagName.toUpperCase() == 'TH') {
        if (target.hasAttribute('sort')) {
          target.removeAttribute('sort');
          target.setAttribute('sort-desc', '');
          table.sort(target.children[0].innerHTML.split(' ')[0], 2);
          target.children[0].innerHTML = target.children[0].innerHTML.split(' ')[0] + ' &#9652;';
        } else if (target.hasAttribute('sort-desc')) {
          target.removeAttribute('sort-desc');
          table.sort(target.children[0].innerHTML.split(' ')[0]);
          target.children[0].innerHTML = target.children[0].innerHTML.split(' ')[0];
        } else {
          target.setAttribute('sort', '');
          table.sort(target.children[0].innerHTML, 1);
          target.children[0].innerHTML = target.children[0].innerHTML + ' &#9662;';
        }
      }
      if (target.tagName.toUpperCase() == 'TD') {
        if (target.parentNode.hasAttribute('checked')) {
          target.parentNode.removeAttribute('checked');
        } else {
          if (!table.multiSelect) {
            _checkClear.call(table.node);
          }
          target.parentNode.setAttribute('checked', '');
        }
      }
    }, false);

    this.node.addEventListener('change', function (event) {
      if (event.target.tagName.toUpperCase() == 'SELECT') {
        var head = event.target.parentNode.previousSibling || event.target.parentNode.previousElementSibling;
        var index = event.target.selectedIndex;
        table.filter(head.innerText, event.target.options[index].innerText.toLowerCase());
      }
    });

    pageNode.addEventListener('click', function (event) {
      var target = event.target;
      if (target.tagName.toUpperCase() != 'BUTTON') {
        target = event.target.parentNode;
      }
      if (target.hasAttribute('first')) {
        table.first();
      } else if (target.hasAttribute('prev')) {
        table.prev();
      } else if (target.hasAttribute('next')) {
        table.next();
      } else if (target.hasAttribute('last')) {
        table.last();
      } else if (target.hasAttribute('prev-pages')) {
        table.jump(Math.floor(table.current / 10) * 10);
      } else if (target.hasAttribute('next-pages')) {
        table.jump(Math.ceil(table.current / 10) * 10 + 1);
      } else {
        table.jump(parseInt(target.innerHTML));
      }
    }, false);
  }

  return table;
}
