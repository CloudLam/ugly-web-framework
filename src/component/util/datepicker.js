/* datepicker.js | @cloudlam */

'use strict';

function DatePicker(object) {
  var picker = {
    class: object.class || 'uwf-datepicker',
    date: object.date ? true : false,
    time: object.time ? true : false
  };

  var date = '<div class="' + picker.class + '"></div>';

  var time = '<div class="' + picker.class + '"></div>';

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
