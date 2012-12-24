/*
 * list
 * List component
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Module dependencies.
 */

var Emitter = require('emitter');

/*
 * Expose `List`.
 */

module.exports = List;

/*
 * Mixin emitter.
 */

Emitter(List.prototype);

/*
 * Initialize a new `Attribute`.
 *
 * @api public
 */

function List(items) {
  if (!(this instanceof List)) {
    if (Array.isArray(items)) {
      return new Enumerable(list);
    }
    return mixin(items);
  }

  this._items = items;
}

/*
 * Mixin the Attribute properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  var proto = Attribute.prototype;
  var key;

  for (key in proto) {
    obj[key] = proto[key];
  }

  return obj;
}
