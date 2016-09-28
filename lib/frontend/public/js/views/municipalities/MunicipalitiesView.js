define([
  'jquery',
  'underscore',
  'backbone',
  'backgrid',
  'collections/municipalities/municipalitiesCollection'
], function ($, _, Backbone, Backgrid, municipalitiesCollection) {

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    initialize: function () {
      var columns = [{
        name: '_id',
        label: 'Δήμος',
        editable: false,
        cell: 'string'
      }];

      var self = this;

      var options = {};

      var onDataHandler = function (collection) {
        self.render();
      }

      self.collection = new municipalitiesCollection();

      self.grid = new Backgrid.Grid({
        columns: columns,
        collection: self.collection
      });

      self.paginator = new Backgrid.Extension.Paginator({
        windowSize: 25,
        slideScale: 0.25,
        goBackFirstOnSort: false,
        collection: self.collection
      });

      self.collection.fetch({ success: onDataHandler });
    },

    render: function () {
      var self = this;

      $("#page").html(self.grid.render().$el);
      $("#page").append(self.paginator.render().$el);
    }

  });

  return HomeView;
});
