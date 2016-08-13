define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/footer/footerTemplate.html'
], function ($, _, Backbone, footerTemplate) {
  console.log('footer view loaded');
  var FooterView = Backbone.View.extend({
    el: $("#footer"),

    render: function () {
      console.log('render the footer');
      var data = {};
      var compiledTemplate = _.template(footerTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });

  return FooterView;
});
