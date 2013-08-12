var RecruitsList = Backbone.Collection.extend({
  model: RecruitModel,
  url: '/recruits',
  comparator: function (model) {
    return model.get('upVote') * -1;
  }
});