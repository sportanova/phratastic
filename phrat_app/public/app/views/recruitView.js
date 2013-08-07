var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  tagName: 'tr',
  
  template: _.template('\
      <td> <img src="https://graph.facebook.com/<%= id %>/picture/?type=large&width=200&height=200" /> </td> \
      <td> <%= firstName %> <%= lastName %> </td> \
      <td> <%= location %> </td> \
      <td> <%= birthday %> </td> \
      <td> <%= bio %> </td> \
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
    '),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});