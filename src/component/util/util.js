/* util.js | @cloudlam */

'use strict'

/**
 * XHR: create XMLHttpRequest object
 * @param
 * @return {object} XMLHttpRequest
 * @throws {XHRErrorException} - XHR error
 */
function XHR () {
  if (window.XMLHttpRequest) {
    // IE7+, FireFox, Opera, Chrome, Safari and etc.
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // IE6-
    var version = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'];
    for (var i = 0; i < version.length; i++) {
      try {
        return new ActiveXObject(version[i]);
        break;
      } catch(e) {}
    }
  } else {
    throw new Error('XHR unsupported');
  }
}

/**
 * params: encode data using URIComponent
 * @param {key: data, ...} data
 * @return {string} - encoded data
 * @throws
 */
function params (data) {
  var array = [];
  for (var key in data) {
    array.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  return array.join('&');
}

/**
 * parseDOM: parse String to DOM
 * @param {string} html
 * @return {dom} - parsed data
 * @throws
 */
function parseDOM (html) {
  var dom = document.createElement('div');
  dom.innerHTML = html;

  return dom.childNodes;
}

/**
 * ajax: get data using ajax
 * @param {url, method, [data], [type], [async], [processData]} object
 * @return
 * @throws {AJAXErrorException} - AJAX error
 */
function ajax (object) {
  var xhr = new XHR();

  var data = object.data || {};
  var async = (object.async == null || object.async) ? true : false;
  var type = object.type || 'application/x-www-form-urlencoded';
  var processData = (object.processData == null || object.processData) ? true : false;

  if (processData) {
    data = params(data);
  }

  if (object.method === 'get' || object.method === 'GET') {
    object.url += '?' + data;
  }

  try {
    xhr.timeout = async ? object.timeout || 5000 : 0;
  } catch(e) {}
  xhr.open(object.method, object.url, async);

  try {
    if (object.method === 'post' || object.method === 'POST') {
      // Post method
      xhr.setRequestHeader('Content-Type', type);
      xhr.send(data);
    } else {
      // Get method
      xhr.send(null);
    }
  } catch(e) {}

  if (async === true) {
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        done();
      }
    }
  } else if (async === false) {
    done();
  }

  xhr.ontimeout = function (event) {
    throw new Error(object.url + ': Request Timeout');
  }

  function done () {
    if (xhr.status == 200) {
      object.success(xhr.responseText);
    } else if (object.error) {
      object.error(xhr);
    } else {
      throw new Error(xhr.status + ': ' + xhr.statusText);
    }
  }
}

/**
 * load: load components using ajax
 * @param {url, [node], [data]} object
 * @param {function} callback
 * @return
 * @throws {AJAXErrorException} - AJAX error
 */
function load (object, callback) {
  var xhr = new XHR();

  var node = object.node || null;
  var data = object.data || {};

  try {
    xhr.timeout = async ? object.timeout || 5000 : 0;
  } catch(e) {}
  xhr.open('get', object.url, true);

  try {
    xhr.send(null);
  } catch(e) {}

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var dom = done();
      if (callback) {
        callback(xhr, dom);
      }
    }
  }

  xhr.ontimeout = function (event) {
    throw new Error(object.url + ': Request Timeout');
  }

  function done () {
    if (xhr.status == 200) {
      var child = '';

      if (Object.prototype.toString.call(data) === '[object Array]') {
        // object.data like array[{object}, ...]
        for (var i = 0; i < data.length; i++) {
          var comp = xhr.responseText;
          for (var key in data[i]) {
            comp = comp.replace(key, data[i][key]);
          }
          child += comp;
        }
      } else {
        // object.data like {object}
        child = xhr.responseText;
        for (var key in data) {
          child = child.replace(key, data[key]);
        }
      }

      child = child.replace(/[\r\n]/g, '').replace(/\s+</g, '<').replace(/>\s+/g, '>');

      if (node) {
        node.innerHTML = child;
      }

      return node.children;
    } else {
      throw new Error(xhr.status + ': ' + xhr.statusText);
    }
  }
}

/**
 * delegate: event delegate
 * @param {string} node - node id
 * @param {string} event - event name
 * @param {string} selector - id/class
 * @param {function} callback
 * @return
 * @throws
 */
function delegate (node, event, selector, callback) {

  var handler = function(e) {
    var target = e.target || e.srcElement; // IE8 compatibility

    // special deal with tag LABEL and tag I
    if ((target.tagName.toLowerCase() === 'label' && 
      target.id != selector && 
      target.className.split(' ').indexOf(selector) == -1) || 
      (target.tagName.toLowerCase() === 'i' && 
      target.id != selector && 
      target.className.split(' ').indexOf(selector) == -1)) {

      target = target.parentNode;
    }

    if (target.id === selector || target.className.split(' ').indexOf(selector) != -1) {
      callback.call(target, e);
    }
  };

  // Listen to change events and proxy to DataBinder
  if (document.getElementById(node).addEventListener) {
    document.getElementById(node).addEventListener(event, handler, false);
  } else {
    // IE8 uses attachEvent instead of addEventListener
    document.getElementById(node).attachEvent('on' + event, handler);
  }
}

/**
 * isEmptyObject
 * @param {object} object
 * @return {boolean} - true/false
 * @throws
 */
function isEmptyObject (object) {
  for (var key in object) {
    return false;
  }
  return true;
}

/**
 * stopBubble
 * @param {event} event
 * @return
 * @throws
 */
function stopBubble (event) {
  window.event ? window.event.cancelBubble = true : event.stopPropagation();
}

/**
 * stopDefault
 * @param {event} event
 * @return
 * @throws
 */
function stopDefault (event) {
  window.event ? window.event.returnValue = false : event.preventDefault();
}

/**
 * insertAfter
 * @param {dom} element
 * @param {dom} target
 * @return
 * @throws
 */
function insertAfter (element, target) {
  var parent = target.parentNode;
  var next = target.nextElementSibling || target.nextSibling;
  var last = parent.lastElementChild || parent.lastChild;

  if (last == target) {
    parent.appendChild(element);
  } else {
    parent.insertBefore(element, target.nextElementSibling);
  }
}
