var HomeView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(
      '<div> \
        <a href="/auth/facebook"> Login </a> \
        <a href="/loggedOut"> Logout </a> \
       </div> \
      ');
  }
});