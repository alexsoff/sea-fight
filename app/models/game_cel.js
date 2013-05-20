// Ячейка игрового поля
//
// useStatus - состояние по заполнению:
// - "use" - в ячейке расположен корабль (в shipId - его id в коллекции кораблей)
// - "free" - ячейка пуста и может быть занята кораблем
// - "locked" - ячейка пуста, но не может быть занята кораблем потому как касается корабля.
//
// findStatus - состояние по обнаружению:
// - "undefined" - о ячейке ничего не известно
// - "priority" - о ячейке ничего не известно, но вероятность корабля высока и ячейка подлежит первоочередной проверке
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
    _.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], function(y) {
      _.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], function(x) {
        self.add({id: (x+"x"+y)}, {silent: true});
      });
    });
  }
});
