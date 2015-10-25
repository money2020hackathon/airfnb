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


});

var responseHandler = function(status, response){
  console.log(response);
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

Template.paymentPage.events({
  'click #addCCButton':function(e){
    $('#newCardModal').openModal();

  },
  'click #confirmCC':function(e){
    //submit to get token and store credit card
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
