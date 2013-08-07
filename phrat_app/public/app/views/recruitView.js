var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'table',
  
  template: _.template('\
    <tr> \
      <td> <img src="https://graph.facebook.com/<%= id %>/picture" /> </td> \
      <td> <%= firstName %> <%= lastName %> </td> \
      <td> <%= location %> </td> \
      <td> <%= birthday %> </td> \
      <td> \
        <ul> \
          <li> <button class="upVote <%= id %>"> Up </button> </li> \
          <li> <%= upVote %> </li> \
        </ul>\
      </td> \
      <td> \
        <ul> \
          <li> <button class="downVote <%= id %>"> Down </button> </li> \
          <li> <%= downVote %> </li> \
        </ul>\
      </td> \
      <td> <%= bio %> </td> \
    </tr> \
    '),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});