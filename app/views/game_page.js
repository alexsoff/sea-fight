var GamePage = Backbone.View.extend({
  el: "#header-container",
  template: "game-page-jst",
  events: {
    "click #btn-restart":          "restart"
  },

  initialize: function() {
    this.viewSelf  = new GamePlaceWitget({el: "#place-self",  model: this.model.placeSelf});
    this.viewEnemy = new GamePlaceWitget({el: "#place-enemy", model: this.model.placeEnemy});
    this.render();
    this.model.currentMove.on("change", this.render, this);
    this.model.on("victory:enemy", this.victoryEnemy, this);
    this.model.on("victory:self", this.victorySelf, this);
    this.model.start();
  },

  render: function() {
    var tpl = JST(this.template);
    this.$el.html(tpl({}));
    this.viewSelf.render();
    this.viewEnemy.render();
    if(this.model.currentMove.get("isSelf")) {
      $("#game-message").html("Ваш ход");
    } else {
      $("#game-message").html("&nbsp;");
    }
  },

  restart: function() {
    window.appRouter.navigate("", {trigger: true});
  },

  victorySelf: function() {
    this.render();
    $("#game-message").html("Вы выиграли");
    $("#btn-restart").show();
  },

  victoryEnemy: function() {
    this.render();
    $("#game-message").html("Вы проиграли");
    $("#btn-restart").show();
  }

});
