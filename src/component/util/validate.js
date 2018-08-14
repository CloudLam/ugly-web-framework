/* validate.js | @cloudlam */

'use strict';

function Validate () {
  var validate = {}

  var validateHandler = function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() !== 'input' && 
      target.tagName.toLowerCase() !== 'select' && 
      target.tagName.toLowerCase() !== 'textarea') {
      return;
    }
    if (target.hasAttribute('validate')) {
      var validate = JSON.parse(target.getAttribute('validate').replace(/\'/g, '"'));
      if (validate['required'] && validate['required'].value && target.value === '') {}
      if (validate['regexp'] && !RegExpTest(validate['regexp'].value, target.value)) {}
    }
  }

  function RegExpTest (pattern, text) {
    if (!pattern) {
      throw new Error('Unknown pattern: ' + pattern);
    }
    if (pattern.match('/')) {
      pattern = pattern.split('/');
      var regexp = new RegExp(pattern[1], pattern[2]);
    } else {
      var regexp = new RegExp(pattern);
    }
    return regexp.test(text);
  }

  document.addEventListener('blur', validateHandler, true);

  return validate;
}
