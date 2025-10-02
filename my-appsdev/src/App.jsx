

import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000, 1000]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        const cats = Array.from(new Set(data.products.map(p => p.category)));
        setCategories(cats);
        const prices = data.products.map(p => p.price);
        setPriceRange([Math.min(...prices), Math.max(...prices), Math.max(...prices)]);
      });
  }, []);

  useEffect(() => {
    let result = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? p.category === selectedCategory : true) &&
      p.price <= priceRange[2]
    );
    setFilteredProducts(result);
  }, [search, selectedCategory, priceRange, products]);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmPurchase = () => {
    setCart([]);
    setShowCheckout(false);
    alert('Purchase confirmed!');
  };

  return (
    <div className="app-container">
      <h1 className="titlee">LAZA-PEE</h1>
      <SearchBar value={search} onChange={setSearch} />
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceChange={val => setPriceRange([priceRange[0], priceRange[1], val])}
      />
      <button onClick={() => setShowCheckout(false)}>Shop</button>
      <button onClick={() => setShowCheckout(true)}>Cart ({cart.length})</button>
      {!showCheckout ? (
        <>
          <ProductList products={filteredProducts} onSelectProduct={setSelectedProduct} />
          {selectedProduct && (
            <div className="modal">
              <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
              <button onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart</button>
            </div>
          )}
        </>
      ) : (
        <>
          <Cart cartItems={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
          <Checkout cartItems={cart} onConfirm={handleConfirmPurchase} />
        </>
      )}
    </div>
  );
}

export default App;
