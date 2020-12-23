function updateCartAdd(name, price, qty){
  var cartItem = {
    item: name,
    price: price,
    qty: qty
  };

  // cartItem = new CartItem(name, price, qty);
  var cart = [cartItem];
  console.log(cart);
  if(sessionStorage.getItem("cart")==null){
    var jsonStr = JSON.stringify( cart );
    sessionStorage.setItem( "cart", jsonStr );
  }
  else{
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse( cartValue );
    let check = checkItems(cartObj, cartItem.item);
    if(check.found){
      cartObj[check.index].qty += 1;
    }
    else{
      cartObj[cartObj.length] = cartItem;
    }
    var jsonStr = JSON.stringify( cartObj );
    sessionStorage.setItem( "cart", jsonStr );
  }

  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  console.log(cartObj);
}

function updateQuantityAdd(index){
  console.log("qty updated +");
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  cartObj[index].qty += 1;
  var jsonStr = JSON.stringify( cartObj );
  sessionStorage.setItem( "cart", jsonStr );
  location.reload();
}

function updateQuantityMinus(index){
  console.log("qty updated -");
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  if(cartObj[index].qty > 0){cartObj[index].qty -= 1;}
  var jsonStr = JSON.stringify( cartObj );
  sessionStorage.setItem( "cart", jsonStr );
  location.reload();
}

function checkItems(array, value){
  for(i=0; i<array.length; i++){
    if(array[i].item==value){
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
  updateCartAdd(name, price, qty);
}

function displayCart(){
  //Find the container that the shopping cart contents will be displayed in
  var container = document.getElementById('shopping_cart_container');
  //Get the current cart
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  //Check to see if there are items in the cart
  //if there are none then display a message
  if(cartObj==null){
    var contentDiv = document.createElement('div');
    contentDiv.class = 'shopping_cart';
    contentDiv.innerHTML = "There are no items in your cart";
    contentDiv.className = 'shopping_cart_text';
    container.appendChild(contentDiv);
  }
  else{
    // Create the cart
    var contentDiv = [document.createElement('div')];
    // Declacre total variable to collect the total price
    var total = 0.0;
    for(i=0; i<cartObj.length; i++){
      if(cartObj[i].qty != 0 && cartObj[i].qty != null){
        contentDiv[i] = document.createElement('div');
        contentDiv[i].className = 'shopping_cart_div';

        //display the items name
        var item = document.createElement('div');
        item.class = 'shopping_cart__item_text';
        item.innerHTML = cartObj[i].item;
        item.className = 'shopping_cart__item_text';
        contentDiv[i].appendChild(item);

        //Create an array for the add and subtract buttons
        var button = [document.createElement('button'), document.createElement('button')];
        button[0].type = 'button';
        button[0].innerHTML = '+';
        button[0].className = 'shopping_cart_button';
        // Bind the onclick method
        button[0].onclick = (function(i){ return function(){ updateQuantityAdd(i)}})(i);
        contentDiv[i].appendChild(button[0]);

        button[1].type = 'button';
        button[1].innerHTML = '-';
        button[1].className = 'shopping_cart_button';
        button[1].onclick = (function(i){ return function(){ updateQuantityMinus(i)}})(i);
        contentDiv[i].appendChild(button[1]);

        var qty = document.createElement('div');
        qty.class = 'shopping_cart__num_text';
        qty.innerHTML = cartObj[i].qty;
        qty.className = 'shopping_cart__num_text';
        contentDiv[i].appendChild(qty);

        var totalPrice = cartObj[i].price * cartObj[i].qty;
        var price = document.createElement('div');
        price.class = 'shopping_cart__num_text';
        price.innerHTML = "$" + totalPrice;
        price.className = 'shopping_cart__num_text';
        contentDiv[i].appendChild(price);

        total += totalPrice;
        container.appendChild(contentDiv[i]);
      }
    }
    var displayTotal = document.createElement('div');
    displayTotal.class = 'shopping_cart__total_text';
    displayTotal.innerHTML = "Cart total: $" + total;
    displayTotal.className = 'shopping_cart__total_text';
    container.appendChild(displayTotal);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  displayCart();
}, false);
