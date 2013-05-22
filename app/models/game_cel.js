// Ячейка игрового поля
//
// useStatus - состояние по заполнению:
// - "use" - в ячейке расположен корабль (в shipId - его id в коллекции кораблей)
// - "free" - ячейка пуста и может быть занята кораблем
// - "locked" - ячейка пуста, но не может быть занята кораблем потому как касается корабля.
//
// findStatus - состояние по обнаружению:
// - "undefined" - о ячейке ничего не известно
// - "locked" - известно что ячейка пуста, потому как по диагонали корабль
// - "unuse" - ячейка проверена и пуста
// - "use" - в ячейке обнаружена часть корабля
// - "ship" - в ячейке часть корабля, который полностью подбит

var GameCel = Backbone.Model.extend({
   defaults: {
      id: null,    // id имеет вид "XxY" то есть напрмер "2x8"
      useStatus: "free",
      findStatus: "undefined",
      shipId: null
   }
});

// Сетка игрового поля 100 элементов.
var GameCelCollection = Backbone.Collection.extend({
  model: GameCel,

  initialize: function() {
    var self = this;
    for(var y=0; y<10; y++) {
      for(var x=0; x<10; x++) {
        self.add({id: (x+"x"+y)}, {silent: true});
      }
    }
  },

  // Доступна ли клетка для размещения корабля
  validation: function(newShip) {
    var cels = newShip.get("celArray");
    var tmpCel;
    for(var i=0; i<cels.length; i++) {
      tmpCel = this.get(cels[i]);
      if(_.isEmpty(tmpCel)) return false;
      if(tmpCel.get("useStatus")!=="free") return false;
    }
    return true;
  },

  // Размещение корабля (и пометка недоступных клеток)
  placing: function(newShip) {
    var cels = newShip.get("celArray");
    var tmpCel, x, y, tmp1Cel, lst, ids;
    var self = this;
    for(var i=0; i<cels.length; i++) {
      tmpCel = this.get(cels[i]);
      tmpCel.set({useStatus: "use", shipId: newShip.get("id")});
      lst = cels[i].split("x");
      x = lst[0]*1;
      y = lst[1]*1;
      ids = _.map([[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,-1], [-1,0], [-1,1]], function(delta) {return ((x+delta[0])+"x"+(y+delta[1]));})
      _.each(ids, function(id) {
        tmp1Cel = self.get(id);
        if( !_.isEmpty(tmp1Cel) && tmp1Cel.get("useStatus")==="free" ) {
          tmp1Cel.set({useStatus: "locked"});
        }
      });
    }
    return true;
  },

  // Пометка клеток, в которых точно не может быть корабля (при поиске)
  lockPosition: function(celId) {
    var self = this;
    var lst = celId.split("x");
    var x = lst[0]*1;
    var y = lst[1]*1;
    _.each([[1,-1], [1,1], [-1,-1], [-1,1]], function(delta) {
      var cId = ((x+delta[0])+"x"+(y+delta[1]));
      var cel = self.get(cId);
      if( !_.isEmpty(cel) && cel.get("findStatus")==="undefined") {
        cel.set({findStatus: "locked"});
      }
    });
  }

});
