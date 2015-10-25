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

Router.route('/pay', {
	 name: 'paymentPage'
	}
);

Router.route('/', {
	 name: 'home'
	}
);

Router.route('/login', {
	 name: 'login'
	}
);


Router.route('/createOrderPage', {
	 name: 'createOrderPage'
	}
);

Router.route('/listingPage', {
	 name: 'listingPage'
	}
);

Router.route('/userLogin', {
	 name: 'userLogin'
	}
);
