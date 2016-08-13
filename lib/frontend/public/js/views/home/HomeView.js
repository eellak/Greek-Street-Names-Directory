define([
  'jquery',
  'underscore',
  'backbone',
  'collections/prefectures/prefectureCollection',
  'text!templates/home/homeTemplate.html'
], function ($, _, Backbone, prefectureCollection, homeTemplate) {

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    initialize: function () {
      var self = this;
      var options = {};
      var onDataHandler = function (collection) {
        self.render();
      }

      this.collection = new prefectureCollection();
      this.collection.fetch({ success: onDataHandler, dataType: 'jsonp', data: { page: 1 } });
    },

    render: function () {
      var data = {
        prefectures: this.collection.toJSON()
      };

      var tmpl = _.template(homeTemplate);
      var compiled = tmpl(data);
      
      this.$el.html(compiled);
    }

  });

  return HomeView;
});
