/* table.js | @cloudlam */

'use strict';

function Table(object) {
  var table = {
    parent: object.parent || null,
    col: [],
    row: 0,
    count: 0,
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
        _setPage(value);
      }
    }
  });

  function _init () {}

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

  function _draw () {}

  function _clear () {}

  return table;
}
