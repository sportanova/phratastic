var RecruitsList = Backbone.Collection.extend({
  model: RecruitModel,
  url: '/recruits'
});