var RegisterView = Backbone.View.extend({
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