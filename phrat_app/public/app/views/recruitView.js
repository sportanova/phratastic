var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'tr',

  template: _.template('<td> <%= firstName %> </td> <td> <%= lastName %> </td>'),

  render: function(){
    console.log('recruit view model', this.model);
    return this.$el.html(this.template(this.model.attributes));
  }
})