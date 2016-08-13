// Router example
// @see: https://github.com/thomasdavis/backbonetutorials/blob/gh-pages/examples/modular-backbone/js/router.js

// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/footer/FooterView'
], function ($, _, Backbone, HomeView, FooterView) {
  console.log('router.js loaded');

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function () {
    console.log('router.js initialized');
    var app_router = new AppRouter;

    app_router.on('route:defaultAction', function (actions) {
      // We have no matching route, lets display the home page 
      var homeView = new HomeView();
      homeView.render();
    });

    // // Unlike the above, we don't call render on this view as it will handle
    // // the render call internally after it loads data. Further more we load it
    // // outside of an on-route function to have it loaded no matter which page is
    // // loaded initially.
    var footerView = new FooterView();
    footerView.render();
    
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
