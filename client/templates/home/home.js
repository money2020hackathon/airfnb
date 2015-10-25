Template.home.events({
  'click #createOrderPage':function(){
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  },

  'click #listingPage':function(){
  	Router.go('listingPage'); //name of template i want to go to
  	console.log("clicked");
  }
});
