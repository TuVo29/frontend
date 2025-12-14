import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import Orders from './components/Orders';
import Invoice from './components/Invoice';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function App(){
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [dishRes, orderRes] = await Promise.all([
          fetch(`${BACKEND}/dishes`),
          fetch(`${BACKEND}/orders`)
        ]);
        if (dishRes.ok) setDishes(await dishRes.json());
        if (orderRes.ok) setOrders(await orderRes.json());
      } catch (err) {
        console.error('Load error:', err);
      }
    };
    loadData();
  }, []);

  // Add to cart
  const addToCart = (dish) => {
    setCart(prev => {
      const found = prev.find(p => p.id === dish.id);
      if (found) {
        return prev.map(p => p.id === dish.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...dish, qty: 1 }];
    });
  };

  // Update quantity
  const updateQty = (dishId, newQty) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(p => p.id !== dishId));
    } else {
      setCart(prev => prev.map(p => p.id === dishId ? { ...p, qty: newQty } : p));
    }
  };

  // Remove from cart
  const removeFromCart = (dishId) => {
    setCart(prev => prev.filter(p => p.id !== dishId));
  };

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) return alert('Giỏ hàng trống');
    
    try {
      const res = await fetch(`${BACKEND}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, customer: null })
      });
      
      if (res.ok) {
        const newOrder = await res.json();
        setOrders(prev => [...prev, newOrder]);
        setCart([]);
        setActiveTab('orders');
        alert('✓ Đặt hàng thành công!');
      } else {
        alert('Lỗi đặt hàng');
      }
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  // Add dish
  const addDish = (dish) => {
    setDishes(prev => [...prev, dish]);
  };

  // Delete dish
  const deleteDish = (id) => {
    setDishes(prev => prev.filter(d => d.id !== id));
  };

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} cartCount={cart.length} />
      
      <div className="app-container">
        {activeTab === 'dashboard' && (
          <Dashboard orders={orders} dishes={dishes} />
        )}

        {activeTab === 'menu' && (
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '30px 20px', display: 'flex', gap: 30 }}>
            <div style={{ flex: 1 }}>
              <Menu dishes={dishes} onAdd={addToCart} />
            </div>
            <div style={{ width: 350 }}>
              <Cart 
                items={cart} 
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
                onCheckout={placeOrder}
              />
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '30px 20px' }}>
            <Orders orders={orders} />
          </div>
        )}

        {activeTab === 'billing' && (
          <Invoice orders={orders} />
        )}

        {activeTab === 'admin' && (
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '30px 20px' }}>
            <AdminPanel 
              dishes={dishes} 
              onDishAdded={addDish}
              onDishDeleted={deleteDish}
            />
          </div>
        )}
      </div>
    </>
  );
}
