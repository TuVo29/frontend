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
      <style>
        {`
        .dashboard {
          background: #f4f6fb;
          padding: 24px;
          font-family: Inter, system-ui, sans-serif;
        }

        h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          gap: 14px;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0,0,0,.06);
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-label {
          color: #64748b;
          font-size: 14px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
        }

        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 24px;
          margin-bottom: 30px;
        }

        .chart-card {
          background: #fff;
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,.06);
        }

        .chart {
          display: flex;
          align-items: flex-end;
          height: 200px;
          gap: 10px;
          margin-top: 20px;
        }

        .chart-bar-container {
          flex: 1;
          text-align: center;
        }

        .chart-bar {
          height: 150px;
          background: #e5e7eb;
          border-radius: 10px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .chart-bar-fill {
          width: 100%;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding-bottom: 4px;
          transition: height .3s ease;
        }

        .chart-bar-label {
          margin-top: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .top-items {
          margin-top: 16px;
        }

        .top-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: 12px;
          transition: background .2s;
        }

        .top-item:hover {
          background: #f1f5f9;
        }

        .top-item-rank {
          font-weight: 700;
          color: #6366f1;
        }

        .top-item-name {
          font-weight: 600;
        }

        .top-item-price {
          font-size: 13px;
          color: #64748b;
        }

        .top-item-count {
          margin-left: auto;
          font-weight: 600;
        }

        .recent-orders {
          background: #fff;
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,.06);
        }

        .recent-orders-list {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recent-order-item {
          display: flex;
          justify-content: space-between;
          padding: 14px;
          border-radius: 12px;
          background: #f8fafc;
        }

        .recent-order-id {
          font-weight: 600;
        }

        .recent-order-time {
          font-size: 13px;
          color: #64748b;
        }

        .recent-order-amount {
          font-weight: 700;
          color: #16a34a;
        }
        `}
      </style>

      <h1>📊 Bảng điều khiển</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div>
            <div className="stat-label">Tổng đơn hàng</div>
            <div className="stat-value">{totalOrders}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div>
            <div className="stat-label">Tổng doanh thu</div>
            <div className="stat-value">{totalRevenue.toLocaleString()}₫</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔢</div>
          <div>
            <div className="stat-label">TB/Đơn</div>
            <div className="stat-value">{avgOrderValue.toLocaleString()}₫</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div>
            <div className="stat-label">Số món</div>
            <div className="stat-value">{totalDishes}</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>📈 Đơn hàng 7 ngày gần đây</h3>
          <div className="chart">
            {Object.entries(last7Days).map(([date, count]) => (
              <div key={date} className="chart-bar-container">
                <div className="chart-bar">
                  <div
                    className="chart-bar-fill"
                    style={{ height: `${(count / maxOrders) * 100}%` }}
                  >
                    {count || ''}
                  </div>
                </div>
                <div className="chart-bar-label">{date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>🏆 Top món được đặt</h3>
          <div className="top-items">
            {topDishes.map((dish, idx) => (
              <div key={dish.id} className="top-item">
                <div className="top-item-rank">#{idx + 1}</div>
                <div>
                  <div className="top-item-name">{dish.name}</div>
                  <div className="top-item-price">{dish.price.toLocaleString()}₫</div>
                </div>
                <div className="top-item-count">{dish.orderCount} lần</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="recent-orders">
          <h3>📋 Đơn hàng gần đây</h3>
          <div className="recent-orders-list">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="recent-order-item">
                <div>
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
