import SimpleSchema from 'simpl-schema';
export const Cart = new Mongo.Collection('cart');
export const Items = new Mongo.Collection('items');
export const Orders = new Mongo.Collection('orders');

Cart.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Cart.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Items.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Items.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


/* Users object
_id: auto-generated,
sessionId: String
items: {{item._id, amt),{item1._id, 1}}
*/

/* Item object
_id: auto-generated
name: String,
description: String,
Image: String,
Cost: Number
*/

/* Coupon object
_id: auto-generated,
code: String,
type: String (ie. percent, flat)
value: Number
*/

/* Order object
_id: auto,
items list: string,
checkout date: string,
total cost: number
*/
