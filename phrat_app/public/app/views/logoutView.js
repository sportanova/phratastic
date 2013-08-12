var LogoutView = Backbone.View.extend({
  render: function() {
    return this.$el.html(' \
      <div class="loggedOut"> You logged out. </div> \
      <div class="loggedOut2"> Now we feel like crying... </div> \
      <div class="timGreen"> \
        <iframe width="560" height="315" src="//www.youtube.com/embed/B8C-q_PCiVI?rel=0" frameborder="0" allowfullscreen></iframe> \
      </div> \
    ');
  }
});