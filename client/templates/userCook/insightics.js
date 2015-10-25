Template.insightics.events({
  'click #createOrderPage':function(){
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  },
  'click #profilePage':function(){
  	Router.go('profilePage'); //name of template i want to go to
  	console.log("clicked");
  },
   'click #qrCodeScan':function(){
  	Router.go('qrCodeScan'); //name of template i want to go to
  	console.log("clicked");
  },
   'click #userLogin':function(){
  	Router.go('userLogin'); //name of template i want to go to
  	console.log("clicked");
  },
  'click #paymentPage':function(){
    Router.go('paymentPage', {'_id':"testId"}); //name of template i want to go to
    console.log("clicked");
  },
   'click #userCook':function(){
    Router.go('userCook'); //name of template i want to go to
    console.log("clicked");
  },
   'click #insightics':function(){
    Router.go('insightics'); //name of template i want to go to
    console.log("clicked");
  }

});