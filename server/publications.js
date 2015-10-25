Slingshot.createDirective("imageupload", Slingshot.S3Storage,{
  region: "us-east-1",
  bucket: "feathero.appquests.com",
  acl : "public-read",
  authorize: function(){
    //if(!this.userId){
    //  throw new Meteor.Error("Login Required", "Please Login");
    //}
    return true;
  },
  key: function(file){
    var user = Meteor.users.findOne(this.userId);
    return "image/" + user._id + "/food" + (new Date()).valueOf() + ".jpeg";
  },
  "AWSAccessKeyId":"AKIAI4PNFDNOYXI52UZA",
  "AWSSecretAccessKey":"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",
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024
});

Meteor.publishComposite('RatingCollection', {

  find:function(){
    return null;
  },
  children: [
    {
      find: function(userId){
        return null;
      }
    },
    {
      find: function(userId){
        return null;
      }
    },
    {
      find:function(userId){
        return null;
      }
    }
  ]

});

Meteor.publish('OrderCollection', function(){
  return null;
});
