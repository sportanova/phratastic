var RecruitView = Backbone.View.extend({
  initialize: function(){
  },

  template: _.template('\
    <tr> \
      <td> <img src="https://graph.facebook.com/100000770186683/picture" /> </td> \
      <td> <%= firstName %> <%= lastName %> </td> \
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
    </tr> \
    '),

  render: function(){
    console.log(this.model.attributes);
    return this.$el.html(this.template(this.model.attributes));
  }
})