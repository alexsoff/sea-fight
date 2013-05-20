// Корабли на игровой позиции
//
// id имеет вид "РазмерxНомер" то есть напрмер "3x2" - второй корабль из 3 ячеек
// findStatus принимает значения: "not-found ", "found", "killed"
// rotation принимает значения: 0 (горизонтально), 1 (вертикально)
// celArray - массв id ячеек, занятых кораблем
var Ship = Backbone.Model.extend({
   defaults: {
      id: null,
      rotation: 0,
      celArray: []
   }
});

var ShipCollection = Backbone.Collection.extend({
  model: Ship
});
