var RegisterView = Backbone.View.extend({
  initialize: function() {
    console.log(this);
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
      <input type="text"/> \
      ');
  }
})