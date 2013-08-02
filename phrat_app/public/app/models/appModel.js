var App = Backbone.Model.extend({
  initialize: function(){
    this.set('recruitsList', new RecruitsList(fakeRecruits));
  }
});