var Router = Backbone.Router.extend({

  routes: {
    'recruits': 'recruits',
    'recruitHome': 'recruitHome',
    'home': 'home',
  },

  initialize: function() {
  },

  headerView : new HeaderView(),

  home: function() {
    $('#main').empty();
    var homeView = new HomeView();
    $('#main').append([this.headerView.render(), homeView.render()]);
  },
  
  recruits: function(){
    $('#main').empty();
    app = new App();
    var appView = new AppView({model: app});
    $('#main').append([this.headerView.render(), appView.render()]);
  },

  recruitHome: function(){
    $('#main').empty();
    var registerModel = new RegisterModel();
    var registerView = new RegisterView({ model: registerModel });
    $('#main').append([this.headerView.render(), registerView.render()]);
  }

});
