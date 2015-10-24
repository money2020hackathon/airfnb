Meteor.publishComposite('RatingCollection', {

  find:function(){
    return null;
  },
  children: [
    {
      find: function(userId){
        return null;
      }
    },
    {
      find: function(userId){
        return null;
      }
    },
    {
      find:function(userId){
        return null;
      }
    }
  ]

});

Meteor.publish('OrderCollection', function(){
  return null;
});
