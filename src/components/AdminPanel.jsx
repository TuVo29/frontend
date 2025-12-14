import React, { useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function AdminPanel({ dishes, onDishAdded, onDishDeleted }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('chính');

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!name || !price) return alert('Điền đầy đủ tên và giá');
    
    const res = await fetch(`${BACKEND}/dishes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), category })
    });
    
    if (res.ok) {
      const dish = await res.json();
      onDishAdded(dish);
      setName('');
      setPrice('');
      setCategory('chính');
      alert('Thêm món thành công');
    } else {
      alert('Lỗi');
    }
  };

  const handleDeleteDish = async (id) => {
    if (!confirm('Xóa món này?')) return;
    const res = await fetch(`${BACKEND}/dishes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      onDishDeleted(id);
      alert('Xóa thành công');
    }
  };

  return (
    <div>
      <h2>⚙️ Quản lý Menu</h2>
      
      <form className="admin-form" onSubmit={handleAddDish}>
        <h3>Thêm món mới</h3>
        <div className="form-group">
          <label>Tên món:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Phở bò, Cơm sườn..."
          />
        </div>
        <div className="form-group">
          <label>Giá (₫):</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            placeholder="60000"
          />
        </div>
        <div className="form-group">
          <label>Danh mục:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="chính">Món chính</option>
            <option value="khai">Khai vị</option>
            <option value="nước">Đồ uống</option>
            <option value="tráng">Tráng miệng</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          + Thêm món
        </button>
      </form>

      <div className="admin-dishes-list">
        <h3>Danh sách món ({dishes.length})</h3>
        {dishes.length === 0 ? (
          <p style={{ color: '#999' }}>Chưa có món nào</p>
        ) : (
          dishes.map(dish => (
            <div key={dish.id} className="admin-dish-item">
              <div className="admin-dish-info">
                <h4>{dish.name}</h4>
                <div style={{ color: '#667eea', fontWeight: 'bold' }}>
                  {dish.price?.toLocaleString()}₫
                </div>
                {dish.category && (
                  <span className="dish-card category">{dish.category}</span>
                )}
              </div>
              <div className="admin-dish-actions">
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteDish(dish.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
