var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'tr',

  template: _.template('<td> <%= name %> </td>'),

  render: function(){
    console.log('recruitView',this);
    return this.$el.html(this.template(this.model));
  }
})