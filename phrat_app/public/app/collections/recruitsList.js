var RecruitsList = Backbone.Collection.extend({
  model: RecruitModel,
  url: '/recruits',
  // sort: {'upVote': 'desc'},
  comparator: function (model) {
    return model.get('upVote') * -1;
  }
});