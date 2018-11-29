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
    var html = 
      '<div class="mask">' + 
        '<div class="alert" code="' + code + '">' + 
          '<span>ALERT</span>' + 
          '<span class="close">&#215;</span>' + 
          '<p>' + message + '</p>' + 
          '<button>OK</button>' +
        '</div>' + 
      '</div>';
    notice.node.appendChild(parseDOM(html)[0]);
  }

  function _confirm (code, message) {
    var html = 
      '<div class="mask">' + 
        '<div class="confirm" code="' + code + '">' + 
          '<span>CONFIRM</span>' + 
          '<span class="close">&#215;</span>' + 
          '<p>' + message + '</p>' + 
          '<button for="yes">Yes</button>' + 
          '<button for="no">No</button>' +
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
        if (['alert', 'confirm'].indexOf(event.target.parentNode.className.toLowerCase()) > -1) {
          event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
        }
        if (event.target.parentNode.className.toLowerCase().indexOf('toast') > -1) {
          event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }
      }
      if (event.target.tagName.toLowerCase() === 'button' &&
        event.target.parentNode.className.toLowerCase().indexOf('alert') > -1 ) {
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
      }
      if (event.target.tagName.toLowerCase() === 'button' &&
        event.target.parentNode.className.toLowerCase().indexOf('confirm') > -1 ) {
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
      }
    }, false);
  }

  return notice;
}
