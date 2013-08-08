var Router = Backbone.Router.extend({

  routes: {
    'recruits': 'recruits',
    'recruitHome': 'recruitHome',
    'home': 'home',
  },

  initialize: function() {
  },

  home: function() {
    $('#main').empty();
    var headerView = new HeaderView();
    var homeView = new HomeView();
    $('#main').append([headerView.render(), homeView.render()]);
  },
  
  recruits: function(){
    $('#main').empty();
    app = new App();
    var appView = new AppView({model: app});
    $('#main').append(appView.render());
  },

  recruitHome: function(){
    $('#main').empty();
    var registerModel = new RegisterModel();
    var registerView = new RegisterView({ model: registerModel });
    $('#main').append(registerView.render());
  }

});
