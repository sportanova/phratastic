var RecruitsListView = Backbone.View.extend({
  initialize: function(params){
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