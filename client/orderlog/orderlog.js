import { Template } from 'meteor/templating';
import { Orders } from '/lib/collections.js';
import { Session } from 'meteor/session';

Template.orderlog.onRendered( () => {
  Tracker.autorun( () => {
    orders = Orders.find({uid:Session.get('user_id')}).fetch();
    console.log(orders);
    $('tbody').html('');
    orders.forEach((order) => {
      $('tbody').append('<tr><td>'+ order.items +'</td><td>'+ order.date +'</td><td> $'+ order.total +'</td></tr>');
    });
    Meteor.subscribe('orders');
  });
});
