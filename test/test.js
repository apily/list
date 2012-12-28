var List = require('list');
var assert = require('component-assert');

describe('List#add(item)', function(){
  it('should emit `add` event', function(done){
    var list = List([]);
    var value = 'hello';

    assert(list._items.length === 0);

    list.on('add', function (item) {
      assert(list._items.length === 1);
      assert(list._items[0] === item);
      assert(value === item);
      done();
    });

    list.add(value);
  })
})


describe('List#remove(item)', function(){
  it('should emit `remove` event', function(done){
    var list = List(['hello', 'world']);
    var value = 'hello';

    assert(list._items.length === 2);

    list.on('remove', function (item) {
      assert(list._items.length === 1);
      assert(list._items[0] === 'world');
      assert(value === item);
      done();
    });

    list.remove(value);
  })

  it('should not emit `remove` event if item does not exist', function(){
    var list = List(['hello', 'world']);
    var value = '!';

    assert(list._items.length === 2);

    list.on('remove', function (item) {
      assert(false);
    });

    list.remove(value);
  })
})

describe('List#inspect()', function(){
  it('should return a string representation', function(){
    var list = List(['hello', 'world']);
    var repr = list.inspect();

    assert(repr === '[List ["hello","world"]]');
  })
})

describe('List#each(fn)', function(){
  it('should iterate each value', function(){
    var list = List([1,2,3]);
    var n = 0;

    list.each(function(){ n += 1; });

    assert(n === 3);
  })
})

describe('List#map(fn)', function(){
  it('should map values returned by the function', function(){
    var list = List([1,2,3]);
    var result = list.map(function(n){ return n * 2; });
    var items = result._items;

    assert(items[0] === 2);
    assert(items[1] === 4);
    assert(items[2] === 6);
  })
})

describe('List#select(fn)', function(){
  it('should select values of truthy return', function(){
    var list = List([1,2,3,4,5,0]);
    var result = list.select(function(n){ return n < 3; });
    var items = result._items;

    assert(items[0] === 1);
    assert(items[1] === 2);
    assert(items[2] === 0);
  })
})

describe('List#unique()', function(){
  it('should select unique values', function(){
    var list = List([1,2,3,2,1,0]);
    var result = list.unique();
    var items = result._items;

    assert(items[0] === 1);
    assert(items[1] === 2);
    assert(items[2] === 3);
    assert(items[3] === 0);
  })
})

