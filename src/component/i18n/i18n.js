/* i18n.js | @cloudlam */

'use strict';

function i18n (object) {
  object = object || {};

  var i18n = {
    init: _init
  }

  var prop = {
    language: object.language || 'en',
  }
  Object.defineProperties(i18n, {
    'language': {
      get: function () {
        return prop.language;
      },
      set: function () {}
    }
  });

  function _init () {}

  return i18n;
}
