var AppRouter = Backbone.Router.extend({
  routes: {
    "":           "initApp",
    "generate":   "generatePosition",
    "start":      "startGame",
  },

  initApp: function() {
    window.appData = {};
    window.appData.currentView = new InitPage();
  },

  generatePosition: function() {
    if(_.isEmpty(window.appData)) {
      window.appRouter.navigate("", {trigger: true});
      return;
    }
    window.appData.position = new Position();
    window.appData.currentView = new GenaratePage({model: window.appData.position});
  },

  startGame: function() {
    if(_.isEmpty(window.appData)) {
      window.appRouter.navigate("", {trigger: true});
      return;
    }

    // заглушка
    window.appRouter.navigate("", {trigger: true});
  }

});
