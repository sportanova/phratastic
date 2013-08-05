var Router = Backbone.Router.extend({

  routes: {
    'recruits': 'recruits',
    'register': 'register'
  },

  initialize: function() {
  },
  // http://127.0.0.1:3000/back#test
  recruits: function(){
    window.app = new App();
    var appView = new AppView({model: app});
    $('#main').append(appView.render());
  },

  register: function(){
    console.log('register');
    var registerView = new RegisterView();
    $('#main').append(registerView.render());

  }

});
