var Router = Backbone.Router.extend({

  routes: {
    'recruits': 'recruits',
    'register': 'register',
    'loggedIn': 'loggedIn'
  },

  initialize: function() {
  },
  
  recruits: function(){
    window.app = new App();
    var appView = new AppView({model: app});
    $('#main').append(appView.render());
  },

  register: function(){
    $('#main').empty();
    var registerModel = new RegisterModel();
    var registerView = new RegisterView({ model: registerModel });
    $('#main').append(registerView.render());
  }
});
