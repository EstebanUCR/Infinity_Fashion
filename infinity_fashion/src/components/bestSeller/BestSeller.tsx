import './bestSeller.css';
import bestsellers_products from '../../assets/bestSellerProducts';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../productCard/Product';
import { Product } from '../../types/types';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/apiService';
import type { productWithCategory } from '../../types/entities';

type BestSellerProps = {
  addToCart: (item: Product) => void
}

// currently returns all products
export default function BestSeller({ addToCart }: BestSellerProps) {
  const [groupSize, setGroupSize] = useState(3);
  const [carouselKey, setCarouselKey] = useState(0); // Para forzar re-renderizado

  const [products, setProducts] = useState<productWithCategory[]>([])

  useEffect(() => {
    fetchProducts()
    console.log(products)

    const handleResize = () => {
      let newGroupSize = 4;

      if (window.innerWidth <= 768) {
        newGroupSize = 1; // Muestra 1 producto por slide en pantallas pequeñas
      } else if (window.innerWidth <= 1024) {
        newGroupSize = 2; // Muestra 2 productos por slide en pantallas medianas
      }

      setGroupSize(newGroupSize);
      setCarouselKey(prevKey => prevKey + 1); // Actualiza el key del carrusel para forzar re-renderizado
    };

    handleResize(); // Llama la función al cargar la página
    window.addEventListener('resize', handleResize); // Ajusta la cantidad de productos al cambiar el tamaño

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      const response: productWithCategory[] = await getProducts();
      setProducts(response)
      
      console.log(response)

    } catch (err) {
      console.error('Error fetching products', err);
    } 
  };

  // Agrupar productos según el tamaño del grupo
  const groupedProducts = products.reduce((acc, curr, index) => {
    if (index % groupSize === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [] as productWithCategory[][]);

  return (
    <div className="bestseller-section">
      <div className="title-container">
        <h2 className="elegant-title">Best Sellers</h2>
      </div>

      <Carousel key={carouselKey}> {/* Nuevo key para forzar re-renderizado */}
        { products ?
          groupedProducts.map((group, i) => (
            <Carousel.Item key={i}>
              <div className="carousel-container">
                {group.map((item) => (
                  <ProductCard key={item.id} product={item} /* addToCart={addToCart} */ />
                ))}
              </div>
            </Carousel.Item>
          ))
          :
          null
        }
      </Carousel>
    </div>
  );
}
