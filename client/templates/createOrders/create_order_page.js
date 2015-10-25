Template.createOrderPage.onCreated(function(){
  var self = this;

  self.autorun(function(){
        //var limit = itemLimit.get();
        //pastQuestionSubs.subscribe('AnsweredQuestions', itemLimit.get());
  });
})

Template.createOrderPage.onRendered(function(){
  //new WOW().init();


});


Template.createOrderPage.helpers({
  subscriptionIsReady:function(){
    return true;
  }
});

Template.createOrderPage.events({
  'click #createOrder':function(){

    /*
    'name':orderData.name,
    'ownerId':orderData.ownerId,
    'price':orderData.price,
    'images':orderData.images,
    'limit':orderData.limit,
    'expiryTime':orderData.expiryDate,
    'creationTime':(new Date()).valueOf(),
    'location':orderData.location,
    'collected':0*/
  }
});

Template.createOrderPage.onRendered(function(){
  $('select').material_select();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
});
