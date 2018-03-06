/* databinder.js | @cloudlam */

'use strict';

function DataBinder(object) {
  // Create a simple DataBinder object
  var binder = {
    callbacks: {},

    on: function(message, callback) {
      this.callbacks[message] = this.callbacks[message] || [];
      this.callbacks[message].push(callback);
    },

    publish: function(message) {
      this.callbacks[message] = this.callbacks[message] || [];
      for (var i = 0; i < this.callbacks[message].length; i++) {
        this.callbacks[message][i].apply(this, arguments);
      }
    }
  };

  var data_attr = 'data-bind-' + object;

  var message = object + ':change';

  var changeHandler = function(event) {
    var target = event.target || event.srcElement; // IE8 compatibility
    var prop = target.getAttribute(data_attr);
    if (prop && prop !== '') {
      binder.publish(message, prop, target.value);
    }
  };

  // Listen to change events and proxy to DataBinder
  if (document.addEventListener) {
    document.addEventListener('change', changeHandler, false);
  } else {
    // IE8 uses attachEvent instead of addEventListener
    document.attachEvent('onchange', changeHandler);
  }

  // DataBinder propagates changes to all bound elements
  binder.on(message, function(event, prop, value) {
    var elements = document.querySelectorAll('[' + data_attr + '=' + prop + ']');

    for (var i = 0; i < elements.length; i++) {
      var tag = elements[i].tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        elements[i].value = value;
      } else {
        elements[i].innerHTML = value;
      }
    }
  });

  return binder;
}
