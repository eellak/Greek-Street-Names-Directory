define([
  'jquery',
  'underscore',
  'backbone',
  'backgrid',
  'collections/prefectures/prefectureCollection',
  'text!templates/prefectures/prefecturesTemplate.html'
], function ($, _, Backbone, Backgrid, prefectureCollection, prefecturesTemplate) {

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    initialize: function () {
      // http://can-we-code-it.blogspot.co.uk/2015/06/a-backgrid-cell-for-displaying-link-to.html
      var ModelUri = Backgrid.UriCell.extend({
        render: function () {
          this.$el.empty();
          var rawValue = this.model.get(this.column.get('name'));
          var formattedValue = this.formatter.fromRaw(rawValue, this.model);
          this.$el.append($('<a>', {
            href: '#prefectures/'+rawValue+'/municipalities',
            // href: this.model.url(),
            title: this.title || formattedValue,
            target: this.target || '_self'
          }).text(formattedValue));
          this.delegateEvents();
          return this;
        }
      });

      var columns = [{
        name: '_id',
        label: 'Περιφέρεια',
        editable: false,
        cell:  ModelUri.extend({target: '_self'})
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
