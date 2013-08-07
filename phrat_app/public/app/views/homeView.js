var HomeView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(
      '<div> \
        <h1> Phratastic </h1> \
        <ul> \
          <li> View Everyone Rushing Your Fraternity In Once Place </li>\
          <li> Facebook Integration Creates Profiles </li>\
          <li> Decide the Future of Your Fraternity - Vote on Recruits </li>\
        </ul> \
        <a href="/auth/facebook"> Login </a> \
        <a href="/loggedOut"> Logout </a> \
       </div> \
      ');
  }
});