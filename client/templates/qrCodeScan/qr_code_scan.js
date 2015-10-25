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
                //scanBarcode();
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
    return descriptionCharCount.get();
  }
});

Template.qrCodeScan.events({

});
