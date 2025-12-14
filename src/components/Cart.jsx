import React from 'react';

export default function Cart({ items, onUpdateQty, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="cart-panel">
        <h2>🛒 Giỏ hàng</h2>
        <div className="empty-cart">
          <p>Chưa có món nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <h2>🛒 Giỏ hàng ({items.length} món)</h2>
      <div>
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div>
              <div className="cart-item-name">{item.name}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {item.price.toLocaleString()}₫
              </div>
            </div>
            <div className="cart-item-controls">
              <button 
                className="qty-btn" 
                onClick={() => onUpdateQty(item.id, item.qty - 1)}
              >
                −
              </button>
              <span className="qty-display">{item.qty}</span>
              <button 
                className="qty-btn" 
                onClick={() => onUpdateQty(item.id, item.qty + 1)}
              >
                +
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => onRemove(item.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
        <div className="cart-subtotal">
          <span>Tổng tiền:</span>
          <span style={{ color: '#667eea', fontWeight: 'bold' }}>
            {total.toLocaleString()}₫
          </span>
        </div>
        <button 
          className="btn btn-success" 
          onClick={onCheckout}
          style={{ width: '100%', padding: '12px' }}
        >
          ✓ Đặt hàng
        </button>
      </div>
    </div>
  );
}
