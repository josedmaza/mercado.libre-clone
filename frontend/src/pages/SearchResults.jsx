import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import ProductList from '../components/ProductList/ProductList';

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/items?q=${query}`);
        console.log('Producto recibido en el frontend:', response.data.items);
        setProducts(response.data.items);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [query]);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>No se encontraron productos.</p>
      )}
      {!loading && !error && products.length > 0 && (
        <ProductList products={products} />
      )}
    </div>
  );
}
