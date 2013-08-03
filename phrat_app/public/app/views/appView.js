var AppView = Backbone.View.extend({
  initialize: function(){
    this.model.on("reset", this.render, this);
  },

  render: function(){
    return this.$el.html(new RecruitsListView().render());
  }
});