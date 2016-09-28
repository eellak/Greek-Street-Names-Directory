define([
  'underscore',
  'backbone',
  'models/MunicipalityModel'
], function (_, Backbone, MunicipalityModel) {

  var PrefectureCollection = Backbone.PageableCollection.extend({
    model: MunicipalityModel,
    url: function (url) {
      return url || 'http://localhost:8080/api/municipalities';
    },
    mode: 'server',
    sync: function (method, model, options) {
      options.dataType = 'jsonp';
      return Backbone.sync(method, model, options);
    },

    state: {
      firstPage: 1,
      currentPage: 1,
      pageSize: 25
    },

    queryParams: {
      currentPage: 'page',
      pageSize: 'limit'
    },

    initialize: function (models, options) {},

    parseState: function (resp, queryParams, state, options) {
      var state = {};
      if (resp.meta && resp.meta.state) {
        if (resp.meta.state.total_entries) {
          state.totalRecords = resp.meta.state.total_entries;
        }
      }
      return state;
    },

    parseRecords: function (resp, options) {
      return resp.data;
    }
  });

  return PrefectureCollection;
});
