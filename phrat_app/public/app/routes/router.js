var Router = Backbone.Router.extend({

  routes: {
    'recruits': 'recruits',
    'recruitHome': 'recruitHome',
    'home': 'home',
  },

  initialize: function() {
    this.$main = $('#main');
    this.headerView = new HeaderView();
  },


  home: function() {
    this.$main.empty();
    var homeView = new HomeView();
    this.$main.append([this.headerView.render(), homeView.render()]);
  },
  
  recruits: function(){
    this.$main.empty();
    app = new App();
    var appView = new AppView({model: app});
    this.$main.append([this.headerView.render(), appView.render()]);
  },

  recruitHome: function(){
    this.$main.empty();
    var registerModel = new RegisterModel();
    var registerView = new RegisterView({ model: registerModel });
    this.$main.append([this.headerView.render(), registerView.render()]);
  }
});
