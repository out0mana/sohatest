import { check } from 'meteor/check'
import { Items } from '/lib/collections.js';

Meteor.methods({
  checkCoupon( coupon_obj ) {
    check( coupon_obj, {
      code: String,
      totalcost: Number
    });
    if(coupon_obj.code === "PERCENT20") {
      returnitem = {oldcost: coupon_obj.totalcost, drop: (coupon_obj.totalcost * .2)};
      console.log(returnitem);
      return returnitem;
    } else {
        if (coupon_obj.code === "FLAT15") {
        returnitem = {oldcost: coupon_obj.totalcost,drop: 15};
        console.log(returnitem);
        return returnitem;
      }
      else {
        returnitem = "error";
        return returnitem;
      }
    }
}
});
