Meteor.methods({
  getEatListing:function(userLocation, distanceLimit){
    //get a list of current available order listing
    var orderCollections = OrderCollection.find(
      {
        'location': { $near: {$geometry:userLocation, $maxDistance: distanceLimit * 1609}},
        'expiryTime': {$lt: new Date().valueOf()}
      },
      {
        sort:{'ownerRating':-1},
        limit:20
      }
    ).fetch();

    return orderCollections;
  },
  registerOrder:function(orderId){
    //user bought and pays for order
    //TODO check on update, assuming no threading issues here and will not exceed max before order finish
    //orderCollections
    var order = OrderCollection.findOne({
      '_id':orderId
    });

    //sold out, return error
    if(order.currentOrders >= order.limit){
        return;
    }

    //expired
    if((new Date).valueOf() > order.expiryTime){
      return;
    }

    //user not logged in, route to login page
    if(!Meteor.user()){
      return;
    }

    //increment number of orders
    //insert current userId to the array
    OrderCollection.update({
        '_id':orderId
      },
      {
        $inc:{
          collected:1
        },
        $push:{
          'orderedUsers':Meteor.userId(),
        }
      },
      {
        upsert:true
      }
    );
  },
  cancelOrder:function(orderId){
    //user cancels order
    OrderCollection.update({
        '_id':orderId
      },
      {
        $inc:{
          collected:-1
        },
        $pull:{
          'orderedUsers':Meteor.userId(),
        }
      },
      {
        upsert:true
      }
    );

  },
  addRatingAndReviewForOrder:function(orderId, ratingStars, reviewText){
    //adds reviews and ratings for an order,
    //automatically links to owner
  },
  addPaymentToken:function(token)
  {
    Meteor.users.update({
      _id:Meteor.userId()
    },
    {
      $push:{
        'profile.paymentToken':token,
      }
    },
    {
        upsert:true
    });
  }
})
