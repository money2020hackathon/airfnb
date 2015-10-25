Template.qrCodeShow.onRendered(function () {

  var transactionId = String(this);
  var transaction = TransactionRecordsCollection.find({
    '_id':transactionId
  });

  if(transaction.completed){
  }
  else{
      $('#qrcode').qrcode({
        size: 300,
        text: this.data
      });
  }
});

Template.qrCodeShow.helpers({
  isCollected:function(){
    var transactionId = this+"";

    var transaction = TransactionRecordsCollection.findOne({
      '_id':transactionId
    });

    if(transaction.completed){
      Router.go('qrCollectFinish');
      return true;
    }else{
      return false;
    }
  }
});
