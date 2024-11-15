import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './ProductDisplay.css'
import { Product } from '../../types/types';
import AutoCloseModal from '../pages/messageModal';
import type { databaseProduct, productWithCategory, productImage } from '../../types/entities';

/* TODO agregar los datos faltantes para mejorar la descripcion y el stock*/
interface ProductDisplayProps {
    id: number;
    image: string[];
    name: string;
    price: number;
    description?: string;
    isExclusive: boolean;
    oldPrice?: string;
    discount?: string;
    category: string;
    addToCart: (item: Product) => void;
    product: Product
}

// TODO continuar con cambios para q use los datos de la base, revisar los tamanos de imagen
const ProductDisplay: React.FC<ProductDisplayProps> = ({ id, image, name, description, price, oldPrice, discount, isExclusive, category, addToCart, product }) => {
   
    const location = useLocation();
    const displayProduct = location.state?.product;
    const displayProductImages = location.state?.images;
  
    if (!displayProductImages) {
        console.log(displayProductImages)
        return <div>Product not found</div>;
    } else {
        console.log(displayProductImages)
    }
   
    const [showModal, setShowModal] = useState(false)

    const [userToken, setUserToken] = useState('');
    const [mainImage, setMainImage] = useState<string>(displayProductImages[0].image_data);
    const handleImageClick = (image: string) => {
        setMainImage(image); // Actualizar el estado de la imagen principal
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem('token');
        if (token) {
            validateToken();
        }
      }, []);

      const validateToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          console.log(token)
          const response = await fetch('http://localhost:3000/protected', {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'authorization': 'Basic ' + token
            },
          });
          console.log(token)
          const data = await response.json();
          console.log('Protected data:', data);
          
          setUserToken(token)
        }
      } 

      const addToBag = (product: Product) => {
        if (userToken !== '') {
            addToCart(product)
        } else {
            setShowModal(true)
        }
      }


    return (
        <div className="productDisplay">
            <div className="productDisplayLeft">
                <div className='productDisplayImgList'>
                    {image.slice(0, 4).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product thumbnail ${index}`}
                            className="img-thumbnail"
                            onClick={() => handleImageClick(image)} // Agregar el controlador de eventos
                            style={{ cursor: 'pointer' }} // Cambiar el cursor para indicar que es clicable
                        />
                    ))}
                </div>
                <div className="productDisplayImg">
                    <img className='productDisplayImgMain' src={mainImage} alt='' />
                </div>
            </div>

            <div className="productDisplayRight">
                <h1>{displayProduct.name}</h1>
                <div className="productDisplayRightPrices">
                    <div className="productDisplayRightPriceNew">Price: ${displayProduct.price}</div>
                    <div className="productDisplayRightPriceOld">{oldPrice}</div>
                    <div className="productDisplayRightPriceDiscount">{discount}</div>
                </div>

                <div className="productDisplayRightDetails">
                    <h1>Product details</h1>
                    <h2 >{displayProduct.description}</h2>
                </div>

                <div className="productDisplayRightSize">
                    <h1>Select size</h1>
                    <div className="productDisplayRightSizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>
                <button className='btn-add' onClick={() => addToBag(product)} >ADD TO CART</button>
                <div className='productDisplayRightCategory'>Category: {displayProduct.categories.name}</div>
                <div className='productDisplayRightProductCode'> Product code: {displayProduct.id}</div>
                {displayProduct.is_exclusive && <div className='productDisplayRightExclusive'>WEB EXCLUSIVE</div>}
            </div>

            <AutoCloseModal
                message='You must be logged in to add to cart!'
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

export default ProductDisplay