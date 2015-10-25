/*
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
'orderedUsers':[]*/
var reactiveLocation = new ReactiveVar("");

Template.listingItem.onCreated(function(){
  reverseGeocode.getLocation(this.data.location.lat, this.data.location.lng, function(location){
      //find location for principality
      for(var i = 0; i < location.results.length; i++)
      {
        if(location.results[i].types[0] == 'locality')
        {
          console.log(location.results[i].formatted_address);
          reactiveLocation.set(location.results[i].formatted_address);
            //return location.results[i].formatted_address;
        }
      }
  });
});

Template.listingItem.helpers({
  imgurl:function(){
    return this.images;
  },
  location:function(){
    return reactiveLocation.get();
  },
  name:function(){
    return this.name;
  },
  price:function(){
    return "$" + this.price;
  },
  endTime:function(){
    return new Date(this.expiryTime);
  },
  endDate:function(){
    return "Order before " + new Date(this.expiryTime);
  }
});

Template.listingItem.events({
  'click #paymentPage':function(){
    Router.go('paymentPage', {'_id':this._id});
  }
});
