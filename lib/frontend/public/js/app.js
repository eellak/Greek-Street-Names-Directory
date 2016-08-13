// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'backbonePaginator',
  'router' // Request router.js
], function ($, _, Backbone, backbonePaginator, Router) {
  console.log('app.js loaded');
  var initialize = function () {
    console.log('app.js initialized');
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return {
    initialize: initialize
  };
});
