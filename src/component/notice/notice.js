/* notice.js | @cloudlam */

'use strict';

function Notice (object) {
  object = object || {};

  var parent = object.parent || document.getElementById('app');

  var notice = {
    node: null,
    init: _init,
    alert: _alert,
    comfirm: _confirm,
    toast: _toast
  }

  function _init () {
    notice.node = document.createElement('div');
    notice.node.setAttribute('class', object.class || 'uwf-notice');
    parent.appendChild(notice.node);
    _listenerInit.call(notice);
  }

  function _alert (code, message) {
    var html = '<div class="alert" code="' + code + 
      '><p>' + message +
      '</p>' +
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _confirm (code, message) {
    var html = '<div class="confirm" code="' + code + 
      '><p>' + message +
      '</p>' +
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _toast (type, code, message) {
    var html = '<div class="toast ' + type + 
      '" code="' + code + 
      '"><p>' + message + 
      '</p><span>&#215;</span>' + 
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _listenerInit () {
    this.node.addEventListener('click', function (event) {
      if (event.target.tagName.toLowerCase() == 'span') {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      }
    }, false);
  }

  return notice;
}
