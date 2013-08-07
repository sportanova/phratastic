var Router = Backbone.Router.extend({

  routes: {
    'recruits': 'recruits',
    'recruitHome': 'recruitHome',
    'loggedIn': 'loggedIn',
    'home': 'home'
  },

  initialize: function() {
  },

  home: function() {
    $('#main').empty();
    console.log('home');
    var homeView = new HomeView();
    $('#main').append(homeView.render());
  },
  
  recruits: function(){
    $('#main').empty();
    window.app = new App();
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
