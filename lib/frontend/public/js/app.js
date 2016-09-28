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
  var initialize = function () {
    Router.initialize();
  };

  return {
    initialize: initialize
  };
});
