var AppView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'div',

  render: function(){
    return this.$el.html(new RecruitsListView({collection: this.model.get('recruitsList')}).render());
  }
});