/* entity.js | @cloudlam */

'use strict';

function Entity (type) {
  var binder = new DataBinder(type);

  var entity = {
    attributes: {},
    interfaces: {},
    changes: [],
    set: function (key, value) {
      this.attributes[key] = value;
      binder.publish(type + ':change', key, value, this);
    },
    get: function (key) {
      return this.attributes[key];
    },
    _binder: binder
  }

  binder.on(type + ':change', function (event, key, value, initiator) {
    if (initiator !== entity) {
      entity.set(key, value);
      entity.changes.indexOf(key) == -1 ? entity.changes.push(key) : 0;
    }
  });

  return entity;
}

var profile = new Entity('profile');
