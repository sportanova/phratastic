var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  // tagName: 'div',

  template: _.template('\
    <tr> \
      <td> <%= firstName %> </td> \
      <td> <%= lastName %> </td> \
      <td> <button> Up </button> </td> \
      <td> <button> Down </button> </td> \
    </tr> \
    '),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
})