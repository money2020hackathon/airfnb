var imageurl = new ReactiveVar(0);
var uploadStarted = new ReactiveVar(0);
var imageChanged = new ReactiveVar(0);
var imageIsUploading = new ReactiveVar(0);
var editting = new ReactiveVar(0);
var edittingDescription = new ReactiveVar(0);
var descriptionCharCount = new ReactiveVar(0);
var uploader;

var foodImageUrl;

function urlToBlob(data)
{
  var byteString;
  if(data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(data.split(',')[1]);
  else
    byteString = unescape(data.split(',')[1]);

  var mimeString = data.split(',')[0].split(':')[1].split(';')[0];

  var ia = new Uint8Array(byteString.length);
  for(var i = 0; i < byteString.length; i++){
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ia], {type:mimeString});

  return blob;
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
};

function onPhotoSuccess(fileUri){

  //console.log(data);
  //var blob = urlToBlob(data);
  //console.log(blob);
  //Resizer.resize(blob, {width:200, height:200, cropSquare:true}, function(err, file)
  //{
    //console.log(file);
        var reader = new FileReader();
    reader.onloadend = function(e){
      var fileBlob = dataURItoBlob(e.target.result);
      if(fileBlob){
        //upload to S3
        uploader = new Slingshot.Upload("imageupload");
        imageIsUploading.set(1);

        Resizer.resize(fileBlob, {width:400, height:400, cropSquare:true}, function(err, file)
        {
          imageurl.set(file);

          //loading start here
          //IonLoading.show({
          //  customTemplate: '<h3>Loading…</h3><p>Please wait while we upload your image.</p>'
          //});

          uploader.send(file, function(error, downloadUrl)
          {
            if(error){
              console.error('Error uploading', uploader.xhr.response);

              //loading end here
              //IonLoading.hide();
            }
            else{
              //console.log(downloadUrl);
              //imageurl.set(downloadUrl);

              //update profile pic in database
              imageurl.set(downloadUrl);
            }
          });
        });
      }
    }

  var file;
  window.resolveLocalFileSystemURL(fileUri, function(fileEntry){
    fileEntry.file(function(cordovaFile){
      file = cordovaFile;
      reader.readAsDataURL(file);
      uploadStarted.set(1);
    });
  });
}

function onPhotoFail(message){
  sAlert.error(message, {effect: 'genie', position:'top', offset: '30px'});
}

function takePhotoFromCamera()
{
  navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    cameraDirection:1,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    correctOrientation: true
  });

}

function takePhotoFromLibrary()
{

  navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    correctOrientation: true
  });

}


function startCamera()
{
  MeteorCamera.getPicture({width:200, height:200, quality:40}, function(error, data)
  {
      //convert base64 uri to file blob for uploading
      var blob = urlToBlob(data);

      Resizer.resize(blob, {width:200, height:200, cropSquare:true}, function(err, file)
      {
        imageurl.set(data);
        //var processedBlob = urlToBlob(processedData);

        //upload to S3
        uploader = new Slingshot.Upload("imageupload");
        imageIsUploading.set(1);

        uploader.send(file, function(error, downloadUrl)
        {
          if(error){
            console.error('Error uploading', uploader.xhr.response);
          }
          else{
            console.log(downloadUrl);
            imageurl.set(downloadUrl);
          }
        });

        uploadStarted.set(1);
      });
  });
}


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
  },
  foodImage:function(){
    return imageurl.get();
  }
});

Template.createOrderPage.events({
  'change #fileInput':function(e, template){
    var files = e.currentTarget.files;

   Resizer.resize(files[0], {width: 300, height: 300, cropSquare: true}, function(err, file) {

     var uploader = new Slingshot.Upload("imageupload");

     uploader.send(file, function (err, downloadUrl) {
       if (err)
         console.log(err);

       console.log(downloadUrl);
       imageurl.set(downloadUrl);

     });

   });
  },
  'click #fileInput': function(e){

    //$(this).trigger('fileselect', [1, label, 0]);
    var path_input = $(this).find('input.file-path');

    //console.log("path input");
    //console.log(path_input);

      $(this).find('input[type="file"]').change(function () {
        path_input.val($(this)[0].files[0].name);
        path_input.trigger('change');
      });
  },
  'click #imageUploadButton':function(){
    //console.log($('#messageText').val());
    //addingImage.set(false);
    //if(Meteor.isCordova){
      $('#imageActionModal').openModal();
    //}else{
    //  $("#fileInput").click();
    //}
  },
  'click #addImageFromCamera':function(){
    if(Meteor.isCordova){
      takePhotoFromCamera();
    }else{
      startCamera();
    }
  },
  'click #addImageFromFile':function(){
    if(Meteor.isCordova){
      takePhotoFromLibrary();
    }else{
    //take new photo
      $("#fileInput").click();
      //$("#fileInput")[0].click();
    }
  },
  'click #createOrder':function(){
    var currentLocation = Geolocation.latLng();

    var name = $('#icon_prefix').val();
    var price = $('#icon_price').val();
    var limit = $('#icon_dining').val();
    var orderEnd = $('#orderEndHour').val();
    var collectStart = $('#collectStartHour').val();
    var collectEnd = $('#collectEndHour').val();
    var dateStart = $('#dateStart').val();
    var image = imageurl.get();

    var convertedDate = new Date(dateStart).valueOf();
    orderEnd = convertedDate + (orderEnd * 3600000);
    collectStart = convertedDate + (collectStart * 3600000);
    collectEnd = convertedDate + (collectEnd * 3600000);

    var payload = {
      'name': name,
      'price': price,
      'images': image,
      'limit': limit,
      'expiryTime': orderEnd,
      'deliveryTime': collectStart,
      'deliveryEnd': collectEnd,
      'location': currentLocation
    };

    Meteor.call('addOrderListing', payload, function(error, result){
            if(error)
            {
              sAlert.error(error, {effect: 'genie', position:'top', offset: '30px'});
            }
            else
            {
              //update result
              Router.go('userLogin');
            }

        return;
    });

/*
    OrderCollection.insert(
      {
        'name':orderData.name,
        'ownerId':Meteor.userId(),
        'price':orderData.price,
        'images':orderData.images,
        'limit':orderData.limit,
        'expiryTime':orderData.expiryTime,
        'deliveryTime':orderData.deliveryTime,
        'deliveryEnd':orderData.deliveryEnd,
        'creationTime':(new Date()).valueOf(),
        'location':orderData.location,
        'collected':0,
        'orderedUsers':[]
      }
    );*/
  }

});

var currentLocation = Geolocation.latLng();

Template.createOrderPage.onRendered(function(){
  $('select').material_select();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
});
