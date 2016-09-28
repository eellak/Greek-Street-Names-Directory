define([
  'underscore',
  'backbone',
  'models/PrefectureModel'
], function (_, Backbone, PrefectureModel) {

  var PrefectureCollection = Backbone.PageableCollection.extend({
    model: PrefectureModel,
    url: 'http://localhost:8080/api/prefectures',
    mode: 'server',
    sync: function (method, model, options) {
      options.dataType = 'jsonp';
      return Backbone.sync(method, model, options);
    },
    // Any `state` or `queryParam` you override in a subclass will be merged with
    // the defaults in `Backbone.PageableCollection` 's prototype.
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
