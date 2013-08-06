var RecruitsListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new RecruitsList();
    this.collection.fetch({
      reset: true,
      success: function(collection, response) {
      },
      error: function() {
        console.log('error');
      }
    });
    this.collection.on("reset", this.render, this);
  },

  events: {
    'click .upVote': function(e) {
      var that = this;
      var recruitID = e.target.className.split(' ')[1];
      _.each(this.collection.models, function(value) {
        if(value.attributes.id === recruitID) {
          value.save({addUpVote: 'addUpVote'}, 
            {
              success: function() {
              }
            }
          );
        }
      });
    },
    'click .downVote': function(e) {
      var that = this;
      var recruitID = e.target.className.split(' ')[1];
      _.each(this.collection.models, function(value) {
        if(value.attributes.id === recruitID) {
          value.save({addDownVote: 'addDownVote'},
            {
              success: function() {
              }
            }
          );
        }
      });
    }
  },

  render: function(){
    return this.$el.html(
      this.collection.map(function(recruit) {
        return new RecruitView({model: recruit}).render();
      })
    )
  }
});