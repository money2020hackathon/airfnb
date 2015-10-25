var descriptionCharCount = new ReactiveVar("");

Template.qrCodeScan.onRendered(function () {
  if(Meteor.isCordova){
    scanBarcode();
  }
});


function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            //Meteor.call('newQR', result.text);
            console.log("BAR CODE " + result.text);
            descriptionCharCount.set(result.text);
            if( !result.cancelled ) {
              Meteor.call('updateOrderCollected', result.text, function(error, result){
                if(error)
                {
                  //sAlert.error(error, {effect: 'genie', position:'top', offset: '30px'});
                }
                else
                {

                  //update result
                  Router.go('qrCodeFinished', {'_id':result.text});
                }

              });
            }
        },
        function(error) {
            alert("Scanning failed: " + error);
        }
    );
}

Template.qrCodeScan.helpers({
  subscriptionIsReady:function(){
    return true;
  },
  qrCode:function(){
    if(descriptionCharCount.get().length > 0){
      Router.go('qrCodeFinished', {'_id':descriptionCharCount.get()});
    }

    return descriptionCharCount.get();
  }
});

Template.qrCodeScan.events({

});
