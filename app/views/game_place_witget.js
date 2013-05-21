var GamePlaceWitget = Backbone.View.extend({
  template: "game-place-jst",

  render: function() {
    var tpl = JST(this.template);
    var idPrefix = this.model.get("isSelf") ? "self-" : "enemy-"
    var celId, node;
    this.$el.html(tpl({pref: idPrefix}));
    if(!this.model.get("isSelf")) {
       node = $("#place-enemy");
       node.addClass("clicable");
    } else {
      this.model.cels.each(function(cel) {
        if(cel.get("useStatus")==="use") {
          celId = cel.get("id");
          node = $("#"+idPrefix+celId);
          node.addClass("ship-normal");
        }
      });
    }
  }

});
