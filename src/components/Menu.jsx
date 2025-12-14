import React, { useState } from 'react';

export default function Menu({ dishes, onAdd }) {
  const [search, setSearch] = useState('');
  
  const filtered = dishes.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text"
        className="search-box"
        placeholder="🔍 Tìm kiếm món..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="menu-grid">
        {filtered.map(d => (
          <div key={d.id} className="dish-card">
            <h3>{d.name}</h3>
            {d.category && <span className="category">{d.category}</span>}
            <div className="price">{d.price.toLocaleString()}₫</div>
            <button className="btn btn-primary" onClick={() => onAdd(d)}>
              + Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          <p>Không tìm thấy món nào</p>
        </div>
      )}
    </div>
  );
}
