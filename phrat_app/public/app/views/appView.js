var AppView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'div',

  render: function(){
    // window.expressInfo = new RecruitsList().fetch();
    // console.log(expressInfo.readyState);
    var a = new RecruitsList().fetch({
      success: function(collection, response) {
        console.log(response);
      }
    });
    return this.$el.html(new RecruitsListView({collection: this.model.get('recruitsList')}).render());
  }
});