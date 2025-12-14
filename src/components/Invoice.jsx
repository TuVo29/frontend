import React, { useState } from 'react';

export default function Invoice({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (orders.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
        <p>Chưa có hóa đơn</p>
      </div>
    );
  }

  const order = selectedOrder 
    ? orders.find(o => o.id === selectedOrder)
    : orders[orders.length - 1];

  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + tax;

  return (
    <div className="invoice-container">
      <div style={{ display: 'flex', gap: 20 }}>
        {/* Invoice List */}
        <div style={{ flex: 1, maxWidth: 300 }}>
          <h3>📝 Danh sách hóa đơn</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orders.map(o => (
              <button
                key={o.id}
                className={`invoice-list-item ${selectedOrder === o.id ? 'active' : ''}`}
                onClick={() => setSelectedOrder(o.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Đơn #{o.id}</span>
                  <span style={{ color: '#667eea', fontWeight: 'bold' }}>
                    {o.total.toLocaleString()}₫
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: 4 }}>
                  {new Date(o.createdAt).toLocaleString('vi-VN')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice Detail */}
        <div style={{ flex: 2 }}>
          <div className="invoice-paper">
            <div className="invoice-header">
              <h1>🍽️ NHẬP HÓA ĐƠN</h1>
              <div className="invoice-meta">
                <div>
                  <span className="label">Mã đơn:</span>
                  <span className="value">#{order.id}</span>
                </div>
                <div>
                  <span className="label">Ngày:</span>
                  <span className="value">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="invoice-items">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #667eea' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0' }}>Mô tả</th>
                    <th style={{ textAlign: 'center', padding: '10px 0' }}>SL</th>
                    <th style={{ textAlign: 'right', padding: '10px 0' }}>Giá</th>
                    <th style={{ textAlign: 'right', padding: '10px 0' }}>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 0' }}>{item.name}</td>
                      <td style={{ textAlign: 'center', padding: '12px 0' }}>
                        {item.qty}
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px 0' }}>
                        {item.price.toLocaleString()}₫
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px 0', fontWeight: 'bold' }}>
                        {(item.price * item.qty).toLocaleString()}₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="invoice-summary">
              <div className="invoice-line">
                <span>Cộng tiền:</span>
                <span>{subtotal.toLocaleString()}₫</span>
              </div>
              <div className="invoice-line">
                <span>Thuế (10%):</span>
                <span>{tax.toLocaleString()}₫</span>
              </div>
              <div className="invoice-total">
                <span>TỔNG CỘNG:</span>
                <span>{total.toLocaleString()}₫</span>
              </div>
            </div>

            <div className="invoice-footer">
              <p>Cảm ơn quý khách!</p>
              <p style={{ fontSize: '12px', marginTop: 10 }}>
                Hóa đơn điện tử - Nhà hàng RestaurantApp
              </p>
            </div>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                🖨️ In hóa đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
