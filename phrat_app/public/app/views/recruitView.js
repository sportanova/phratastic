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
          <li> <button class="upVote"> Up </button> </li> \
          <li> <%= upVote %> </li> \
        </ul>\
      </td> \
      <td> \
        <ul> \
          <li> <button class="downVote"> Down </button> </li> \
          <li> <%= downVote %> </li> \
        </ul>\
      </td> \
    </tr> \
    '),

  render: function(){
    console.log(this.model.attributes);
    return this.$el.html(this.template(this.model.attributes));
  }
})