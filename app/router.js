var AppRouter = Backbone.Router.extend({
  routes: {
    "":           "initApp",
    "generate":   "generatePosition",
  },

  initApp: function() {
    window.appData = {};
    window.appData.currentView = new InitPage();
    window.appData.currentView.render();
  },

  generatePosition: function() {
    if(_.isEmpty(window.appData)) {
      window.appRouter.navigate("", {trigger: true});
      return;
    }
    window.appData.currentView = new GenaratePage();
    window.appData.currentView.render();
  }

});
