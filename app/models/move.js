// Описание хода

var Move = Backbone.Model.extend({
    defaults: {
      celId: null,            // id ячейки
      isSelf: null,           // ход игрока
      findStatus: "undefined" // статусы те же, что и в GameCel
    }
});

