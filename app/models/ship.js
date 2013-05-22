// Корабли на игровой позиции
//
// id имеет вид "РазмерxНомер" то есть напрмер "4x3" - четверый корабль в списке, состоящий из 3 ячеек
// findStatus принимает значения: "not-found ", "found", "killed"
// rotation принимает значения: 0 (горизонтально), 1 (вертикально)
// celArray - массв id ячеек, занятых кораблем
var Ship = Backbone.Model.extend({
    defaults: {
      id: null,
      rotation: 0,
      isKilled: false,
      celArray: []
    },
    generate: function(num, length) {
      var startX = _.random(0,9);
      var startY = _.random(0,9);
      var rot = _.random(0,1);
      var celId = startX+"x"+startY;
      var cels = [celId];
      for(var i=1; i<length; i++) {
        celId = rot==0 ? (startX+i)+"x"+startY : startX+"x"+(startY+i);
        cels.push(celId);
      }
      this.set({id: (num+"x"+length), rotation: rot, celArray: cels});
    }
});

var ShipCollection = Backbone.Collection.extend({
  model: Ship
});
