import React from 'react';

export default function Navbar({ activeTab, onTabChange, cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">RestaurantApp</span>
        </div>
        
        <ul className="navbar-menu">
          <li>
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => onTabChange('dashboard')}
            >
              📊 Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => onTabChange('menu')}
            >
              🍜 Menu
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => onTabChange('orders')}
            >
              📋 Đơn hàng
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => onTabChange('billing')}
            >
              💵 Hóa đơn
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => onTabChange('admin')}
            >
              ⚙️ Quản lý
            </button>
          </li>
        </ul>

        <div className="navbar-right">
          {activeTab === 'menu' && cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </div>
    </nav>
  );
}
