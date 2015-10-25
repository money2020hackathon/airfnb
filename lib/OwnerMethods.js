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
        'deliveryEnd':orderData.deliveryEnd,
        'creationTime':(new Date()).valueOf(),
        'location':orderData.location,
        'collected':0,
        'orderedUsers':[]
      }
    );

    try{
      OrderCollection._ensureIndex({'location':"2dsphere"});
    }
    catch(err){

    }
  },
  updateOrderCollected:function(transactionId){
    TransactionRecordsCollection.update({
      '_id':transactionId
    },{
      $set:{
        completed:true
      }
    });

    return;
  },
  registerUserAsOwner:function(ownerData){
    //set user to owner that is allowed to add order listing
    if(Meteor.user()){
        Meteor.users.update(
          {
            _id:Meteor.userId()
          },
          {
            'profile.isOwner':true,
            'profile.location':ownerData.location,
            'profile.rating':0,
            'profile.reviews':[]
          },
          {
            upsert:true
          }
        );
    }
  },
  resetDemoDatabase:function(){
    TransactionRecordsCollection.update({},
    {
      $set:{
        completed:false
      }
    },
    {multi:true})
  }
})
