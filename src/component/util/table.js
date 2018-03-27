/* table.js | @cloudlam */

'use strict';

function Table(object) {
  var table = {
    parent: object.parent || null,
    node: null,
    col: object.col || [],
    row: 0,
    source: object.source || null,
    attributes: {},
    order: [],
    max: object.max || 1,
    render: object.render || {
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
    search: _search
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
      tableNode += '<th>' + this.col[i] + '</th>';
    }
    tableNode += '</tr></thead><tbody></tbody>';

    this.node = document.createElement('table');
    this.node.innerHTML = tableNode;

    this.parent.insertBefore(this.node, this.parent.lastElementChild || this.parent.lastChild);

    _listener.call(this);

    if (this.source instanceof Array) {
      for (this.row = 0; this.row < this.source.length; this.row++) {
        for (var index in this.source[this.row]) {
          this.attributes[this.col[index]] = this.attributes[this.col[index]] || [];
          this.attributes[this.col[index]].push(this.source[this.row][index] || '');
        }
      }
      this.current = 1;
    } else {
      ajax({
        method: 'post',
        url: this.source,
        success: function(result) {
          console.log(result);
          this.current = 1;
        }
      });
    }
  }

  function _sort () {}

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

  function _search (value) {}

  function _draw (page) {
    if (page - 1 < 0) {
      return;
    }

    this.node.children[1].innerHTML = '';

    var html = '';
    for (var j = (page - 1) * this.max; j < page * this.max && j < this.row; j++) {
      html += '<tr>';
      for (var key in this.col) {
        html += '<td>' + this.attributes[this.col[key]][j] + '</td>';
      }
      html += '</tr>';
    }

    this.node.children[1].innerHTML = html;

    _pageButton.call(this);
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
      if (page > Math.ceil(this.row / this.max)) {
        break;
      }
      html += '<button>' + page + '</button>';
    }

    if (page + 1 < Math.ceil(this.row / this.max)) {
      html += '<button next-pages>' + this.render.page.more + '</button>';
    }

    html += '<button next>' + this.render.page.next + 
      '</button><button last>' + this.render.page.last + 
      '</button>';

    pageNode.innerHTML = html;
  }

  function _listener() {
    var searchNode = this.node.previousElementSibling || this.node.previousSibling;
    var pageNode = this.node.nextElementSibling || this.node.nextSibling;

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
