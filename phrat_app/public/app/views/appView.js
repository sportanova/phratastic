var AppView = Backbone.View.extend({
  initialize: function(params){
  },

  tagName: 'div',

  render: function(){
    return this.$el.html('hey');
  }
});