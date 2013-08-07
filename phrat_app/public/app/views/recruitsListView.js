var RecruitsListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new RecruitsList();
    this.populateRecruitsModel();
    this.collection.on("reset", this.render, this);
    console.log(this);
  },

  populateRecruitsModel: function() {
    this.collection.fetch({
      reset: true,
      success: function(collection, response) {
      },
      error: function() {
        console.log('error');
      }
    });
  },

  saveToDB: function(e, vote) {
    var that = this;
    var recruitID = e.target.className.split(' ')[1];
    _.each(this.collection.models, function(value) {
      if(value.attributes.id === recruitID) {
        value.save({ vote: vote },
          {
            success: function() {
              that.populateRecruitsModel();
            },
            error: function() {
              console.log('error');
            }
          }
        );
      }
    });
  },

  events: {
    'click .upVote': function(e) {
      this.saveToDB(e, 'addUpVote');
    },
    'click .downVote': function(e) {
      this.saveToDB(e, 'addDownVote');
    }
  },
  
  className: 'recruits',

  tagName: 'table',

  render: function(){
    return this.$el.html('<tr> \
        <th></th> \
        <th>Name</th> \
        <th>Age</th> \
        <th>Location</th> \
        <th>Bio</th> \
      </tr>').append(
      this.collection.map(function(recruit) {
        return new RecruitView({model: recruit}).render();
      })
    );
  }
});