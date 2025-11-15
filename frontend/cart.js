const API = (window.API_URL || 'http://localhost:5000') + '/api';

// Cart helpers used by cart page
function getCart(){
  return JSON.parse(localStorage.getItem('blue_cart') || '[]');
}
function saveCart(cart){
  localStorage.setItem('blue_cart', JSON.stringify(cart));
  // notify other pages
  window.dispatchEvent(new Event('cartUpdated'));
}

function changeQty(id, delta){
  const cart = getCart();
  const idx = cart.findIndex(i => i._id === id);
  if(idx === -1) return;
  cart[idx].qty = Math.max(0, (Number(cart[idx].qty) || 0) + Number(delta));
  if(cart[idx].qty <= 0){
    cart.splice(idx, 1);
  }
  saveCart(cart);
  if(typeof renderCart === 'function') renderCart();
}

function removeItem(id){
  const cart = getCart();
  const newCart = cart.filter(i => i._id !== id);
  saveCart(newCart);
  if(typeof renderCart === 'function') renderCart();
}

// Place order function (still used by checkout)
async function placeOrder(name, email, address, description){
  const items = getCart();
  if(items.length === 0) return alert('Cart empty');
  const payload = { name, email, address, description, items };
  const res = await fetch(`${API}/orders`, {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(()=>({}));
  if(res.ok){
    alert('Order placed');
    localStorage.removeItem('blue_cart');
    window.dispatchEvent(new Event('cartUpdated'));
  } else alert('Order failed: ' + (data.message || ''));
}

// Ensure cart display updates on cart events (calls renderCart from cart.html)
window.addEventListener('cartUpdated', function() {
  if (typeof renderCart === 'function') renderCart();
});
window.addEventListener('load', function() {
  if (typeof renderCart === 'function') renderCart();
});
