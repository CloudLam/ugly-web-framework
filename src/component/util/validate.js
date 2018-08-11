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
      var validate = target.getAttribute('validate');
    }
  }

  document.addEventListener('blur', validateHandler, true);

  return validate;
}
