define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function ($, _, Backbone, homeTemplate) {
  var HomeView = Backbone.View.extend({
    el: $("#page"),

    render: function () {
      var data = {};
      var compiledTemplate = _.template(homeTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });

  return HomeView;
});
