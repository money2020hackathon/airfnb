Template.home.events({
  'click #createOrderPage':function(){
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  },

  'click #userLogin':function(){
  	Router.go('userLogin'); //name of template i want to go to
  	console.log("clicked");
  }
});
