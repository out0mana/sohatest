import { Template } from 'meteor/templating';
import { Cart } from '/lib/collections.js';
import { Items } from '/lib/collections.js';
import { Session } from 'meteor/session';

Template.shop.onRendered( () => {

  Tracker.autorun( () => {
    $('#coupon-button').off();
    $('#checkout-button').off();
    var totalcost = 0;
    cart = Cart.find({uid:Session.get('user_id')}).fetch();
    $('.panel-body').html('');
    //append for each item
    cart.forEach((item) => {
      item_info = Items.findOne({_id:item.item_id});
      totalcost += Number(item_info.cost);
      $('.panel-body').append('<div class=row><div class=col-xs-2><img class=img-responsive src='+ item_info.image +'></div><div class=col-xs-4><h4 class=product-name><strong>' + item_info.name + '</strong></h4><h4><small>Product description</small></h4></div><div class=col-xs-6><div class="col-xs-10 text-right"><h6><strong>$'+ item_info.cost +'</strong></h6></div><div class=col-xs-2><button class="btn btn-link btn-xs" id="'+ item._id + '" type=button><span class="glyphicon glyphicon-trash"></span></button></div></div></div><hr>');
      $('#'+item._id).on("click", {
              id: item._id
            }, removeCartItem);
    });
    $('#checkout-total').html('');
    $('#coupon-button').on("click", {
      total: Number(totalcost)
    }, checkCoupon);
    $('#checkout-button').on("click", {
      total: Number(totalcost),
      items: getItems()
    }, checkOut);
    totalcost = parseFloat(Math.round(totalcost * 100) / 100).toFixed(2);
    $('#checkout-total').append('<h4 class="text-right">Total <strong>$'+ totalcost +'</strong></h4>');
    Meteor.subscribe('cart');
    Meteor.subscribe('items');
  });
});


function removeCartItem(event){
  Meteor.call( 'removeCartItem', event.data.id, (error) => {
    if(error){
      console.log(error);
    }
    else {
      console.log("Item removed from Cart.")
    }
  });
}

function checkCoupon(event){
  item = {
    code:getCouponVal(),
    totalcost:event.data.total
  };
  Meteor.call( 'checkCoupon', item, (error, result) => {
    if(error){
      console.log(error);
    }
    else {
      if(result !== "error"){
        $('#checkout-total').html('');
        $('#checkout-total').append('<h4 class="text-right text-success"><strong> You saved: $'+ result.drop +'</strong></h4>');
        newtotal = result.oldcost - result.drop;
        newtotal = parseFloat(Math.round(newtotal * 100) / 100).toFixed(2);
        $('#checkout-total').append('<h4 class="text-right">Total <strong>$'+ newtotal +'</strong></h4>');
        $('#coupon-input').css({ "border": '#00FF00 1px solid'});
      }
      else{
        console.log("Invalid Coupon Code")
        $('#coupon-input').val("Invalid Coupon Code");
        $('#coupon-input').css({ "border": '#FF0000 1px solid'});
      }
    }
  });
}

function checkOut(event){
  item = {
    total: event.data.total,
    uid: Session.get('user_id'),
    items: getItems()
  };
  Meteor.call('checkOut', item, (error) => {
    if(error){
      console.log(error);
    }
    else {
      console.log("Order Placed");
    }
  });
}

function getCouponVal(){
  return $('#coupon-input').val();
}

function getItems(){
  returnstr = "";
  cart = Cart.find({uid:Session.get('user_id')}).fetch();
  cart.forEach((item) => {
    item_info = Items.findOne({_id:item.item_id});
    returnstr += item_info.name + ",";
  });
  returnstr = returnstr.replace(/,\s*$/, "");
  return returnstr;
}
