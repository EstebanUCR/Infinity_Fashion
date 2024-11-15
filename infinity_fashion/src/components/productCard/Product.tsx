import type { Product } from '../../types/types';
import { useEffect, useState } from 'react';
import './Product.css';
import { Link, LinkProps } from 'react-router-dom';
import { getProductImages } from '../../services/apiService';
import type { databaseProduct, productWithCategory, productImage } from '../../types/entities';

type ProductProps = {
  product: productWithCategory,
  // addToCart: (item: databaseProduct) => void
}

export default function ProductCard ({product} : ProductProps)  {

  const [images, setImages] = useState<productImage[]>([])

  // on render
  useEffect(() => {
    fetchImages()
    console.log(images)
  }, []);

  const fetchImages = async () => {
    try {
      const response: productImage[] = await getProductImages(product.id);
      setImages(response)
      
      console.log(response)

    } catch (err) {
      console.error('Error fetching product images', err);
    } 
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <Link to={`/product/${product.id}`}>
          {images?.length > 0 ? <img src={images[0].image_data} alt={product.name} /> : null }
        </Link>
        </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>
          <span className={`price ${product.discount} ? 'price-discount' : 'price-regular'}`}>
            ${product.price}
          </span>{' '}
          {/* <span className="old-price">{product.price - product.price * product.discount}</span>{' '} */}
          <span className="discount">{product.discount}</span>
        </p>
      </div>
      <div className='d-flex justify-content-end'>
        <Link
          className="w-100 mt-3 p-2"
          to={`/product/${product.id}`}
          state={{product: product, images: images}}
        >
          <button
            className='w-100 mt-3 p-2'
          >Quick view</button>
        </Link>
      </div>
      
    </div>
  );
};

