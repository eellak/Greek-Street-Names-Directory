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

      self.collection.fetch({ success: onDataHandler, dataType: 'jsonp', data: { page: 1 } });
    },

    render: function () {
      var self = this;

      $("#page").append(self.grid.render().$el);
    }

  });

  return HomeView;
});
