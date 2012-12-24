/*
 * list
 * List component
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Expose `List`
 */

module.exports = List;

/*
 * Module dependencies
 */

var Emitter = require('emitter');

/*
 * List
 * Create a list.
 *
 * @param {Object} attrs attributes
 * @return {Model} a model
 */

function List(items) {
  if (!(this instanceof List)) {
    return new List(items);
  }

  Emitter.call(this);
  this._items = items;
}