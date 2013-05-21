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
  }
});
