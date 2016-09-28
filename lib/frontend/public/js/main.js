require.config({
  paths: {
    'jquery': '/modules/jquery/dist/jquery',
    'underscore': '/modules/underscore/underscore-min',
    'backbone': '/modules/backbone/backbone-min',
    'backbone.paginator': '/modules/backbone.paginator/lib/backbone.paginator',
    'backgrid': '/modules/backgrid/lib/backgrid',
    'backgrid.paginator': '/modules/backgrid-paginator/backgrid-paginator',
    'text': '/modules/text/text',
    'templates': '/public/templates'
  }
});

require([
  'app',
], function (App) {
  App.initialize();
});
