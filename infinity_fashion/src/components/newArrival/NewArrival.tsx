import './newArrival.css';
import { Carousel } from 'react-bootstrap';
import newArrivals_products from '../../assets/newArrivalProducts';
import ProductCard from '../productCard/Product';
import { Product } from '../../types/types';
import { useState, useEffect } from 'react';
import { getNewestProducts } from '../../services/apiService';
import type { productWithCategory } from '../../types/entities';

type NewArrivalProps = {
  addToCart: (item: Product) => void
}

export default function NewArrival({ addToCart }: NewArrivalProps) {

  const [products, setProducts] = useState<productWithCategory[]>([])

  const [groupSize, setGroupSize] = useState(3);
  const [carouselKey, setCarouselKey] = useState(0); // Para forzar re-renderizado

  useEffect(() => {
    fetchProducts()
    const handleResize = () => {
      let newGroupSize = 4; // Valor por defecto

      if (window.innerWidth <= 768) {
        newGroupSize = 1; // Muestra 1 producto por slide en pantallas pequeñas
      } else if (window.innerWidth <= 1024) {
        newGroupSize = 2; // Muestra 2 productos por slide en pantallas medianas
      }

      setGroupSize(newGroupSize);
      setCarouselKey((prevKey) => prevKey + 1); // Actualiza el key del carrusel para forzar re-renderizado
    };

    handleResize(); // Llama la función al cargar la página
    window.addEventListener('resize', handleResize); // Ajusta la cantidad de productos al cambiar el tamaño

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      const response: productWithCategory[] = await getNewestProducts();
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
    <div className="newArrival">
      <div className="title-container">
        <h2 className="elegant-title">New Arrivals</h2>
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
