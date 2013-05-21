var GenaratePage = Backbone.View.extend({
  el: "#header-container",
  template: "generate-page-jst",
  events: {
    "click #btn-start":          "start"
  },

  initialize: function() {
    this.viewSelf  = new GamePlaceWitget({el: "#place-self",  model: this.model.placeSelf});
    this.viewEnemy = new GamePlaceWitget({el: "#place-enemy", model: this.model.placeEnemy});
    this.model.placeSelf.ships.on("add", this.render, this);
    this.model.placeEnemy.ships.on("add", this.render, this);
    this.model.on("generate:false", function() {window.appRouter.navigate("", {trigger: true});});
    this.model.on("generate:true", function() {$("#btn-start").show();});
    this.render();
    this.model.generate(10);
  },

  render: function() {
    var tpl = JST(this.template);
    this.$el.html(tpl({percentSelf: this.model.placeSelf.ships.length*10, percentEnemy: this.model.placeEnemy.ships.length*10}));
    this.viewSelf.render();
    this.viewEnemy.render();
  },

  start: function() {
    window.appRouter.navigate("start", {trigger: true});
  }

});
