// Игровая позиция и алгоритмы генерации ее

var Position = Backbone.Model.extend({
  initialize: function() {
    this.placeSelf  = new GamePlace({isSelf: true});
    this.placeEnemy = new GamePlace({isSelf: false});
    this.currentMove = new Move();
    this.histiry = new MoveCollection();
    this.started = false;
  },

  generate: function(countAttemps) {
    var isGenSelf = false, isGenEnemy = false;
    for(var i=0; i<countAttemps; i++) {
      if(this.placeSelf.generate(countAttemps*10)) {
        isGenSelf = true;
        break;
      }
    }
    for(var i=0; i<countAttemps; i++) {
      if(this.placeEnemy.generate(countAttemps*5)) {
        isGenEnemy = true;
        break;
      }
    }
    if(isGenSelf && isGenEnemy) {
      this.trigger("generate:true");
      return true;
    } else {
      this.trigger("generate:false");
      return false;
    }
  },

  start: function() {
    var isSelf = _.random(0,1);
    this.started = true;
    if(isSelf===1) {
      this.selfMove();
    } else {
      this.enemyMove();
    }
  },

  selfMove: function() {
    this.currentMove.set({isSelf: true});
  },

  enemyMove: function() {
    var celId, cel;
    for(var i=0; i<10000; i++) {
      celId = _.random(0,9)+"x"+_.random(0,9);
      cel = this.placeSelf.cels.get(celId);
      if(cel.get("findStatus")==="undefined") {
        if(cel.get("useStatus")==="use") {
          cel.set({findStatus: "use"});
          this.placeSelf.cels.lockPosition(celId);
          if(this.placeSelf.verifyShip(celId)) {
            this.currentMove.set({isSelf: false, celId: celId, findStatus: "use"});
            this.enemyMove();
          } else {
            this.started = false;
            this.trigger("victory:enemy");
          }
        } else {
          cel.set({findStatus: "unuse"});
          this.currentMove.set({isSelf: false, celId: celId, findStatus: "unuse"});
          this.selfMove();
        }
        return;
      }
    }
  },

  userClick: function(celId) {
      var cel = this.placeEnemy.cels.get(celId);
      if(cel.get("findStatus")==="undefined") {
        if(cel.get("useStatus")==="use") {
          cel.set({findStatus: "use"});
          if(this.placeEnemy.verifyShip(celId)) {
            this.currentMove.set({isSelf: true, celId: celId, findStatus: "use"});
            this.selfMove();
          } else {
            this.started = false;
            this.trigger("victory:self");
          }
        } else {
          cel.set({findStatus: "unuse"});
          this.currentMove.set({isSelf: true, celId: celId, findStatus: "unuse"});
          this.enemyMove();
        }

      }
  }

});
