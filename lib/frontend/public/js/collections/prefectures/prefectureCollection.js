define([
  'underscore',
  'backbone',
  'models/PrefectureModel'
], function (_, Backbone, PrefectureModel) {

  var PrefectureCollection = Backbone.PageableCollection.extend({
    model: PrefectureModel,
    url: 'http://localhost:8080/api/prefectures',
    mode: 'client',
    // Any `state` or `queryParam` you override in a subclass will be merged with
    // the defaults in `Backbone.PageableCollection` 's prototype.
    state: {
      firstPage: 0,
      currentPage: 0,
      pageSize: 25
    },

    // You can configure the mapping from a `Backbone.PageableCollection#state`
    // key to the query string parameters accepted by your server API.
    queryParams: {

      // `Backbone.PageableCollection#queryParams` converts to ruby's
      // will_paginate keys by default.
      currentPage: 'page',
      pageSize: 'limit'
    },

    initialize: function (models, options) {},

    parse: function (data) {
      return data.data;
    }
  });

  return PrefectureCollection;
});
