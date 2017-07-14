import { Template } from 'meteor/templating';
import { Items } from '/lib/collections.js';
import { Cart } from '/lib/collections.js';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';

Template.shop.onCreated(function() {
  if(!Session.get('user_id'))
    Session.setPersistent('user_id', Random.id());
    console.log(Session.get('user_id'));

    this.autorun( () => {
      cart = Cart.find({uid:Session.get('user_id')}).fetch();
      console.log(Cart.find({uid:Session.get('user_id')}).fetch());
      this.subscribe('cart');
    });
});

Template.shop.onRendered( () => {
  Tracker.autorun( () => {
    items = Items.find().fetch();
    //console.log("fetching items")
    //console.log(Items.find().fetch());
    //clear the container
    $('#item-container').html('');
    //append for each item
    items.forEach((item) => {
      //console.log(item);
      $('#item-container').append('<div class="col-md-3 col-sm-6"><div class="thumbnail"><img src="' + item.image + '" alt=""><div class="caption"><h3>' + item.name + '</h3><p>$ ' + item.cost + '</p><p><a href="#" class="btn btn-primary" id="'+ item._id + '">Add to Cart</a></p></div></div></div>');
      $('#'+item._id).on("click", {
        uid: Session.get('user_id'),
        item_id: item._id
      }, addCartItem);
    });
    //add add item box
    $('#item-container').append(`
      <div class="col-md-3 col-sm-6">
        <form id="add-item-form">
        <div class="thumbnail">
          <br>
          <br>
          <h3>Create New Item</h3>
          <br>
          <br>
          <p><input class="form-control" type="text" placeholder="Enter image url" id="image-input"></p>
          <p><input class="form-control" type="text" placeholder="Enter item name" id="name-input"></p>
          <p><div class="input-group">
            <span class="input-group-addon">$</span>
            <input type="number" step=".01" class="form-control" placeholder="Enter cost" id="cost-input" min="0">
          </div></p>
          <p>
              <button type="submit" class="btn btn-success">Add Item</button>
          </p>
        </div>
      </form>
      </div>
    `);
    Meteor.subscribe('items');
  });
});

Template.shop.events({
  'submit form' ( event, template) {
    event.preventDefault();
    newItem = {
      name: template.find('#name-input').value,
      image: template.find('#image-input').value,
      cost: template.find('#cost-input').value
    };
    Meteor.call( 'addItem', newItem, (error) => {
      if(error){
        //console.log(error);
      }
      else {
        //console.log("Item added.")
      }
    });
  }
});

function addCartItem(event){
  item = {
    uid: event.data.uid,
    item_id: event.data.item_id
  };
  Meteor.call( 'addCartItem', item, (error) => {
    if(error){
      console.log(error);
    }
    else {
      console.log("Item added to Cart.")
    }
  });
}
