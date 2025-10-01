import React from 'react';

const ProductList = ({ products, onSelectProduct }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} onClick={() => onSelectProduct(product)}>
          <img src={product.thumbnail} alt={product.title} style={{ width: '150px', height: '150px' }} />
          <h3>{product.title}</h3>
          <p>{product.brand}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
