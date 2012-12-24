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


/*
 * inspect
 * Return a string representation of this list.
 *
 *    [List [1,2,3]]
 *
 * @return {String}
 * @api public
 */

List.prototype.inspect =
List.prototype.toString = function(){
  return '[List ' + JSON.stringify(this._items) + ']';
};

/*
 * each
 * Iterate each value and invoke `fn(val, i)`.
 *
 *    users.each(function(val, i){
 *
 *    })
 *
 * @param {Function} fn
 * @return {Object} self
 * @api public
 */

List.prototype.each = function(fn){
  var items = this._items;
  var len = items.length;
  var i;
  for (i = 0; i < len; i =+ 1) {
    fn(items[i], i);
  }
  return this;
};

