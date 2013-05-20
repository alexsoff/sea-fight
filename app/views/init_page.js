var InitPage = Backbone.View.extend({
  el: "#header-container",
  template: "init-page-jst",
  events: {
    "click #btn-generate":          "generate"
  },

  render: function() {
    var tpl = JST(this.template);
    this.$el.html(tpl({}));
    $(".game-place").html();
  },

  generate: function() {
    window.appRouter.navigate("generate", {trigger: true});
  }

});
