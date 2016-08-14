define([
  'underscore',
  'backbone',
  'models/MunicipalityModel'
], function (_, Backbone, MunicipalityModel) {

  var PrefectureCollection = Backbone.PageableCollection.extend({
    model: MunicipalityModel,
    url: 'http://localhost:8080/api/municipalities',
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
      totalRecords: 1100 // @todo: get this value from the api
    },

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
