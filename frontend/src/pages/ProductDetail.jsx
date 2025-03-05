import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ProductDetail from '../components/ProductDetail/ProductDetail';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetail() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/items/${id}`);
        console.log('Producto recibido en el frontend:', response.data.item);
        setProduct(response.data.item);
      } catch (err) {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetail();
  }, [id]);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && product && <ProductDetail product={product} />}
    </div>
  );
}
