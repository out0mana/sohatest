//exposed routes group (this requires no login)
exposed = FlowRouter.group({});

//Add/remove coupon objects from db
exposed.route('/orderlog', {
    name: 'orderlog',
    action: function(params) {
      BlazeLayout.render("navbar-Main", {main: 'orderlog'});
    }
});

//Shopping page (add items to cart)
exposed.route('/shop', {
    name: 'shop',
    action: function(params) {
      BlazeLayout.render("navbar-Main", {main: 'shop'});
    }
});

//by default go to shop.
exposed.route('/', {
    name: 'home',
    action: function(params) {
      FlowRouter.go('shop');
    }
});

//checkout
exposed.route('/checkout', {
    name: 'checkout',
    action: function(params) {
      BlazeLayout.render('checkout');
    }
});


//in case the user mistypes the address.
exposed.route('/404', {
    name: '404',
    action: function(params) {
      BlazeLayout.render("404");
    }
});
FlowRouter.notFound = {
  action: function(params) {
    BlazeLayout.render("404");
  }
}
