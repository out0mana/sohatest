import { check } from 'meteor/check'
import { Cart } from '/lib/collections.js';

Meteor.methods({
  removeCartItem( id ) {
    check( id, String );

    try {
      return Cart.remove({_id:id});
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
