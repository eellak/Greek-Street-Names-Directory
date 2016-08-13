// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.paginator',
  'backgrid',
  'backgrid.paginator',
  'router'
], function ($, _, Backbone, backbonePaginator, backgrid, backgridPaginator, Router) {
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
