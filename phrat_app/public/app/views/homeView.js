var HomeView = Backbone.View.extend({
  initialize: function() {
  },
  render: function(){
    return this.$el.html(
      '<div> \
        <h1 class="title"> Phratastic </h1> \
        <h2 class="tagline"> Fraternity Recruitment for the 21st Century</h2> \
        <img class="screenShot" src="../images/screenShot.png"/> \
        <ul class="features"> \
          <li class="featuresTitle"> Members: </li>\
          <li> View Everyone Rushing Your Fraternity In One Place </li>\
          <li> Vote on Recruits - Decide the Future of Your Fraternity </li>\
          <li> No More Data Entry - Let Facebook Do All the Work </li>\
        </ul> \
        <ul class="recruitFeatures features"> \
          <li class="featuresTitle"> Recruits: </li>\
          <li> Automatically Submit Your Info to the Fraternity via FB </li>\
        </ul> \
        <div class="getStartedButton"> <a href="/auth/facebook" class="classname">Get Started</a> </div>\
       </div> \
      ');
  }
});