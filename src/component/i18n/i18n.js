/* i18n.js | @cloudlam */

'use strict';

function i18n (object) {
  object = object || {};

  var i18n = {
    language: object.language || 'en',
    init: _init
  }

  function _init () {}

  return i18n;
}
