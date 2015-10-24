Meteor.methods({
  addOrderListing:function(orderData){
    if(!Meteor.user()){
      return;
    }

    //adds order listing, with location data, food image,
    //order limit, time limit, owner info, owner review etc
    OrderCollection.insert(
      {
        'name':orderData.name,
        'ownerId':Meteor.userId(),
        'price':orderData.price,
        'images':orderData.images,
        'limit':orderData.limit,
        'expiryTime':orderData.expiryTime,
        'deliveryTime':orderData.deliveryTime,
        'deliveryDuration':orderData.deliveryDuration,
        'creationTime':(new Date()).valueOf(),
        'location':orderData.location,
        'collected':0,
        'orderedUsers':[]
      }
    );
  },
  registerUserAsOwner:function(ownerData){
    //set user to owner that is allowed to add order listing
    if(Meteor.user()){
        Meteor.users.update(
          {
            'isOwner':true,
            'location':ownerData.location,
            'rating':0,
            'reviews':[]
          }
        );
    }
  }

})
