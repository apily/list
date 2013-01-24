/*
 * list
 * List component
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */

/*
 * add
 * Add an item to the list,
 * emit 'add' event.
 *
 * @param {Mixed} item item to add
 * @return {List} this for chaining
 * @api public
 */

exports.add = function (list, item) {
  list.push(item);
  return list;
};

/*
 * remove
 * Remove `item` from the list,
 * if the item exists, emit 'remove' event.
 *
 * @param {Mixed} item item to add
 * @return {List} this for chaining
 * @api public
 */

exports.remove = function (list, item) {
  var index = list.indexOf(item);
  var present = index !== -1;

  if (present) {
    list.splice(index, 1);
  }

  return list;
};

/*
 * inspect
 * Return a string representation of this list.
 *
 *    [List [1,2,3]]
 *
 * @return {String}
 * @api public
 */

exports.inspect = function(list) {
  return '[List ' + JSON.stringify(list) + ']';
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
 * @param {Object} ctx context
 * @return {List} this for chaining
 * @api public
 */

exports.each = function(fn, ctx) {
  list.forEach(fn, ctx);
  return list;
};

/*
 * map
 * Map each return value from `fn(val, i)`.
 *
 *    users.map(function(user){
 *      return user.name.first
 *    })
 *
 * @param {Function} fn iterator
 * @return {List} the mapped list
 * @api public
 */

List.prototype.map = function(fn) {
  this._items = this._items || [];
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
List.prototype.where = function(fn) {
  this._items = this._items || [];
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

List.prototype.unique = function() {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = result.indexOf(item) === -1;
    if (test) {
      result.push(item);
    }
  }

  return new List(result);
};

/*
 * reject
 * Reject all values that return a truthy value of `fn(val, i)`.
 *
 *    users.reject(function(user){
 *      return user.age < 20
 *    })
 *
 * @param {Function} fn iterator
 * @return {List} the filtered list
 * @api public
 */

List.prototype.reject = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (!test) {
      result.push(item);
    }
  }

  return new List(result);
};

/*
 * compact
 * Reject `null` and `undefined`.
 *
 *    [1, null, 5, undefined].compact()
 *    // => [1,5]
 *
 * @return {List} the filtered list
 * @api public
 */

List.prototype.compact = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    if (item !== null && item !== undefined) {
      result.push(item);
    }
  }

  return new List(result);
};

/*
 * find
 * Return the first value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 *    users.find(function(user){
 *      return user.role == 'admin'
 *    })
 *
 * @param {Function} fn iterator
 * @return {Mixed}
 * @api public
 */

List.prototype.find = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return item;
    }
  }

  return;
};

/*
 * findLast
 * Return the last value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 *    users.findLast(function(user){
 *      return user.role == 'admin'
 *    })
 *
 * @param {Function} fn
 * @return {Mixed}
 * @api public
 */

List.prototype.findLast = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = len - 1; i >= 0; i -= 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return item;
    }
  }

  return;
};

/*
 * every
 * Assert that all invocations of `fn(val, i)` are truthy.
 *
 * For example ensuring that all pets are ferrets:
 *
 *    pets.all(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 *    users.all('admin')
 *
 * @param {Function|String} fn
 * @return {Boolean}
 * @api public
 */

List.prototype.all =
List.prototype.every = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (!test) {
      return false;
    }
  }

  return true;
};

/*
 * Assert that none of the invocations of `fn(val, i)` are truthy.
 *
 * For example ensuring that no pets are admins:
 *
 *    pets.none(function(p){ return p.admin })
 *    pets.none('admin')
 *
 * @param {Function|String} fn
 * @return {Boolean}
 * @api public
 */

List.prototype.none = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return false;
    }
  }

  return true;
};

/*
 * any
 * Assert that at least one invocation of `fn(val, i)` is truthy.
 *
 * For example checking to see if any pets are ferrets:
 *
 *    pets.any(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api public
 */

List.prototype.any = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return true;
    }
  }

  return false;
};

/*
 * count
 * Count the number of times `fn(val, i)` returns true.
 *
 *    var n = pets.count(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 * @param {Function} fn
 * @return {Number}
 * @api public
 */

List.prototype.count = function(fn) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;
  var n = 0;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      n += 1;
    }
  }

  return n;
};

/*
 * indexOf
 * Determine the index of `obj` or return `-1`.
 *
 * @param {Mixed} obj
 * @return {Number}
 * @api public
 */

List.prototype.indexOf = function(obj) {
  this._items = this._items || [];
  return this._items.indexOf(obj);
};


/*
 * has
 * Check if this list contains `obj`.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api public
 */

List.prototype.has =
List.prototype.contains = function(obj) {
  this._items = this._items || [];
  var items = this._items;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = item === obj;
    if (test) {
      return true;
    }
  }

  return false;
};


/*
 * reduce
 * Reduce with `fn(accumulator, val, i)` 
 * using optional `init` value 
 * defaulting to the first enumerable value.
 *
 * @param {Function} fn
 * @param {Mixed} [val]
 * @return {Mixed}
 * @api public
 */

List.prototype.reduce = function(fn, init) {
  var items = this._items;
  var len = items.length;
  var value = init;
  var start = 0;
  var i;

  if (value == null) {
    value = items[0];
    start = 1;
  }

  for (i = 0; i < len; i =+ 1) {
    value = fn(value, items[i], i);
  }

  return value;
};
