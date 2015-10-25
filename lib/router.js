Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});


var checkLogin = function(){
	if(!Meteor.user())
	{
		Router.go('login');
	}

	this.next();
};


Router.route('/jjj', {
	 name: 'home'
	}
);

Router.route('/login', {
	 name: 'login'
	}
);

Router.route('/showQrCode/:_id',{
	name: 'qrCodeShow',
	data: function(){
		return this.params._id;
	}
});

Router.route('/pay/:_id', {
	 name: 'paymentPage',
   data: function(){
     return this.params._id;
   }
});

Router.route('/', {
  name: 'qrCodeScan'
});

Router.route('/createOrderPage', {
	 name: 'createOrderPage'
	}
);



Router.route('/listingPage', {
	 name: 'listingPage'
	}
);
