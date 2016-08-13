define([
  'jquery',
  'underscore',
  'backbone',
  'backgrid',
  'collections/prefectures/prefectureCollection',
  'text!templates/home/homeTemplate.html'
], function ($, _, Backbone, Backgrid, prefectureCollection, homeTemplate) {

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    initialize: function () {
      var columns = [{
        name: '_id',
        label: 'Περιφέρεια',
        editable: false,
        cell: 'string'
      }];

      var self = this;

      var options = {};

      var onDataHandler = function (collection) {
        self.render();
      }

      self.collection = new prefectureCollection();

      self.grid = new Backgrid.Grid({
        columns: columns,
        collection: self.collection
      });

      self.paginator = new Backgrid.Extension.Paginator({

        // If you anticipate a large number of pages, you can adjust
        // the number of page handles to show. The sliding window
        // will automatically show the next set of page handles when
        // you click next at the end of a window.
        windowSize: 25, // Default is 10

        // Used to multiple windowSize to yield a number of pages to slide,
        // in the case the number is 5
        slideScale: 0.25, // Default is 0.5

        // Whether sorting should go back to the first page
        goBackFirstOnSort: false, // Default is true

        collection: self.collection
      });

      self.collection.fetch({ success: onDataHandler, dataType: 'jsonp', data: { page: 1 } });
    },

    render: function () {
      var self = this;

      $("#page").append(self.grid.render().$el);
      $("#page").append(self.paginator.render().$el);
    }

  });

  return HomeView;
});
