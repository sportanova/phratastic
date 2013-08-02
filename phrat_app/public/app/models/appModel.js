var App = Backbone.Model.extend({
  initialize: function(){
    var expressInfo = new RecruitsList();
    console.log(expressInfo.fetch());
    this.set('recruitsList', new RecruitsList(fakeRecruits));
  }
});