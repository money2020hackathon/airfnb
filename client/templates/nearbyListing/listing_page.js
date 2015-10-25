var distanceFilter = 5;
var updatingLocation = false;

var currentLocation = Geolocation.latLng();
var updated = new ReactiveVar(0);

updateLocation();
function updateLocation()
{
  currentLocation = Geolocation.latLng();
  updated.set(updated.get() + 1);

  if(currentLocation)
  {
    var radlat1 = Math.PI * currentLocation.lat/180;
    var radlat2 = Math.PI * lastPulledPosition.lat/180;
    var radlon1 = Math.PI * currentLocation.lng/180;
    var radlon2 = Math.PI * lastPulledPosition.lng/180;
    var theta = currentLocation.lng - lastPulledPosition.lng;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 0.8684;

    reverseGeocode.getLocation(currentLocation.lat, currentLocation.lng, function(location){

        //find location for principality
        for(var i = 0; i < location.results.length; i++)
        {
          if(location.results[i].types[0] == 'locality')
          {
              var mongoCoordLocation = {};
              mongoCoordLocation.type = "Point";
              mongoCoordLocation.coordinates = [currentLocation.lng, currentLocation.lat];

              //call update listing to update places around user according to distance limit


              break;
          }
        }
    });
  }else{
    //return error
  }
}




Template.listingPage.onCreated(function(){
  var self = this;

  self.autorun(function(){
        //var limit = itemLimit.get();
        //pastQuestionSubs.subscribe('AnsweredQuestions', itemLimit.get());
  });
})

Template.listingPage.onRendered(function(){
  new WOW().init();


});


Template.listingPage.helpers({
  listedItems:function(){

    //try{
    //  OrderCollection._ensureIndex({'location':"2dsphere"});
    //}
    //catch(err){

    //}
    //updated.set(updated.get() + 1);

    return OrderCollection.find({});
    /*
    return OrderCollection.find(
      {
        location:{
          $near:{
            $geometry:{
              type:"Point",
              coordinates:[currentLocation.lng, currentLocation.lat]
            },
            $maxDistance: 5 * 1609
          }
        }
      }
    );*/
  },
  subscriptionIsReady:function(){
    return true;
  }
});

Template.listingPage.events({
  'click #test':function(){

  },
  'click #findNearby':function(){
    if(!updatingLocation){
      updateLocation();
    }
  }
});
