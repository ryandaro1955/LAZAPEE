import React from 'react';

const Checkout = ({ cartItems, onConfirm }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.title} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={onConfirm}>Confirm Purchase</button>
    </div>
  );
};

export default Checkout;
