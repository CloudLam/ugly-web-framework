/* notice.js | @cloudlam */

'use strict';

/**
 * Notice
 * @param {dom} object.node
 * @param {integer} object.code
 * @param {string} object.type
 * @param {string} object.msg
 */
function Notice (object) {
  var node = object.node || document.body;

  var notice = document.createElement('div');
  notice.setAttribute('class', (object.class || 'uwf-notice') + ' ' + (object.type || ''));
  notice.setAttribute('code', object.code || '');

  var msg = document.createElement('label');
  msg.innerHTML = object.msg || '';

  var close = document.createElement('span');
  close.innerHTML = '';

  notice.appendChild(msg);
  notice.appendChild(close);

  node.appendChild(notice);
}
