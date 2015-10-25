Template.userLogin.onRendered(function(){
	$(document).ready(function(){
		     $(".menu").hide();
		});

		function toToggle(info) {
			$(info).toggle();
		}
  //$(".button-collapse").sideNav();
  //$(".dropdown-button").dropdown();
});

Template.userLogin.events({
  'click #createOrderPage':function(){
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  },
  'click #paymentPage':function(){
  	Router.go('paymentPage', {'_id':"testId"}); //name of template i want to go to
  	console.log("clicked");
  },
  'click #profilePage':function(){
  	Router.go('profilePage'); //name of template i want to go to
  	console.log("clicked");
  },
   'click #userCook':function(){
    Router.go('userCook'); //name of template i want to go to
    console.log("clicked");
  }

});

Template.userLogin.helpers({
	listedItems:function(){
		return OrderCollection.find({});
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
    );
	}
})
