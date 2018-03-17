/* table.js | @cloudlam */

'use strict';

function Table(object) {
  var table = {
    node: object.node || null,
    col: [],
    row: 0,
    max: object.max || 10,
    current: 1,
    init: _init,
    sort: _sort,
    first: _first,
    prev: _prev,
    next: _next,
    last: _last,
    jump: _jump,
    search: _search
  };

  function _init () {}

  function _sort () {}

  function _first () {}

  function _prev () {}

  function _next () {}

  function _last () {}

  function _jump () {}

  function _search () {}

  function _draw () {}

  function _clear () {}

  return table;
}
