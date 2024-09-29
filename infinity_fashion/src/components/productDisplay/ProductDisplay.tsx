import React from 'react'
import './ProductDisplay.css'

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
    return (
        <div className="productDisplay">
            <div className="productDisplayLeft">
                <div className='productDisplayImgList'>
                    <img src={image} alt='' />
                    <img src={image} alt='' />
                    <img src={image} alt='' />
                </div>
                <div className="productDisplayImg">
                    <img className='productDisplayImgMain' src={image} alt='' />
                </div>
            </div>

            <div className="productDisplayRight">
                <h1>{name}</h1>
                <div className="productDisplayRightPrices">
                    <div className="productDisplayRightPriceNew">Price: {price}</div>
                    <div className="productDisplayRightPriceOld">{oldPrice}</div>
                    <div className="productDisplayRightPriceDiscount">{discount}</div>
                </div>

                <div className="productDisplayRightDetails">
                    <p>This is a high-quality product that meets all your fashion needs. Perfect for any occasion, it combines style and comfort effortlessly.</p>
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
                <button>ADD TO CART</button>
                <div className='productDisplayRightCategory'>Category: {category}</div>
                {isExclusive && <div className='productDisplayRightExclusive'>WEB EXCLUSIVE</div>}
            </div>
        </div>
    );
}

export default ProductDisplay