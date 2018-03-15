/* table.js | @cloudlam */

'use strict';

function Table(object) {
  var table = {
    node: object.node || null,
    col: [],
    row: 0,
    current: 1
  };

  return table;
}
