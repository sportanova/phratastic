var RecruitsListView = Backbone.View.extend({
  initialize: function(params){
  },

  tagName: 'div',

  render: function(){
    console.log(this);
    return this.$el.html(
      this.collection.map(function(recruit) {
        return new RecruitView({model: recruit}).render();
      })
    )
    // return this.$el.html(new RecruitView().render());
  }
});