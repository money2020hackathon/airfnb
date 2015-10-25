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

Router.route('/orders',{
	name:'ordersPage'
});

Router.route('/showQrCode/:_id',{
	name: 'qrCodeShow',
	data: function(){
		return this.params._id;
	}
});

Router.route('/qrScanFinish/:_id',{
	name: 'qrCodeFinished',
	data: function(){
		return this.params._id;
	}
});

Router.route('/collectFinish',{
	name:'qrCollectFinish'
});

Router.route('/pay/:_id', {
	 name: 'paymentPage',
   data: function(){
     return this.params._id;
   }
});

Router.route('/qrScan', {
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

Router.route('/', {
	 name: 'userLogin'
	}
);

Router.route('/profilePage', {
	 name: 'profilePage'
	}
);

Router.route('/userCook', {
	 name: 'userCook'
	}
);

Router.route('/insightics', {
	 name: 'insightics'
	}
);
