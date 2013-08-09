var RegisterView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(' \
      <div class="memberKeyInfo"> \
        <div class="memberKey"> \
          If you\'re already in a fraternity, enter your member \
          key here \
        </div> \
        <form class="memberKeyForm" action="/memberConfirm" method="POST"> \
          <input class="memberKeyInput" type="text" name="confirm"/> \
          <input type="submit" value="submit" /> \
        </form> \
      </div> \
      <div class="recruitInstructions"> \
        <p class="recruitWatch"> If you\'re a recruit, get pumped for the fraternity experience </br> \
        by watching some college party movie scenes! </p>\
      <iframe class="partyYouTube" width="560" height="315" src="//www.youtube.com/embed/fdgYRdBdJl0?rel=0" frameborder="0" allowfullscreen></iframe> \
      </div> \
      ');
  }
});