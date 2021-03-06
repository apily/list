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

  it('should not emit `remove` event if item does not exist', function(done){
    var list = List(['hello', 'world']);
    var value = '!';

    assert(list._items.length === 2);

    list.on('remove', function (item) {
      assert(false);
    });

    setTimeout(function() {
      done();
    }, 60);

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

describe('List#reject(fn)', function(){
  it('should select values of falsey return', function(){
    var list = List([1,2,3,4,5]);
    var result = list.reject(function(item){ return item < 3});
    var items = result._items;

    assert(items[0] === 3);
    assert(items[1] === 4);
    assert(items[2] === 5);
  })
})

describe('List#compact()', function(){
  it('should reject null and undefined values', function(){
    var list = List([1,null,2,undefined]);
    var result = list.compact();
    var items = result._items;

    assert(items[0] === 1);
    assert(items[1] === 2);
  })
})

describe('List#find(fn)', function(){
  it('should return the first truthy callback value', function(){
    var list = List([1,2,3,1,2,3]);
    var index = -1;
    var value;

    list.find(function(item, i){
      index = i;
      value = item;
      return item === 2;
    });

    assert(index === 1);
    assert(value === 2);
  });
});

describe('List#findLast(fn)', function(){
  it('should return the last truthy callback value', function(){
    var list = List([1,2,3,1,2,3]);
    var index = -1;
    var value;

    list.findLast(function(item, i){
      index = i;
      value = item;
      return item === 2;
    });

    assert(index === 4);
    assert(value === 2);
  });
});

describe('List#every(fn)', function(){
  it('should alias List#all()', function(){
    var list = List([1,2,3]);
    var test = list.every(function(item){ return item < 5; });

    assert(test);
  });
});

describe('List#all(fn)', function(){
  it('should return true when all returns are truthy', function(){
    var list = List([1,2,3]);
    var test = list.every(function(item){ return item < 5; });

    assert(test);
  });

  it('should return false when some are falsey', function(){
    var list = List([1,2,3]);
    var test = list.every(function(item){ return item < 2; });

    assert(test === false);
  });
});

describe('List#none(fn)', function(){
  it('should return true when fn() is always false', function(){
    var enrico = { name: 'enrico', admin: false };
    var federico = { name: 'federico', admin: false };
    var users = List([enrico, federico]);
    var test = users.none(function(user) { return user.admin; });

    assert(test);
  })

  it('should return false when fn() is not always false', function(){
    var enrico = { name: 'enrico', admin: false };
    var federico = { name: 'federico', admin: false };
    var ciccio = { name: 'ciccio', admin: true };
    var users = List([enrico, federico, ciccio]);
    var test = users.none(function(user) { return user.admin; });

    assert(test === false);
  })
})

describe('List#any(fn)', function(){
  it('should return true when any are truthy', function(){
    var list = List([1,2,3]);
    var test = list.any(function(item){ return item < 2; });

    assert(test);
  })

  it('should return false when none are truthy', function(){
    var list = List([1,2,3]);
    var test = list.any(function(item){ return item < 0; });

    assert(test === false);
  })
})

describe('List#count(fn)', function(){
  it('should return the occurrances of truthy values', function(){
    var list = List([1,-2,3,-4,5]);
    var n = list.count(function(item){ return item < 0; });

    assert(n === 2);
  })
})

describe('List#indexOf(value)', function(){
  it('should return the index using ===', function(){
    var enrico = { name: 'enrico', admin: false };
    var federico = { name: 'federico', admin: false };
    var users = List([enrico, federico]);

    assert(users.indexOf(enrico) === 0);
    assert(users.indexOf(federico) === 1);
    assert(users.indexOf('007') === -1);
  })
})

describe('List#has(value)', function(){
  describe('when value is present', function(){
    it('should return true', function(){
      var enrico = { name: 'enrico', admin: false };
      var federico = { name: 'federico', admin: false };
      var users = List([enrico, federico]);

      assert(users.has(enrico));
      assert(users.has(federico));
    })
  })

  describe('when value is not present', function(){
    it('should return false', function(){
      var enrico = { name: 'enrico', admin: false };
      var federico = { name: 'federico', admin: false };
      var users = List([enrico, federico]);

      assert(users.has('007') === false);
    })
  })
})

describe('List#reduce(fn)', function(){
  describe('List#reduce(fn)', function(){
    it('should use the first value as the accumulator', function(){
      var list = List([1,2,3,4,5]);
      var result = list.reduce(function(sum, n){ return sum + n; });
      assert(result === 15);
    })
  })

  describe('List#reduce(fn, init)', function(){
    it('should use the accumulator', function(){
      var list = List([1,2,3,4,5]);
      var result = list.reduce(function(sum, n){ return sum + n; }, 5);
      assert(result === 20);
    })
  })
})
