var GamePlaceWitget = Backbone.View.extend({
  template: "game-place-jst",

  render: function() {
    var tpl = JST(this.template);
    var idPrefix = this.model.get("isSelf") ? "self-" : "enemy-"
    var celId, node;
    var self = this;
    this.$el.html(tpl({pref: idPrefix}));
    if(!this.model.get("isSelf")) {
      node = $("#place-enemy");
      node.find('td').addClass("clicable");
      $(".clicable").click(function(evt) {self.userClick(evt);});
      this.model.cels.each(function(cel) {
        celId = cel.get("id");
        node = $("#"+idPrefix+celId);
        self.bgColor(cel, node, "findStatus");
        self.celMarker(cel, node);
      });
    } else {
      this.model.cels.each(function(cel) {
        celId = cel.get("id");
        node = $("#"+idPrefix+celId);
        self.bgColor(cel, node, "useStatus");
        self.celMarker(cel, node);
      });
    }
  },

  bgColor: function(cel, node, status) {
    if(cel.get(status)==="use") {
      node.addClass("ship-normal");
    }
    if(cel.get("findStatus")==="ship") {
      node.addClass("ship-find");
    }
  },

  celMarker: function(cel, node) {
    if((cel.get("findStatus")==="use") || (cel.get("findStatus")==="ship") ) {
      node.html('<img src="app/images/x.gif" />');
    } else {
      if(cel.get("findStatus")==="unuse") {
        node.html('<img src="app/images/p.gif" />');
      }
    }
  },

  userClick: function(evt) {
    if(window.appData.position.started) {
      var node = $(evt.currentTarget);
      var celId = node.attr("id").split("-")[1];
      window.appData.position.userClick(celId);
    }
  }

});
