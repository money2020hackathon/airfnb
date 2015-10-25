Template.qrCodeShow.onRendered(function () {

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
