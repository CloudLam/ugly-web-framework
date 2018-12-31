/* i18n.js | @cloudlam */

'use strict';

function i18n (object) {
  object = object || {};

  var supported = ['cn', 'en'];

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
      set: function (value) {
        prop.language = value;
        _setLanguage.call(this);
      }
    }
  });

  function _init () {}

  function _setLanguage () {}

  return i18n;
}
