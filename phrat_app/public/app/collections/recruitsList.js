var RecruitsList = Backbone.Collection.extend({
  model: RecruitModel,
  url: 'http://127.0.0.1:3000/recruits'
});