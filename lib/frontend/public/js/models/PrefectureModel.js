define([
  'underscore',
  'backbone',
], function (_, Backbone) {

  var PrefectureModel = Backbone.Model.extend({

    defaults: {
      query: {}
    },

    initialize: function (options) {
      this.query = options.query;
    },

    url: function () {
      return 'http://localhost:8080/api/prefectures';
    },

    parse: function (res) {
      // because of jsonp 
      return res.data;
    }

  });

  return PrefectureModel;

});
