function updateCartAdd(name, price, qty){
  //This is the structure that all cart items will use
  var cartItem = {
    item: name,
    price: price,
    qty: qty
  };

  //Create an array to store the items
  var cart = [cartItem];
  console.log(cart);
  //Check to see if the cart is empty
  if(sessionStorage.getItem("cart")==null){
    //If the cart is empty then create a cart for the session
    var jsonStr = JSON.stringify( cart );
    sessionStorage.setItem( "cart", jsonStr );
  }
  else{
    //If the cart already has items
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse( cartValue );
    //Check to see if the item already exists in the cartObj
    let check = checkItems(cartObj, cartItem.item);
    //If item is found then just increment the quantitiy of the item
    if(check.found){
      cartObj[check.index].qty += 1;
    }
    //If the item is not found then add the item to the end of the cart
    else{
      cartObj[cartObj.length] = cartItem;
    }
    //Make the updated object the current cart
    var jsonStr = JSON.stringify( cartObj );
    sessionStorage.setItem( "cart", jsonStr );
  }

  //This is just for testing
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  console.log(cartObj);
}

function updateQuantityAdd(index){
  console.log("qty updated +");
  //Get the cart
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  //increment the quantity at the index
  cartObj[index].qty += 1;
  //Update the current cart
  var jsonStr = JSON.stringify( cartObj );
  sessionStorage.setItem( "cart", jsonStr );
  //Refresh the page to display the changes
  location.reload();
}

function updateQuantityMinus(index){
  console.log("qty updated -");
  //Get the cart
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  //If the item at the index is more than 0, decrement
  if(cartObj[index].qty > 0){cartObj[index].qty -= 1;}
  //Update the current cart
  var jsonStr = JSON.stringify( cartObj );
  sessionStorage.setItem( "cart", jsonStr );
  //Refresh the page to display the changes
  location.reload();
}

function checkItems(array, value){
  //Iterate through the cart
  for(i=0; i<array.length; i++){
    //Check the for the search value
    if(array[i].item==value){
      //Return a structure with the index that the value was found at
      let found = true,
          index = i;
      return{found, index};
    }
  }
  let found = false,
      index = 0;
  return{found, index};
}

function addToCart(name, price, qty){
  console.log("added to cart");
  console.log(name);
  console.log(price);
  console.log(qty);
  //Update the cart with the values passed in from the HTML
  updateCartAdd(name, price, qty);
}

function displayCart(){
  //Find the container that the shopping cart contents will be displayed in
  var container = document.getElementById('shopping_cart_container');
  //Get the current cart
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  // Declacre total variable to collect the total price
  var total = 0.0;
  //Check to see if there are items in the cart
  //if there are none then display a message
  if(cartObj!=null){
    // Create the cart
    var contentDiv = [document.createElement('div')];
    //Iterate through the cart
    for(i=0; i<cartObj.length; i++){
      //Check to see if the quantity is valid
      if(cartObj[i].qty != 0 && cartObj[i].qty != null){
        contentDiv[i] = document.createElement('div');
        contentDiv[i].className = 'shopping_cart_div';

        //Display the items name
        var item = document.createElement('div');
        item.class = 'shopping_cart__item_text';
        item.innerHTML = cartObj[i].item;
        item.className = 'shopping_cart__item_text';
        contentDiv[i].appendChild(item);

        //Create an array for the add and subtract buttons
        //Minus button
        var button = [document.createElement('button'), document.createElement('button')];
        button[0].type = 'button';
        button[0].innerHTML = '-';
        button[0].className = 'shopping_cart_button';
        // Bind the onclick method
        button[0].onclick = (function(i){ return function(){ updateQuantityMinus(i)}})(i);
        contentDiv[i].appendChild(button[0]);
        //Add button
        button[1].type = 'button';
        button[1].innerHTML = '+';
        button[1].className = 'shopping_cart_button';
        button[1].onclick = (function(i){ return function(){ updateQuantityAdd(i)}})(i);
        contentDiv[i].appendChild(button[1]);
        //Display the quantity of the item
        var qty = document.createElement('div');
        qty.class = 'shopping_cart__num_text';
        qty.innerHTML = cartObj[i].qty;
        qty.className = 'shopping_cart__num_text';
        contentDiv[i].appendChild(qty);
        //Find the total for this item
        var totalPrice = cartObj[i].price * cartObj[i].qty;
        //Display the price
        var price = document.createElement('div');
        price.class = 'shopping_cart__num_text';
        price.innerHTML = "$" + totalPrice;
        price.className = 'shopping_cart__num_text';
        contentDiv[i].appendChild(price);
        //Update the cart total
        total += totalPrice;
        //Append the cart item to the shopping cart container
        container.appendChild(contentDiv[i]);
      }
    }
  }
  //Display the cart total
  var displayTotal = document.createElement('div');
  displayTotal.class = 'shopping_cart__total_text';
  displayTotal.innerHTML = "Cart total: $" + total;
  displayTotal.className = 'shopping_cart__total_text';
  container.appendChild(displayTotal);
}

//Display the cart on load
document.addEventListener('DOMContentLoaded', function() {
  displayCart();
}, false);
