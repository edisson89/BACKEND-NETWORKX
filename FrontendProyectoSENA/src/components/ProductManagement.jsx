import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductManagement = () => {
  const { products, loading, error, fetchProducts, API_URL } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    provider: '',
    location: '',
    badges: ''
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price.replace(/[^0-9.-]+/g,"")), // Limpia el formato de moneda
      badges: formData.badges.split(',').map(b => b.trim())
    };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error en la operación');
      }

      setFormData({ name: '', price: '', provider: '', location: '', badges: '' });
      setEditingId(null);
      await fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      provider: product.provider,
      location: product.location,
      badges: product.badges.join(', ')
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('No se pudo eliminar el producto');
        
        fetchProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {loading && <p className="text-blue-500 animate-pulse">Cargando...</p>}

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded">
        <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2" required />
        <input type="text" placeholder="Precio (ej: 25000)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="border p-2" required />
        <input type="text" placeholder="Proveedor" value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} className="border p-2" required />
        <input type="text" placeholder="Ubicación" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="border p-2" required />
        <input type="text" placeholder="Etiquetas (separadas por coma)" value={formData.badges} onChange={e => setFormData({...formData, badges: e.target.value})} className="border p-2 col-span-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">
          {editingId ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-green-600 font-semibold">${product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-600">📍 {product.location}</p>
            <p className="text-sm italic">Prov: {product.provider}</p>
            <div className="flex gap-2 my-2">
              {product.badges.map(badge => (
                <span key={badge} className="bg-yellow-200 text-xs px-2 py-1 rounded">{badge}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Editar</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;