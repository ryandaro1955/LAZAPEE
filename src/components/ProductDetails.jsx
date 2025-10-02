import React from 'react';

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <div className="product-details-modal">
      <button onClick={onClose}>Close</button>
      <img src={product.thumbnail} alt={product.title} style={{ width: '200px', height: '200px' }} />
      <h2>{product.title}</h2>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Stock: {product.stock}</p>
      <p>Rating: {product.rating}</p>
      <p>{product.description}</p>
      <div>
        {product.images && product.images.map((img, idx) => (
          <img key={idx} src={img} alt={product.title + idx} style={{ width: '80px', margin: '5px' }} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
