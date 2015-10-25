Template.layout.helpers({
  isLoggedIn:function(){
    if(Meteor.user()){
      return true;
    }else{
      return false;
    }
  }
})
