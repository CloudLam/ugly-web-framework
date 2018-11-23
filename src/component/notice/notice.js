/* notice.js | @cloudlam */

'use strict';

function Notice (object) {
  object = object || {};

  var parent = object.parent || document.getElementById('app');

  var notice = {
    node: null,
    init: _init,
    alert: _alert,
    confirm: _confirm,
    toast: _toast
  }

  function _init () {
    notice.node = document.createElement('div');
    notice.node.setAttribute('class', object.class || 'uwf-notice');
    parent.appendChild(notice.node);
    _listenerInit.call(notice);
  }

  function _alert (code, message) {
    var html = '<div class="mask">' + 
      '<div class="alert" code="' + code + 
      '"><span>ALERT</span><span class="close">&#215;</span><p>' + message +
      '</p><button>OK</button>' +
      '</div>' +
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _confirm (code, message) {
    var html = '<div class="mask">' + 
      '<div class="confirm" code="' + code + 
      '"><span>CONFIRM</span><span class="close">&#215;</span><p>' + message +
      '</p><button>Yes</button><button>No</button>' +
      '</div>' +
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _toast (type, code, message) {
    var html = '<div class="toast ' + type + 
      '" code="' + code + 
      '"><p>' + message + 
      '</p><span class="close">&#215;</span>' + 
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _listenerInit () {
    this.node.addEventListener('click', function (event) {
      if (event.target.tagName.toLowerCase() === 'span' &&
        event.target.className.toLowerCase() === 'close') {
        if (['toast'].indexOf(event.target.parentNode.className.toLowerCase() > -1)) {
          event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }
      }
    }, false);
  }

  return notice;
}
