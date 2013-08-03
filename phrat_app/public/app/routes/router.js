var Router = Backbone.Router.extend({

  routes: {
    'test': 'test'
  },

  initialize: function() {
  },
  // http://127.0.0.1:3000/back#test
  test: function(){
    console.log('hey');
    window.app = new App();
      var appView = new AppView({model: app});
      $('#main').append(appView.render());
  }

});
