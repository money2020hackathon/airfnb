$.ajaxSetup({ cache: true });
$.getScript('payeezy_v3.2.js', function(){

  //Payeezy.setApiKey('VXYp1bKBHDh8S218XkSiVrkoEQhJhv29');
  //Payeezy.setJs_Security_Key('js-f2c7076b806be59b8f19e51f452079ecf2c7076b806be59b');
  //Payeezy.setTa_token('NOIW');
  //Payeezy.createToken(responseHandler);
});


Template.paymentPage.onCreated(function(){

});


Template.paymentPage.onRendered(function(){
  $('#cardNumberText').validateCreditCard(function(result){
    console.log(result);

    if(result.card_type){
      if(result.card_type.name == "visa"){
        //change credit card image according to card type
      }
    }

    if(result.valid){
      //show tick
    }

  });

  //$('select').material_select();
});

var responseHandler = function(status, response){
  console.log(response);

  response.token.ccNumber = lastCCNumber;
  response.token.ccNumberDigits = lastCCNumberDigits;
  lastCCNumber = "";
  lastCCNumberDigits = 0;
  //response.token
  Meteor.call('addPaymentToken', response.token, function(error, result){
          if(error)
          {
            sAlert.error(error, {effect: 'genie', position:'top', offset: '30px'});
          }
          else
          {
            //update result
          }

      return;
  });
}

var tokensShowing = [];

Template.paymentPage.helpers({
  alreadyOrdered:function(){
    var transactionId = TransactionRecordsCollection.findOne({
      'buyer':Meteor.userId(),
      'orderId':'testOrderId'
    });

    if(transactionId){
      return true;
    }else{
      return false;
    }
  },
  foodImage:function(){
    //find food image from data
    this.data;
  },
  creditCards:function(){


     //get stored credit cards from server
     var storedTokens = Meteor.user().profile.paymentToken;

     var returnElement = "";
     tokensShowing = [];
     if(storedTokens.length <= 0){
       returnElement += '<option value="" disabled selected>No Stored Credit Card</option>'
     }else{
       for(var j = 0; j < storedTokens.length; j++){
         if(storedTokens[j].ccNumberDigits){
           var ccNumberString = "";

           for(var i = 0; i < storedTokens[j].ccNumberDigits - 4; i++){
             ccNumberString += "*";
           }

           tokensShowing.push(storedTokens[j]);
           ccNumberString += storedTokens[j].ccNumber;

           returnElement += '<option value='+j+'>'+ ccNumberString +'</option>'
         }
      }
     }

     setTimeout(function(){
       $('#creditCardSelect').material_select("destroy");
       $('#creditCardSelect').material_select();
     }, 1000);

     return returnElement;
  }
});

var lastCCNumber = "";
var lastCCNumberDigits = 0;

Template.paymentPage.events({
  'click #payButton':function(){

    //get selected token
    var selected = $('#creditCardSelect').val();
    var selectedToken = tokensShowing[selected];
    console.log(selectedToken);

    //start payeezy transaction
    Meteor.call('payForOrder', 'aNyrjWxtejR9p3HXh', selectedToken, "688", function(error, result){
            if(error)
            {
              sAlert.error(error, {effect: 'genie', position:'top', offset: '30px'});
            }
            else
            {
              //update result
              var transactionId = TransactionRecordsCollection.insert({
                'buyer':Meteor.userId(),
                'orderId':"aNyrjWxtejR9p3HXh",
                'completed':false
              });

              Router.go('qrCodeShow', {'_id':transactionId});
            }

        return;
    });
    //add transaction to server
    //generate qr code number and go to qrcode page for this order
  },
  'click #addCCButton':function(e){
    $('#newCardModal').openModal();

  },
  'click #confirmCC':function(e){
    //submit to get token and store credit card
      lastCCNumber = "8291";
      lastCCNumberDigits = ("4788250000028291").length;

      Payeezy.setApiKey('VXYp1bKBHDh8S218XkSiVrkoEQhJhv29');
      Payeezy.setJs_Security_Key('js-f2c7076b806be59b8f19e51f452079ecf2c7076b806be59b');
      Payeezy.setTa_token('NOIW');
      Payeezy.setCardType('visa');
      Payeezy.setCardHolderName('xyz');
      Payeezy.setCardNumber('4788250000028291');
      Payeezy.setCardExpYear(15);
      Payeezy.setCardCVV('123');
      Payeezy.setCardExpMonth(12);
      Payeezy.setAuth('false');
      Payeezy.createToken(responseHandler);
  }
});
