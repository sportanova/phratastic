var Router = Backbone.Router.extend({

  routes: {
    'test': 'test'
  },

  initialize: function() {
  },
  test: function(){
    console.log('hey');
  }

});
