import React, { useState } from 'react';
import './ProductDisplay.css';

/* TODO agregar los datos faltantes para mejorar la descripcion y el stock*/
interface ProductDisplayProps {
    id: number;
    image: string;
    name: string;
    price: string;
    isExclusive: boolean;
    oldPrice?: string;
    discount?: string;
    category: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ id, image, name, price, oldPrice, discount, isExclusive, category }) => {
    const [selectedImage, setSelectedImage] = useState(image);
    /*Logica para actualizar la imagen cuando se toca*/
    /*TODO: se ocupa implementar una lsita de imagenes y probar*/
    const handleImageClick = (newImage: string) => {
        setSelectedImage(newImage);
    };

    return (
        <div className="productDisplay">
            <div className="productDisplayLeft">
                <div className="productDisplayImgList">
                    <img src={image} alt='' onClick={() => handleImageClick(image)} />
                    <img src={image} alt='' onClick={() => handleImageClick(image)} />
                    <img src={image} alt='' onClick={() => handleImageClick(image)} />
                </div>
            </div>

            <div className="productDisplayMiddle">
                <div className="productDisplayImg">
                    <img className='productDisplayImgMain' src={selectedImage} alt='' />
                </div>
            </div>

            <div className="productDisplayRight">
                <h1>{name}</h1>
                <div className="productDisplayRightPrices">
                    <div>{price}</div>
                    <div>{oldPrice}</div>
                    <div>{discount}</div>
                </div>

                <div className="productDisplayRightDetails">
                    <p>Product details go here.</p>
                </div>

                <div className="productDisplayRightSize">
                    <h1>Select Size</h1>
                    <div className="productDisplayRightSizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>
                <button>ADD TO CART</button>
                <div className="productDisplayRightCategory">{category}</div>
                {isExclusive && <div className="productDisplayRightExclusive">WEB EXCLUSIVE</div>}
            </div>
        </div>
    );
};

export default ProductDisplay