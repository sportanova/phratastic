var RecruitsListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new RecruitsList();
    var self = this;
    this.collection.fetch({
      reset: true,
      success: function(collection, response) {
      },
      error: function() {
        console.log('error');
      }
    });
    this.collection.on("reset", this.render, this);
  },

  tagName: 'div',

  render: function(){
    return this.$el.html(
      this.collection.map(function(recruit) {
        return new RecruitView({model: recruit}).render();
      })
    )
  }
});