var Router = Backbone.Router.extend({

  routes: {
    'test': 'test'
  },

  initialize: function() {
  },
  // /someroute#test
  test: function(){
    console.log('hey');
  }

});
