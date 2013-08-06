var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  // tagName: 'div',

  template: _.template('\
    <tr> \
      <td> <%= firstName %> </td> \
      <td> <%= lastName %> </td> \
      <td> \
        <ul> \
          <li> <button> Up </button> </li> \
          <li> 5 </li> \
        </ul>\
      </td> \
      <td> \
        <ul> \
          <li> <button> Down </button> </li> \
          <li> 2 </li> \
        </ul>\
      </td> \
    </tr> \
    '),

  render: function(){
    console.log(this.model.attributes);
    return this.$el.html(this.template(this.model.attributes));
  }
})