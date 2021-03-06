var should = require('chai').should(),
    kmeans = require('../index');

describe('#correct result per settings for kmeans', function() {
  it('verifies the algorithm works on a sample set using 3 iterations', function() {
      res = kmeans([10, 40], [15,15,16,19,19,20,20,21,22,28,35,40,41,42,43,44,60,61,65])

      result = res.result
      iterations = res.iterations
      // check iterations
      iterations.should.equal(3);
      // check result
      JSON.stringify(result).should.equal(JSON.stringify({'19.5': [ 15, 15, 16, 19, 19, 20, 20, 21, 22, 28 ], '47.89': [ 35, 40, 41, 42, 43, 44, 60, 61, 65 ]}));
  });
  it('verifies the algorithm limits iterations to the number passed in (if it is passed in)s', function() {
      res = kmeans([10, 40], [15,15,16,19,19,20,20,21,22,28,35,40,41,42,43,44,60,61,65], 2)

      result = res.result
      iterations = res.iterations
      // check iterations
      iterations.should.equal(2);
  });
  it('verifies the algorithm gets slightly different result due to different number of iterations', function() {
      res = kmeans([10, 40], [15,15,16,19,19,20,20,21,22,28,35,40,41,42,43,44,60,61,65], 2)

      result = res.result
      iterations = res.iterations
      // check result
      JSON.stringify(result).should.equal(JSON.stringify({ '18.56': [ 15, 15, 16, 19, 19, 20, 20, 21, 22, 28 ],'45.9': [ 35, 40, 41, 42, 43, 44, 60, 61, 65 ]}));
  });
  it('verifies the algorithm gets the exact same result when run twice on the same settings', function() {
      res = kmeans([10, 40], [15,15,16,19,19,20,20,21,22,28,35,40,41,42,43,44,60,61,65], 2)
      res2 = kmeans([10, 40], [15,15,16,19,19,20,20,21,22,28,35,40,41,42,43,44,60,61,65], 2)

      result = res.result
      result2 = res2.result
      // check result
      JSON.stringify(result).should.equal(JSON.stringify({ '18.56': [ 15, 15, 16, 19, 19, 20, 20, 21, 22, 28 ],'45.9': [ 35, 40, 41, 42, 43, 44, 60, 61, 65 ]}));
      JSON.stringify(result2).should.equal(JSON.stringify({ '18.56': [ 15, 15, 16, 19, 19, 20, 20, 21, 22, 28 ],'45.9': [ 35, 40, 41, 42, 43, 44, 60, 61, 65 ]}));
  });
  it('verifies the algorithm will run using random numbers if none are passed in', function() {
      res = kmeans()
      result = res.result
      iterations = res.iterations
      // check result
      result = JSON.stringify(result).length > 0
      iterations = iterations > 0
      result.should.equal(true);
      iterations.should.equal(true);
  });
});
