var RegisterView = Backbone.View.extend({
  render: function(){
    return this.$el.html('<a href="/auth/facebook/callback"> Login</a>');
  }
})