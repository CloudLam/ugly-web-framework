/* datepicker.js | @cloudlam */

'use strict';

Date.prototype.format = function (fmt) {
  var obj = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? 
        obj[key] : (('00') + obj[key]).substr(('' + obj[key]).length));
    }
  }
  return fmt;
}

function DatePicker(object) {
  object = object || {};

  var picker = {
    node: null,
    class: object.class || 'uwf-datepicker',
    date: object.date == false ? false : true,
    time: object.time == false ? false : true,
    now: null,
    format: object.format || 'yyyy-MM-dd hh:mm:ss',
    show: false
  };

  var prop = {
    value: null
  }
  Object.defineProperties(picker, {
    value: {
      set: function (value) {
        if (new RegExp(_dateRegExp.call(this)).test(value)) {
          prop.value = value;
        } else {
          prop.value = this.now.format(this.format);
        }
        _setValue.call(this);
      },
      get: function () {
        return prop.value;
      }
    }
  });

  var _date = '<div>' +
    // Head
    '<div><span>&#9664;</span><span></span><span>&#9654;</span></div>' + 
    // Body
    '<div></div>' + 
    // Foot
    '<div><span>' + (picker.time ? 'Pick Time' : '') + '</span>' + 
    '<button>' + 'Today' + '</button>' + 
    '<button>' + 'Reset' + '</button></div>' + 
    '</div>';

  var _time = '<div>' +
    // Body
    '<div></div>' + 
    // Foot
    '<div><span>' + (picker.date ? 'Pick Date' : '') + '</span>' + 
    '<button>' + 'Now' + '</button>' + 
    '<button>' + 'Reset' + '</button></div>' + 
    '</div>';

  _init.call(picker);

  function _init() {
    this.now = new Date();

    this.node = document.createElement('div');
    this.node.style.position = 'absolute';
    this.node.style.zIndex = '999';
    this.node.setAttribute('class', this.class);
    this.node.innerHTML == '';

    // Date picker
    if (this.date) {
      // [Year, Month, Date]
      var today = [this.now.getFullYear(), this.now.getMonth(), this.now.getDate()];
      this.node.innerHTML += _date;
      this.node.children[0].children[1].innerHTML = _calendar(today[0], today[1]);
    } else {
      this.node.innerHTML += '<div></div>';
    }

    // Time picker
    if (this.time) {
      this.node.innerHTML += _time;
      if (this.date) {
        this.node.children[1].style.display = 'none';
      }
      this.node.children[1].children[0].innerHTML = _timer();
    } else {
      this.node.innerHTML += '<div></div>';
    }
  }

  function _setPosition(target) {
    this.node.style.marginLeft = 
      target.offsetLeft - 
      target.parentNode.offsetLeft - 
      parseInt(getStyle(target.parentNode, 'padding-left').replace('px', '')) + 
      'px';
  }

  function _getValue(prop) {
    var keys = {
      'year': 'y+',
      'month': 'M+',
      'date': 'd+',
      'hour': 'h+',
      'minute': 'm+',
      'second': 's+',
      'quater': 'q+',
      'millisecond': 'S+',
    };
    if (new RegExp('(' + keys[prop] + ')').test(this.format)) {
      return this.value.substr(this.format.indexOf(RegExp.$1), RegExp.$1.length);
    }
  }

  function _setValue() {
    var input = this.node.previousElementSibling || this.node.previousSibling;
    input.value = this.value;
    input.focus();
    if (this.date) {
      this.node.children[0].children[1].innerHTML = 
        _calendar(_getValue.call(this, 'year'), parseInt(_getValue.call(this, 'month')) - 1);
    }
    if (this.time) {
      this.node.children[1].children[0].children[1].value = parseInt(_getValue.call(this, 'hour'));
      this.node.children[1].children[0].children[3].value = parseInt(_getValue.call(this, 'minute'));
      this.node.children[1].children[0].children[5].value = parseInt(_getValue.call(this, 'second'));
    }
  }

  function _dateRegExp() {
    var fmt = this.format;
    var obj = {
      'M+': '(^[1-9]$|0[1-9]|1[0-2])',
      'd+': '(^[1-9]$|0[1-9]|[1-2][0-9]|3[0-1])',
      'h+': '(^[1-9]$|[0-1][0-9]|2[0-3])',
      'm+': '(^[0-9]$|[0-5][0-9])',
      's+': '(^[0-9]$|[0-5][0-9])'
    }
    for (var key in obj) {
      if (new RegExp('(' + key + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, obj[key]);
      }
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 4 ? '[1-9]\\d{3}' : '\\d{' + RegExp.$1.length + '}');
    }
    if (/(\s+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, '\\s+');
    }
    return '(' + fmt + ')';
  }

  function _isLeapYear (year) {
    return year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0);
  }

  function _calendar (year, month) {
    picker.now = new Date();

    // Date Head
    var head = picker.node.children[0].children[0].children[1]
    head.innerHTML = (month + 1) + ', ' + year;
    head.setAttribute('for', '' + year + ('0' + month).substr(-2));

    var today = [picker.now.getFullYear(), picker.now.getMonth(), picker.now.getDate()];
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
      calendar += '<td style="opacity:0.3" last>' + (days[mlast] - i + 1) + '</td>';
    }
    for (var j = 1; j <= days[month]; j++) {
      if (year == today[0] && month == today[1] && j == today[2]) {
        if (j == picker.value) {
          calendar += '<td today checked>' + j + '</td>';
        } else {
          calendar += '<td today>' + j + '</td>';
        }
      } else if (year == today[0] && month == today[1] && j == picker.value) {
        calendar += '<td checked>' + j + '</td>';
      } else  {
        calendar += '<td>' + j + '</td>';
      }
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
        calendar += '<td style="opacity:0.3" next>' + k + '</td>';
      }
      calendar += '</tr>';
    }
    calendar += '</tbody></table>';
    return calendar;
  }

  function _timer () {
    var hSelection = '<label>H</label><select value>';
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

  // Handlers
  var datePickerHandler = function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'input' && target.hasAttribute('date-picker')) {
      picker.now = new Date();
      _setPosition.call(picker, target);
      insertAfter(picker.node, target);
      _dateRegExp.call(picker);
      picker.show = true;
      if (target.value) {
        picker.value = target.value;
      }
    }
  };
  var closePickerHandler = function (event) {
    var target = event.target;
    if (event.type == 'mousedown' && !picker.node.contains(target)) {
      picker.show = false;
    }
    if (event.type == 'blur' && 
      target.tagName.toLowerCase() === 'input' && 
      target.hasAttribute('date-picker') && 
      !picker.show) {
      picker.node.parentNode.removeChild(picker.node);
    }
  }
  var dateHandler = function (event) {
    if (picker.date) {
      var target = event.target;
      var year = picker.node.children[0].children[0].children[1].getAttribute('for').substr(0, 4);
      var month = picker.node.children[0].children[0].children[1].getAttribute('for').substr(4, 2);
      // Prev month
      if (target.tagName.toLowerCase() === 'span' && target == picker.node.children[0].children[0].children[0]) {
        if (parseInt(month) - 1 < 0) {
          year = '' + (parseInt(year) - 1);
          month = '11';
          picker.node.children[0].children[0].children[1].setAttribute('for', '' + year + month);
        } else {
          month = ('0' + (parseInt(month) - 1)).substr(-2);
          picker.node.children[0].children[0].children[1].setAttribute('for', '' + year + month);
        }
        picker.node.children[0].children[1].innerHTML = _calendar(parseInt(year), parseInt(month));
      }
      // Switch month / year
      if (target.tagName.toLowerCase() === 'span' && 
        target == picker.node.children[0].children[0].children[1]) {
        console.log(target);
      }
      // Next month
      if (target.tagName.toLowerCase() === 'span' && target == picker.node.children[0].children[0].children[2]) {
        if (parseInt(month) + 1 > 11) {
          year = '' + (parseInt(year) + 1);
          month = '00';
          picker.node.children[0].children[0].children[1].setAttribute('for', '' + year + month);
        } else {
          month = ('0' + (parseInt(month) + 1)).substr(-2);
          picker.node.children[0].children[0].children[1].setAttribute('for', '' + year + month);
        }
        picker.node.children[0].children[1].innerHTML = _calendar(parseInt(year), parseInt(month));
      }
      // Pick date
      if (target.tagName.toLowerCase() === 'td') {
        var tmp_year = parseInt(year);
        var tmp_month = parseInt(month);
        if (target.hasAttribute('last')) {
          tmp_month = tmp_month - 1;
          if (tmp_month - 1 < 0) {
            tmp_month = 11;
            tmp_year -= 1;
          }
        }
        if (target.hasAttribute('next')) {
          tmp_month = tmp_month + 1;
          if (tmp_month > 11) {
            tmp_month = 0;
            tmp_year += 1;
          }
        }
        picker.value = new Date(tmp_year, tmp_month, target.innerHTML).format(picker.format);
        console.log(_getValue.call(picker, 'year'));
      }
    }
  };
  var timeHandler = function (event) {
    if (picker.time) {
      var target = event.target;
      var temp_year = picker.value ? _getValue.call(picker, 'year') : picker.now.getFullYear();
      var temp_month = picker.value ? parseInt(_getValue.call(picker, 'month') - 1) : picker.now.getMonth();
      var temp_date = picker.value ? _getValue.call(picker, 'date') : picker.now.getDate();
      var temp_hour = picker.value ? _getValue.call(picker, 'hour') : picker.now.getHours();
      var temp_minute = picker.value ? _getValue.call(picker, 'minute') : picker.now.getMinutes();
      var temp_second = picker.value ? _getValue.call(picker, 'second') : picker.now.getSeconds();
      // Pick hour
      if (target.tagName.toLowerCase() === 'select' && target == picker.node.children[1].children[0].children[1]) {
        picker.value = 
          new Date(temp_year, temp_month, temp_date, target.value, temp_minute, temp_second)
          .format(picker.format);
      }
      // Pick minute
      if (target.tagName.toLowerCase() === 'select' && target == picker.node.children[1].children[0].children[3]) {
        picker.value = 
          new Date(temp_year, temp_month, temp_date, temp_hour, target.value, temp_second)
          .format(picker.format);
      }
      // Pick second
      if (target.tagName.toLowerCase() === 'select' && target == picker.node.children[1].children[0].children[5]) {
        picker.value = 
          new Date(temp_year, temp_month, temp_date, temp_hour, temp_minute, target.value)
          .format(picker.format);
      }
    }
  };
  var buttonHandler = function (event) {
    var target = event.target;
    if (picker.date) {
      // Open time picker
      if (target.tagName.toLowerCase() === 'span' && target == picker.node.children[0].children[2].children[0]) {
        picker.node.children[0].style.display = 'none';
        picker.node.children[1].style.display = 'block';
      }
    }
    if (picker.time) {
      // Open date picker
      if (target.tagName.toLowerCase() === 'span' && target == picker.node.children[1].children[1].children[0]) {
        picker.node.children[1].style.display = 'none';
        picker.node.children[0].style.display = 'block';
      }
    }
    // Today / Now
    if ((target.tagName.toLowerCase() === 'button' && target == picker.node.children[0].children[2].children[1]) || 
      (target.tagName.toLowerCase() === 'button' && target == picker.node.children[1].children[1].children[1])) {
      picker.now = new Date();
      picker.value = picker.now.format(picker.format);
      picker.node.children[0].children[1].innerHTML = 
        _calendar(picker.now.getFullYear(), picker.now.getMonth());
    }
    // Reset
    if ((target.tagName.toLowerCase() === 'button' && target == picker.node.children[1].children[1].children[2]) || 
      (target.tagName.toLowerCase() === 'button' && target == picker.node.children[0].children[2].children[2])) {
      console.log('reset');
    }
  };

  // Listen to focus events and proxy to DatePicker
  document.addEventListener('focus', datePickerHandler, true);
  document.addEventListener('blur', closePickerHandler, true);
  document.addEventListener('mousedown', closePickerHandler, false);
  picker.node.addEventListener('click', dateHandler, false);
  picker.node.addEventListener('change', timeHandler, false);
  picker.node.addEventListener('click', buttonHandler, false);

  return picker;
}
