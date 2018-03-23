/* table.js | @cloudlam */

'use strict';

function Table(object) {
  var table = {
    parent: object.parent || null,
    col: object.col || [],
    row: 0,
    count: 0,
    source: object.source || null,
    attributes: {},
    order: [],
    max: object.max || 10,
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

    if (this.source instanceof Array) {
      for (this.row = 0; this.row < this.source.length; this.row++) {
        for (var index in this.source[this.row]) {
          this.attributes[this.col[index]] = this.attributes[this.col[index]] || [];
          this.attributes[this.col[index]].push(this.source[this.row][index] || '');
        }
      }
    }

    this.current = 1;
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
    if (this.current < this.count / this.max + 1) {
      this.current = this.current + 1;
    }
  }

  function _last () {
    this.current = this.count / this.max + 1;
  }

  function _jump (page) {
    this.current = page;
  }

  function _search (value) {}

  function _draw (page) {
    if (page - 1 < 0) {
      return;
    }

    this.parent.innerHTML = '';

    var html = '<table><thead><tr>';

    for (var i = 0; i < this.col.length; i++) {
      html += '<th>' + this.col[i] + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var j = (page - 1) * this.max; j < page * this.max && j < this.row; j++) {
      html += '<tr>';
      for (var key in this.col) {
        html += '<td>' + this.attributes[this.col[key]][j] + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';

    this.parent.innerHTML = html;
  }

  return table;
}
