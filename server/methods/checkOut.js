import { check } from 'meteor/check'
import { Cart } from '/lib/collections.js';
import { Orders } from '/lib/collections.js';

Meteor.methods({
  checkOut( obj ) {
    check( obj, {
      total: Number,
      uid: String,
      items: String
    });
    obj.date = new Date();
    try {
      Cart.remove({uid:obj.uid});
      console.log(obj);
      Orders.insert(obj);
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
