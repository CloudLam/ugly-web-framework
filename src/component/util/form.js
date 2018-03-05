/* form.js | @cloudlam */

'use strict';

function Form (object) {
  var form = {
    node: object.node || null,
    data: {},
    method: object.method || 'get',
    action: object.action || '',
    enctype: object.enctype || 'multipart/form-data',
    init: _init,
    reset: _reset,
    submit: _submit
  }

  function _init () {
    if (this.node) {
      this.node.method = this.method;
      this.node.action = this.action;
      this.node.enctype = this.enctype;
      for (var i = 0; i < this.node.elements.length; i++) {
        if (!this.node.elements[i].disabled) {
          _setData.call(this, this.node.elements[i]);
        }
      }
    }
    this.node.onchange = function (event) {
      _setData.call(form, event.target);
    }
  }

  function _reset () {
    if (this.node) {
      this.node.reset();
    }
  }

  function _submit (callback) {
    if (isIE(9)) {
      _iframeSubmit.call(this, callback);
    } else {
      ajax({
        method: this.method,
        url: this.action,
        data: this.data,
        type: this.enctype,
        processData: false,
        success: function(result) {
          if (callback) {
            callback();
          }
        }
      });
    }
  }

  function _setData (element) {
    if (element.type.toUpperCase() == 'CHECKBOX') {
      this.data[element.name] = this.data[element.name] || [];
      if (element.checked) {
        this.data[element.name].push(element.value);
      } else {
        if (this.data[element.name].indexOf(element.value) > -1) {
          this.data[element.name].splice(this.data[element.name].indexOf(element.value), 1);
        }
      }
      return;
    }
    if (element.tagName.toUpperCase() == 'SELECT' && element.multiple) {
      this.data[element.name] = [];
      for (var i = 0; i < element.options.length; i++) {
        if (element.options[i].selected) {
          this.data[element.name].push(element.options[i].value);
        }
      }
      return;
    }
    this.data[element.name] = element.value;
  }

  function _iframeSubmit (callback) {
    var iframe = document.createElement('iframe');

    iframe.id = 'iframe-form';
    iframe.name = 'iframe-form';
    iframe.width = 0;
    iframe.height = 0;
    iframe.border = 0;
    iframe.style.display = 'none';

    this.node.appendChild(iframe);
    this.node.target = 'iframe-form';
    this.node.submit();

    iframe.onload = function(event) {
      if (callback) {
        callback();
      }
      iframe.parentNode.removeChild(iframe);
    }

    return false;
  }

  return form;
}
