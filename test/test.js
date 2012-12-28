var List = require('list');
var assert = require('assert');

describe('List#each(fn)', function(){
  it('should iterate each value', function(){
    var list = List([1,2,3]);
    var n = 0;

    list.each(function(item){ n += 1; });

    assert(n === 3);
  });
});
