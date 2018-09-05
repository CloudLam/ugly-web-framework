/* validate.js | @cloudlam */

'use strict';

function Validate (object) {
  object = object || {};

  var validate = {
    class: object.class || 'uwf-validate',
    checkForm: _checkForm
  }

  function _checkForm (form) {}

  var validateHandler = function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() !== 'input' && 
      target.tagName.toLowerCase() !== 'select' && 
      target.tagName.toLowerCase() !== 'textarea') {
      return;
    }
    if (target.hasAttribute('validate')) {
      var validate = JSON.parse(target.getAttribute('validate').replace(/\'/g, '"'));
      if (validate['required'] && validate['required'].value && target.value === '') {
        addMsg.call(target, validate['required'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
      if (validate['maxlength'] && target.value.length > validate['maxlength'].value) {
        addMsg.call(target, validate['maxlength'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
      if (validate['minlength'] && target.value.length < validate['minlength'].value) {
        addMsg.call(target, validate['minlength'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
      if (validate['rangelength'] && 
        (target.value.length < validate['rangelength'].value[0] || 
        target.value.length > validate['rangelength'].value[1])) {
        addMsg.call(target, validate['rangelength'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
      if (validate['equalto'] && !equalTo(validate['equalto'].value, target.value)) {
        addMsg.call(target, validate['equalto'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
      if (validate['email'] && !isEmail(target.value)) {
        addMsg.call(target, validate['email'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
      if (validate['regexp'] && !RegExpTest(validate['regexp'].value, target.value)) {
        addMsg.call(target, validate['regexp'].msg);
        return;
      } else {
        removeMsg.call(target);
      }
    }
  }

  function equalTo (id, value) {
    return document.getElementById(id).value === value;
  }

  function isEmail (value) {
    var re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return re.test(value);
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

  function addMsg (msg) {
    var flag = this.parentNode.lastChild.getAttribute('class');
    if (flag && flag.indexOf(validate.class) > -1) {
      this.parentNode.lastChild.innerHTML = msg;
      return;
    }
    var dom = parseDOM('<label class="' + validate.class + '" for="' + this.id + '">'  + msg + '</label>')[0]
    this.parentNode.appendChild(dom);
    this.setAttribute('invalid', '');
  }

  function removeMsg () {
    var flag = this.parentNode.lastChild.getAttribute('class');
    if (flag && flag.indexOf(validate.class) > -1) {
      this.parentNode.removeChild(this.parentNode.lastChild);
    }
    this.removeAttribute('invalid');
  }

  document.addEventListener('blur', validateHandler, true);

  return validate;
}
