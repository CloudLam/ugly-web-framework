/* i18n.js | @cloudlam */

'use strict';

function i18n (object) {
  object = object || {};

  var i18n = {
    language: object.language || 'en'
  }

  return i18n;
}
