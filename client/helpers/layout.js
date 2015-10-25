Template.layout.onRendered(function(){
  $(".button-collapse").sideNav({
    closeOnClick: true
  }
  );

});

Template.layout.helpers({
  isLoggedIn:function(){
    if(Meteor.user()){
      return true;
    }else{
      return false;
    }
  }
});

Template.layout.events({
  'click #orders':function(){
    $('.button-collapse').sideNav('hide');
    Router.go('ordersPage');
  },
  'click #createOrderPage':function(){
    $('.button-collapse').sideNav('hide');
  	Router.go('createOrderPage'); //name of template i want to go to
  	console.log("clicked");
  },
  'click #paymentPage':function(){
    $('.button-collapse').sideNav('hide');
  	Router.go('paymentPage', {'_id':"testId"}); //name of template i want to go to
  	console.log("clicked");
  },
  'click #profilePage':function(){
    $('.button-collapse').sideNav('hide');
  	Router.go('profilePage'); //name of template i want to go to
  	console.log("clicked");
  },
   'click #userCook':function(){
     $('.button-collapse').sideNav('hide');
    Router.go('userCook'); //name of template i want to go to
    console.log("clicked");
  },
   'click #userLogin':function(){
     $('.button-collapse').sideNav('hide');
    Router.go('userLogin'); //name of template i want to go to
    console.log("clicked");
  }

});
