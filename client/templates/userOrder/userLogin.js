Template.userLogin.onRendered(function(){
	$(document).ready(function(){
		     $(".menu").hide();
		});

		function toToggle(info) {
			$(info).toggle();
		}
  $(".button-collapse").sideNav();
});

Template.userLogin.events({
  'click #createOrderPage':function(){
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  },
  'click #paymentPage':function(){
  	Router.go('paymentPage'); //name of template i want to go to
  	console.log("clicked");
  }

});
