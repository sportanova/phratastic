var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'tr',

  template: _.template('<td> <%= name %> </td> <td> <%= age %> </td>'),

  render: function(){
    console.log('recruitView',this.model);
    return this.$el.html(this.template(this.model.attributes));
  }
})