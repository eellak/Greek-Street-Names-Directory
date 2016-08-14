define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/footer/footerTemplate.html'
], function ($, _, Backbone, footerTemplate) {
  var FooterView = Backbone.View.extend({
    el: $("#footer"),

    render: function () {
      var data = {};
      var compiledTemplate = _.template(footerTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });

  return FooterView;
});
