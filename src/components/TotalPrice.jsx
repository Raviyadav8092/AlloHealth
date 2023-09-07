import React from 'react';

const TotalPrice = ({ totalPrice }) => {
  return (
    <div className="total-price">
      <h3>Total Price</h3>
      <p>${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default TotalPrice;
