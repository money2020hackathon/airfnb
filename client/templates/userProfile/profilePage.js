Template.profilePage.onRendered(function(){
	$(".button-collapse").sideNav();
  	$(".dropdown-button").dropdown();
});

Template.userLogin.events({
  'click #createOrderPage':function(){
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  }

});
