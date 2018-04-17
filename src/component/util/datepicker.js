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

  var date_head = '<div><div><span>&#9664;</span><span></span><span>&#9654;</span></div>';
  var date_foot = '<div><span>' + 'Pick Time' + 
    '</span><button>' + 'Today' + 
    '</button><button>' + 'Reset' + 
    '</button></div></div>';

  var time_body = '<div></div>';
  var time_foot = '<div></div>';

  _init.call(picker);

  function _init() {
    this.now = new Date();
    this.node = document.createElement('div');
    this.node.style.position = 'absolute';
    this.node.style.zIndex = '999';
    this.node.setAttribute('class', this.class);
    this.node.innerHTML = date_head + 
      '<div>' + _calendar(this.now.getFullYear(), this.now.getMonth(), 1) + '</div>' + 
      date_foot;
  }

  function _setPosition(target) {
    this.node.style.marginLeft = 
      target.offsetLeft - 
      target.parentNode.offsetLeft - 
      parseInt(getStyle(target.parentNode, 'padding-left').replace('px', '')) + 
      'px';
  }

  function _isLeapYear (year) {
    return year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0);
  }
  
  function _calendar (year, month) {
    var firstday = new Date(year, month, 1);
    var days = new Array(31, 28 + _isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var mlast = month ? month - 1 : 11;
    var calendar = '<table><thead><tr>' + 
      '<th>' + 'Su' + '</th>' +
      '<th>' + 'Mo' + '</th>' +
      '<th>' + 'Tu' + '</th>' +
      '<th>' + 'We' + '</th>' +
      '<th>' + 'Th' + '</th>' +
      '<th>' + 'Fr' + '</th>' +
      '<th>' + 'Sa' + '</th>' +
      '</tr><tbody><tr>';
    for (var i = firstday.getDay(); i > 0; i--) {
      calendar += '<td style="opacity:0.3">' + (days[mlast] - i + 1) + '</td>';
    }
    for (var j = 1; j <= days[month]; j++) {
      calendar += '<td>' + j + '</td>';
      if ((j + firstday.getDay()) % 7 == 0) {
        if (j == days[month]) {
          calendar += '</tr>';
        } else {
          calendar += '</tr><tr>';
        }
      }
    }
    if ((days[month] + firstday.getDay()) % 7 != 0) {
      for (var k = 1; k <= 7 - (days[month] + firstday.getDay()) % 7; k++) {
        calendar += '<td style="opacity:0.3">' + k + '</td>';
      }
      calendar += '</tr>';
    }
    calendar += '</tbody></table>';
    return calendar;
  }

  function _timepicker () {
    var hSelection = '<label>H</label><select>';
    for (var h = 0; h < 24; h++) {
      hSelection += '<option>' + h + '</option>';
    }
    hSelection += '</select>';

    var mSelection = '<label>M</label><select>';
    for (var m = 0; m < 60; m++) {
      mSelection += '<option>' + m + '</option>';
    }
    mSelection += '</select>';

    var sSelection = '<label>S</label><select>';
    for (var s = 0; s < 60; s++) {
      sSelection += '<option>' + s + '</option>';
    }
    sSelection += '</select>';

    return hSelection + mSelection + sSelection;
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
