// Игровая позиция и алгоритмы генерации ее

var Position = Backbone.Model.extend({
  initialize: function() {
    var self = this;
    this.placeSelf  = new GamePlace({isSelf: true});
    this.placeEnemy = new GamePlace({isSelf: false});
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
  }
});
