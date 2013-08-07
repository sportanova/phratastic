var HomeView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(
      '<div> \
        If you are already a fraternity member, enter your member \
        key here \
      </div> \
      <form action="/memberConfirm" method="POST"> \
        <input type="text" name="confirm"/> \
        <input type="submit" value="submit" /> \
      </form> \
      ');
  }
});