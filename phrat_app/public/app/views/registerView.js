var RegisterView = Backbone.View.extend({
  initialize: function() {
    this.model.fetch({
      reset: true,
      success: function(collection, response) {

      },
      error: function() {
        console.log('error in RegisterView');
      }
    })
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
})