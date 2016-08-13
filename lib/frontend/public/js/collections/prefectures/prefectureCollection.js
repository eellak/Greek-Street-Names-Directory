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
      pageSize: 25,
      totalRecords: 51
    },

    // You can configure the mapping from a `Backbone.PageableCollection#state`
    // key to the query string parameters accepted by your server API.
    queryParams: {
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
