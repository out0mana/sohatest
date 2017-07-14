import { Meteor } from 'meteor/meteor';
import { Items } from '/lib/collections.js';
import { Cart } from '/lib/collections.js';
import { Orders } from '/lib/collections.js';
Meteor.publish( 'items', function() { return Items.find(); } );
Meteor.publish( 'orders', function(user_id) {
    return Orders.find();
 });
Meteor.publish( 'cart', function(user_id) {
    return Cart.find();
 });
