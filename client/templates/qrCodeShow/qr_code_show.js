Template.qrCodeShow.onRendered(function () {
$(".button-collapse").sideNav();
  $(".dropdown-button").dropdown();

  var transactionId = String(this);
  var transaction = TransactionRecordsCollection.find({
    '_id':transactionId
  });

  if(transaction.completed){
  }
  else{
      $('#qrcode').qrcode({
        size: 400,
        text: this.data
      });
  }
});

Template.qrCodeShow.helpers({
  isCollected:function(){
    var transactionId = String(this);
    var transaction = TransactionRecordsCollection.find({
      '_id':transactionId
    });

    if(transaction.completed){
      return true;
    }else{
      return false;
    }
  }
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
  },
   'click #userLogin':function(){
    Router.go('userLogin'); //name of template i want to go to
    console.log("clicked");
  }

});
