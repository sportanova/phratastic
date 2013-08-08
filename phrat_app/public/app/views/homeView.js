var HomeView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(
      '<div> \
        <h1> Phratastic </h1> \
        <ul> \
          <li> View Everyone Rushing Your Fraternity In One Place </li>\
          <li> No More Data Entry - Let Facebook Do All the Work </li>\
          <li> Decide the Future of Your Fraternity - Vote on Recruits </li>\
        </ul> \
       </div> \
      ');
  }
});