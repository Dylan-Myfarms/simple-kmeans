bc = require('basic-calculator');

/*
  in -
    k - int (Number of something)
    seeds - simple array of integers representing starting points for clusters [num, num, num]
    clusters - simple array of integers representing a single dimensional data set [num, num, num]
  out -
    result - object {iterations: num, result: object} result object is like {4: [1,2,3,4,5], 7: [6,7,8]}
 */
module.exports = function (clusters, seeds, k) {
    // initialize k if it isn't set
    if (typeof(k) == 'undefined') {
        k = 9001;
    }
    if (typeof(clusters) == 'undefined') {
        clusters = randomClusters();
    }
    if (typeof(seeds) == 'undefined') {
        seeds = randomSeeds(clusters);
    }
    // count iterations
    this.iterations = 0;

    // begin iterations
    return iterate(clusters, seeds, k);
}

iterate = function (clusters, seeds, k) {
    // increment iterations
    this.iterations++;
    // initialize object for storing cluster -> seed relationships
    assignments = initClusters(clusters);
    // assign each seed to a cluster
    assignments = assignClusters(clusters, seeds, assignments);
    // generate new centroids based on this iterations cluster assignments
    centroids = generateNewCentroids(assignments);
    // see if our centroids have changed since the start of this iteration
    changed = compareClusters(clusters, centroids);
    // if they have changed, we run it again (as long as we haven't passed the max iterations allowed)
    if (changed == true && this.iterations < k) {
        return iterate(centroids, seeds, k);
        // return assignments;
    } else {
        return {iterations: this.iterations, result: assignments};
    }
}

initClusters = function (clusters) {
    // store clusters as a property on an object pointing to an array of their seeds
    initialized = {};

    for (i = 0; i < clusters.length; i++) {
        initialized[clusters[i]] = [];
    }

    return initialized;
}

assignClusters = function (clusters, seeds, assignments) {
    // assign all seeds to the nearest cluster
    var length = seeds.length
    var cluster = null;
    for (n = 0; n < seeds.length; n++) {
        // assign seed to a cluster based on distance
        cluster = distance(clusters, seeds[n]);
        assignments[cluster].push(seeds[n]);
    }

    return assignments;
}

// return the cluster that is closest to the value
distance = function (clusters, value) {
    // track the distance of each cluster from the value
    var scores = {};
    var score_values = [];

    for (i = 0; i < clusters.length; i++) {
        // get difference
        var calculation = bc.sub(value, clusters[i]);
        // square it
        calculation = bc.sqr(calculation);
        // take square root
        scores[clusters[i]] = bc.sqrt(calculation);
    }
    // get the minimum distance
    for (var key in scores) {
        score_values.push(scores[key]);
    }
    var min_value = bc.min(score_values);

    // return the cluster with the minimum value
    for (var key in scores) {
        if (scores[key] == min_value) {
            var cluster = key;
            break;
        }
    }

    return cluster;
}

// take this iterations assignments and generate new clusters
generateNewCentroids = function (assignments) {
    centroids = [];
    for (key in assignments) {
        // get mean of aggregate
        if (assignments[key].length > 0) {
            centroids.push(bc.roundTo(bc.mean(assignments[key]), 2));
        } else {
            centroids.push(key);
        }
    }

    return centroids;
}

// see if clusters are the same
compareClusters = function (a, b) {
    for (i = 0; i < a.length; i++) {
        var matched = false;
        for (j = 0; j < b.length; j++) {
            if (b[j] === a[i]) {
                matched = true;
            }
        }

        if (matched == false) {
            return true;
        }
    }

    return false;
}

randomClusters = function () {
    var clusters = [];
    // get n number of clusters
    var n = bc.random();
    // get a starting point for each cluster
    for (i=0; i < n; i++) {
        clusters.push(bc.round(bc.random(1,100)));
    }

    return clusters;
}

randomSeeds = function (clusters) {
    var seeds = [];
    // get the number of seeds based on clusters
    var n = bc.random(bc.mult(clusters.length,2), bc.mult(clusters.length,10));
    // populate seeds
    for (i=0; i < n; i++) {
        seeds.push(bc.round(bc.random(1, 100)));
    }

    return seeds;
}
