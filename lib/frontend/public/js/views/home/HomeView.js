define([
  'jquery',
  'underscore',
  'backbone',
  'models/PrefectureModel',
  // 'views/sidebar/SidebarView',
  'text!templates/home/homeTemplate.html'
], function ($, _, Backbone, PrefectureModel /*, SidebarView*/ , homeTemplate) {

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    initialize: function () {
      var self = this;
      var options = {};
      var onDataHandler = function (collection) {
        self.render();
      }

      this.model = new PrefectureModel(options);
      this.model.fetch({ success: onDataHandler, dataType: 'jsonp', data: { page: 1 } });
    },

    render: function () {
      var res = this.model.toJSON();
      console.log(res);
      var data = {
        prefectures: res,
        _: _
      };
      // $('.menu li').removeClass('active');
      // $('.menu li a[href="#"]').parent().addClass('active');
      var tmpl = _.template(homeTemplate);
      var compiled = tmpl(data);
      this.$el.html(compiled);

      // var sidebarView = new SidebarView();
      // sidebarView.render();
    }

  });

  return HomeView;
});
