# simple-kmeans
A simple implementation of a single dimensional k-means clustering algorithm.

## Features
  - Single dimensional k-means clustering
  - Supports custom number of clusters and seeds
  - Supports pre-defined cluster starting points to avoid random result
  - Supports pre-defined maximum number of iterations
  - Generates random clusters and seeds if none are passed in.
  - Assertion tests

## Installation
`npm install simple-kmeans --save`

## Run Tests
`npm test`

## Usage
```javascript
var kmeans = require('simple-kmeans');

// Quick test
// seeds / clusters will be randomly generated
var result = kmeans();
//    result = {
//        "iterations": 4,
//        "result": {
//            47: [47, 47]
//            77: [78, 78, 75]
//            100: [100, 100]
//            9.5: [13, 6]
//            21.25: [21, 21, 23, 20]
//            27.5: [29, 26]
//            37.33: [40, 36, 36]
//            56.5: [56, 57]
//            65.5: [67, 64]
//        }
//    }

// define seeds that will be grouped into a cluster (can be randomly generated and of any length)
var seeds = [15,15,16,19,19,20,20,21,22,28,35,40,41,42,43,44,60,61,65];
// define starting point for clusters (can be randomly generated and of any length)
var starting_clusters = [10, 40];

// run kmeans clustering on data set, max iterations defaults to 9001 if not set
var result = kmeans(starting_clusters, seeds);
//    result = {
//        "iterations": 3,
//        "result": {
//            '19.5': [ 15, 15, 16, 19, 19, 20, 20, 21, 22, 28 ],
//            '47.89': [ 35, 40, 41, 42, 43, 44, 60, 61, 65 ]
//        }
//    }

// limit number of iterations to 2
var result = kmeans(starting_clusters, seeds, 2);
//     result = {
//         "iterations": 2,
//         "result": {
//             '18.56': [ 15, 15, 16, 19, 19, 20, 20, 21, 22, 28 ],
//             '45.9': [ 35, 40, 41, 42, 43, 44, 60, 61, 65 ]
//         }
//     }


```
