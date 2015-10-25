Template.qrCodeFinished.onRendered(function () {

});

Template.qrCodeFinished.helpers({
  remainingTransactions:function(){
    var transactionId = this+"";

    var transaction = TransactionRecordsCollection.findOne({'_id':transactionId});

    if(!transaction){
      return;
    }

    var orderId = transaction.orderId;

    var remainingTransactions = TransactionRecordsCollection.find({
      'orderId':orderId
    }).fetch().length;

    return remainingTransactions;
  }
});

Template.qrCodeFinished.events({
  'click #scanAnother':function(){
    Router.go('qrCodeScan');
  },
  'click #goBack':function(){
    Router.go('userLogin');
  }
});
