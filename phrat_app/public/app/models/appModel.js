var App = Backbone.Model.extend({
  initialize: function(){
    // window.fetchInfo = new RecruitsList().fetch();
    // console.log(fetchInfo.responseText);
    this.set('recruitsList', new RecruitsList(fakeRecruits));
  }
});