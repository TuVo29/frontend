import React from 'react';

export default function Dashboard({ orders, dishes }) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const totalDishes = dishes.length;

  // Order status by date
  const ordersLast7Days = () => {
    const days = {};
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
      days[key] = 0;
    }

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const key = date.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
      if (days.hasOwnProperty(key)) {
        days[key]++;
      }
    });

    return days;
  };

  const last7Days = ordersLast7Days();
  const maxOrders = Math.max(...Object.values(last7Days), 1);

  // Top dishes by order count
  const dishOrderCount = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      dishOrderCount[item.id] = (dishOrderCount[item.id] || 0) + item.qty;
    });
  });

  const topDishes = dishes
    .map(d => ({ ...d, orderCount: dishOrderCount[d.id] || 0 }))
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h1>📊 Bảng điều khiển</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-label">Tổng đơn hàng</div>
            <div className="stat-value">{totalOrders}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Tổng doanh thu</div>
            <div className="stat-value">{totalRevenue.toLocaleString()}₫</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔢</div>
          <div className="stat-content">
            <div className="stat-label">TB/Đơn</div>
            <div className="stat-value">{avgOrderValue.toLocaleString()}₫</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <div className="stat-label">Số món</div>
            <div className="stat-value">{totalDishes}</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        {/* Orders Chart */}
        <div className="chart-card">
          <h3>📈 Đơn hàng 7 ngày gần đây</h3>
          <div className="chart">
            {Object.entries(last7Days).map(([date, count]) => (
              <div key={date} className="chart-bar-container">
                <div className="chart-bar-label">{date}</div>
                <div className="chart-bar">
                  <div 
                    className="chart-bar-fill" 
                    style={{ height: `${(count / maxOrders) * 100}%` }}
                  >
                    {count > 0 && <span className="chart-bar-value">{count}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Dishes */}
        <div className="chart-card">
          <h3>🏆 Top món được đặt</h3>
          <div className="top-items">
            {topDishes.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
                Chưa có đơn hàng
              </p>
            ) : (
              topDishes.map((dish, idx) => (
                <div key={dish.id} className="top-item">
                  <div className="top-item-rank">#{idx + 1}</div>
                  <div className="top-item-info">
                    <div className="top-item-name">{dish.name}</div>
                    <div className="top-item-price">{dish.price.toLocaleString()}₫</div>
                  </div>
                  <div className="top-item-count">
                    {dish.orderCount} lần
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      {orders.length > 0 && (
        <div className="recent-orders">
          <h3>📋 Đơn hàng gần đây</h3>
          <div className="recent-orders-list">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="recent-order-item">
                <div className="recent-order-info">
                  <div className="recent-order-id">Đơn #{order.id}</div>
                  <div className="recent-order-time">
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </div>
                </div>
                <div className="recent-order-amount">
                  {order.total.toLocaleString()}₫
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
