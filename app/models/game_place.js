// Игровое поле

var GamePlace = Backbone.Model.extend({
  defaults: {
      isSelf: true,
      isVictory: false
  },

  initialize: function() {
    this.cels = new GameCelCollection();
    this.ships = new ShipCollection();
  },

  empty: function() {
    this.set({cels: new GameCelCollection(), ships: new ShipCollection()});
  },

  generate: function(countAttemps) {
    var newShip;
    this.empty();
    shipArray = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    for(var i=0; i<shipArray.length; i++) {
      for(var j=1; j<=countAttemps; j++) {
        newShip = new Ship();
        newShip.generate(i, shipArray[i]);
        if(this.cels.validation(newShip)) {
          this.cels.placing(newShip);
          this.ships.add(newShip);
          break;
        } else {
          if(j==countAttemps) return false;
        }
      }
    }
    return true;
  },

  // Проверка, убит ли корабль полностью
  verifyShip: function(celId) {
    var self = this;
    var cel = this.cels.get(celId);
    if(cel.get("findStatus")==="use") {
      var shipId = cel.get("shipId");
      var ship = this.ships.get(shipId);
      var isShip = _.reduce(ship.get("celArray"), function(isS, cId) {
        return (self.cels.get(cId).get("findStatus")==="use") ? isS : false;
      }, true);
      if(isShip) {
        _.each(ship.get("celArray"), function(cId) {self.cels.get(cId).set({findStatus: "ship"});});
        ship.set({isKilled: true});
        if(self.ships.reduce(function(is, sh) { return sh.get("isKilled") ? is : false; }, true)) {
          self.trigger("victory");
          return false;
        }
      }
    }
    return true;
  }

});
