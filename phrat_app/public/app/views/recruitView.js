var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  className: 'recruit',
  tagName: 'tr',
  
  template: _.template('\
      <td> <img class="profilePic" src="https://graph.facebook.com/<%= id %>/picture/?type=large&width=200&height=200" /> </td> \
      <td class="name"> <%= firstName %> </br> <%= lastName %> </td> \
      <td class="birthday"> <%= birthday %> </td> \
      <td class="location"> <%= city %> </br> <%= state %> </td> \
      <td class="bio"> <%= bio %> </td> \
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
    console.log(this.model.attributes.upVote);
    return this.$el.html(this.template(this.model.attributes));
  }
});