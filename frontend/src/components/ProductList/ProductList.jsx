import { useNavigate } from 'react-router-dom';
import './ProductList.scss';

export default function ProductList({ products }) {
  const navigate = useNavigate();

  return (
    <div className='product-list-container'>
      <ul className='product-list'>
        {products.map((product) => (
          <li
            key={product.id}
            className='product-list__item'
            onClick={() => navigate(`/items/${product.id}`)}
          >
            <div className='product-list__image-container'>
              <img
                src={product.picture}
                alt={product.title}
                className='product-list__image'
              />
            </div>
            <div className='product-list__info'>
              <h2 className='product-list__title'>{product.title}</h2>
              <div className='product-list__pricing'>
                <p className='product-list__price'>
                  {product.price.currency} {product.price.amount}
                </p>

                <p className='product-list__installments'>
                  {product.installments}
                </p>
              </div>

              {product.free_shipping && (
                <p className='product-list__shipping'>Envío gratis</p>
              )}
              {product.condition !== 'new' && (
                <p className='product-list__used'>Reacondicionado</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
