import React, { useState } from 'react';
import './ProductDetail.scss';

const ProductDetail = ({ product }) => {
  const {
    title,
    price,
    pictures,
    condition,
    free_shipping,
    description,
    installments,
    sold_quantity,
  } = product;

  console.log('Product:', product);

  const [selectedImage, setSelectedImage] = useState(pictures[0]);

  return (
    <div className='product-detail-container'>
      <div className='product-detail__images'>
        <div className='product-detail__thumbnails'>
          {pictures.map((pic, index) => (
            <button key={index} className='product-detail__thumbnail-button'>
              <img
                src={pic}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${selectedImage === pic ? 'active' : ''}`}
                onClick={() => setSelectedImage(pic)}
                onMouseEnter={() => setSelectedImage(pic)}
              />
            </button>
          ))}
        </div>
        <img
          src={selectedImage}
          alt={title}
          className='product-detail__image'
        />

        <div className='product-detail__info'>
          <p className='product-detail__sold-quantity'>
            Vendidos: {sold_quantity || 0}
          </p>
          <h1 className='product-detail__title'>{title}</h1>
          <p className='product-detail__price'>
            ${price.amount.toLocaleString('es-CO')}
          </p>
          <p>{installments}</p>
          <p className='product-detail__condition'>{condition}</p>
          {free_shipping && (
            <p className='product-detail__shipping'>Envío gratis</p>
          )}

          {product.attributes.map((attr) => (
            <p className='product-detail__atributte' key={attr.id}>
              {attr.name}: <strong>{attr.value_name || 'No disponible'}</strong>
            </p>
          ))}
        </div>
      </div>
      <hr className='product-detail__line' />

      <h2 className='product-detail__description-title'>Descripción</h2>
      <p className='product-detail__description'>{description}</p>
    </div>
  );
};

export default ProductDetail;
