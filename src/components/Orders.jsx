import React from 'react';

export default function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <div>
        <h2>📋 Đơn hàng</h2>
        <div style={{ textAlign: 'center', color: '#999', padding: '40px 20px' }}>
          <p>Chưa có đơn hàng nào</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>📋 Đơn hàng ({orders.length})</h2>
      <div className="orders-list">
        {orders.slice().reverse().map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <span className="order-id">Đơn #{order.id}</span>
                {order.customer && <span> - {order.customer}</span>}
              </div>
              <span className="order-time">
                {new Date(order.createdAt).toLocaleString('vi-VN')}
              </span>
            </div>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <span>
                    {item.name} x{item.qty}
                  </span>
                  <span>
                    {(item.price * item.qty).toLocaleString()}₫
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              Tổng: {order.total?.toLocaleString() || 0}₫
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
