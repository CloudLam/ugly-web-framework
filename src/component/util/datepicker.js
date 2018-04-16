/* datepicker.js | @cloudlam */

'use strict';

function DatePicker(object) {
  object = object || {};

  var picker = {
    node: null,
    class: object.class || 'uwf-datepicker',
    date: object.date ? true : false,
    time: object.time ? true : false,
    now: null
  };

  var date = '<div class="' + picker.class + '"></div>';

  var time = '<div class="' + picker.class + '"></div>';

  _init.call(picker);

  function _init() {
    this.node = document.createElement('div');
    this.node.style.position = 'absolute';
    this.node.style.zIndex = '999';
    this.node.innerHTML = date + time;
  }

  function _setPosition(target) {
    this.node.style.marginLeft = 
      target.offsetLeft - 
      target.parentNode.offsetLeft - 
      parseInt(getStyle(target.parentNode, 'padding-left').replace('px', '')) + 
      'px';
  }

  var datePickerHandler = function(event) {
    var target = event.target || event.srcElement; // IE8 compatibility
    if (target.tagName.toLowerCase() === 'input' && target.hasAttribute('date-picker')) {
      _setPosition.call(picker, target);
      insertAfter(picker.node, target);
    }
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
