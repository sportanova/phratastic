var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  className: 'recruit',
  tagName: 'tr',
  
  template: _.template('\
      <td class="picture"> <img src="https://graph.facebook.com/<%= id %>/picture/?type=large&width=200&height=200" /> </td> \
      <td class="recruitInfo"> \
        <ul> \
          <li class="name"> <%= firstName %> <%= lastName %> </li> \
          <li class="birthday"> <%= birthday %> </li> \
          <li class="location"> <%= city %> <%= state %> </li> \
          <li> \
            <ul> \
              <li> <input type="image" src="../../images/upArrow.png" class="upVote <%= id %>" /> </li> \
              <li class="voteCount voteCountUp"> <%= upVote %> </li> \
            </ul>\
          </li> \
          <li> \
            <ul class="downVoteArea"> \
              <li> <input type="image" src="../../images/downArrow.png" class="downVote <%= id %>" /> </li> \
              <li class="voteCount voteCountDown"> <%= downVote %> </li> \
            </ul>\
          </li> \
        </ul> \
        <div class="bio"> <%= bio %> </div> \
      </td> \
    '),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});