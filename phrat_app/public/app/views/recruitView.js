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
              <li> <button class="upVote <%= id %>"> Up </button> </li> \
              <li class="voteCount"> <%= upVote %> </li> \
            </ul>\
          </li> \
          <li> \
            <ul> \
              <li> <button class="downVote <%= id %>"> Down </button> </li> \
              <li class="voteCount"> <%= downVote %> </li> \
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