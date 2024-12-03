import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './ProductDisplay.css'
import { Product } from '../../types/types';
import AutoCloseModal from '../pages/messageModal';
import { getProductSizesAndStock } from '../../services/apiService';
import type { productImage, sizeWithStock } from '../../types/entities';

/* TODO agregar los datos faltantes para mejorar la descripcion y el stock*/
interface ProductDisplayProps {
    addToCart: (item: Product) => void;
    product: Product
}

// TODO revisar porque despliega las imagenes con tamanos diferentes
const ProductDisplay: React.FC<ProductDisplayProps> = ({ addToCart, product }) => {
   
    const location = useLocation();
    const displayProduct = location.state?.product;
    const displayProductImages = location.state?.images;
  
    if (!displayProductImages) {
        // console.log(displayProductImages)
        return <div>Product not found</div>;
    } else {
        // console.log(displayProductImages)
        // console.log(displayProduct)
    }
   
    const [showModal, setShowModal] = useState(false)

    const [userToken, setUserToken] = useState('');
    const [mainImage, setMainImage] = useState<string>(displayProductImages[0].image_data);
    const handleImageClick = (image: string) => {
        setMainImage(image); // Actualizar el estado de la imagen principal
    };

    const [stock, setStock] = useState<sizeWithStock[]>([])

    useEffect(() => {
        fetchSizesAndStock()

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

    const fetchSizesAndStock = async () => {
        try {
          const response: sizeWithStock[] = await getProductSizesAndStock(displayProduct.id);
          setStock(response)
          
          console.log(response)
    
        } catch (err) {
          console.error('Error fetching sizes and their stock', err);
        } 
      };

    const addToBag = (product: Product) => {
    if (userToken !== '') {
        addToCart(product)
    } else {
        setShowModal(true)
    }
    }

    const calculateTotalStock = () => {
        if (stock.length > 0) {
            const total = stock.reduce((accumulator, stockPerSize) => {
                return accumulator + (stockPerSize.stock ?? 0); // Add stock to accumulator
              }, 0); // Initial value of accumulator is 0
            
            console.log(total); 
            return total
        } else {
            return 0
        }
    }

    return (
        <div className="productDisplay">
            <div className="productDisplayLeft">
                <div className='productDisplayImgList'>
                    {displayProductImages.slice(0, 4).map((image: productImage, index: number) => (
                        <img
                            key={index}
                            src={image.image_data}
                            alt={`Product thumbnail ${index}`}
                            className="img-thumbnail"
                            onClick={() => handleImageClick(image.image_data)} // Agregar el controlador de eventos
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
                    {
                        displayProduct.discount ? 
                            <div>
                                <div className="productDisplayRightPriceNew">Price: ${(displayProduct.price - displayProduct.price * displayProduct.discount).toFixed(2)}</div>
                                <div className="productDisplayRightPriceOld">${displayProduct.price.toFixed(2)}</div>
                                <div className="productDisplayRightPriceDiscount">{displayProduct.discount * 100}% OFF</div>
                            </div>
                        : 
                        <div className="productDisplayRightPriceNew">Price: ${displayProduct.price}</div>
                    }
                </div>

                <div className="productDisplayRightDetails">
                    <h1>Product details</h1>
                    <h2 >{displayProduct.description}</h2>
                </div>
                
                {
                    calculateTotalStock() > 0 ? 
                        <div className="productDisplayRightSize">
                            <h1>Select size</h1>
                             <div className="productDisplayRightSizes">
                                {
                                stock.map((stockPerSize, index) => {
                                    if ((stockPerSize.stock ?? 0) > 0) { // Check if there's stock
                                    return <div key={index}>{stockPerSize.name}</div>;
                                    }
                                    return null;
                                })
                                }
                            </div>
                        </div>
                    :
                    <div>
                        <h2 className="productOutOfStock">Out of stock</h2>
                    </div>
                }

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