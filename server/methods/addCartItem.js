import { check } from 'meteor/check'
import { Cart } from '/lib/collections.js';

Meteor.methods({
  addCartItem( item) {
    check( item, {
      uid: String,
      item_id: String
    });

    try {
      return Cart.insert( item );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
