/* datepicker.js | @cloudlam */

'use strict';

function DatePicker(object) {
  var picker = {};

  var datePickerHandler = function(event) {
    var target = event.target || event.srcElement; // IE8 compatibility
    if (target.tagName.toLowerCase() === 'input' && target.hasAttribute('date-picker')) {}
  };

  // Listen to focus events and proxy to DatePicker
  if (document.addEventListener) {
    document.addEventListener('focus', datePickerHandler, true);
  } else {
    // IE8 uses attachEvent instead of addEventListener
    document.attachEvent('onfocus', datePickerHandler);
  }

  return picker;
}
