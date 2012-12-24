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
 * @param {Function} fn iterator
 * @return {List} this for chaining
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

/*
 * map
 * Map each return value from `fn(val, i)`.
 *
 * Passing a callback function:
 *
 *    users.map(function(user){
 *      return user.name.first
 *    })
 *
 * @param {Function} fn iterator
 * @return {List} the mapped list
 * @api public
 */

List.prototype.map = function(fn){
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var mapped;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    mapped = fn(item, i);
    result.push(mapped);
  }

  return new List(result);
};

/*
 * select
 * Select all values that return a truthy value of `fn(val, i)`.
 *
 *    users.select(function(user){
 *      return user.age > 20
 *    })
 *
 * @param {Function} fn iterator
 * @return {List} the list of selected items
 * @api public
 */

List.prototype.select = 
List.prototype.where = function(fn){
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (var i = 0; i < len; ++i) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      result.push(item);
    }
  }

  return new List(result);
};

/*
 * unique
 * Select all unique values.
 *
 *    nums.unique()
 *
 * @return {List} the list of unique values
 * @api public
 */

List.prototype.unique = function(){
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i =+ 1) {
    item = items[i];
    test = result.indexOf(item) === -1;
    if (test) {
      result.push(item);
    }
  }

  return new List(result);
};

