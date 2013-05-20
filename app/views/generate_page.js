var GenaratePage = Backbone.View.extend({
  el: "#header-container",
  template: "generate-page-jst",

  render: function() {
    var tpl = JST(this.template);
    this.$el.html(tpl({percentSelf: 20, percentEnemy: 0}));
    $(".game-place").html();
  }


});
