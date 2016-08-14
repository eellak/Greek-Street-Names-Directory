// Router example
// @see: https://github.com/thomasdavis/backbonetutorials/blob/gh-pages/examples/modular-backbone/js/router.js

define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/prefectures/PrefecturesView',
  'views/footer/FooterView'
], function ($, _, Backbone, HomeView, PrefecturesView, FooterView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'prefectures': 'prefecturesRoute',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function () {
    var app_router = new AppRouter;

    app_router.on('route:prefecturesRoute', function () {
      var prefecturesView = new PrefecturesView();
      prefecturesView.render();
    });

    app_router.on('route:defaultAction', function (actions) {
      var homeView = new HomeView();
      homeView.render();
    });

    var footerView = new FooterView();
    footerView.render();

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
