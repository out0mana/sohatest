import { check } from 'meteor/check'
import { Items } from '/lib/collections.js';

Meteor.methods({
  addItem( item ) {
    check( item, {
      name: String,
      image: String,
      cost: String
    });

    try {
      return Items.insert( item );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
