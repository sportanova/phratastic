var HeaderView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(' \
      <div class="header"> \
        <a class="log login" href="/auth/facebook"> Login </a> \
        <a class="log logout" href="/loggedOut"> Logout </a> \
      </div> \
    ');
  }
});