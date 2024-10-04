import { Product } from "../types/types";

import p1_img from "./productImages/long-sleeve-plain-shirt.png";
import p2_img from "./productImages/lace-trim-bow-accent-cami.png";
import p3_img from "./productImages/long-sleeve-ribbed-knit-top.png";
import p4_img from "./productImages/high-waist-wide-leg-suit-pants.png";
import p5_img from "./productImages/satin-long-mermaid-skirt.png";
import p6_img from "./productImages/high-waist-wide-leg-jeans.png";
import p7_img from "./productImages/corduroy-loose-fit-crop-jacket.png";
import p8_img from "./productImages/oversized-blazer.png";

let bestsellers_products : Product[] = [
  {
    id: 1,
    category: "tops",
    image: p1_img,
    name: 'Long-Sleeve Plain Shirt',
    price: 13.60,
    isExclusive: true,
  },
  {
    id: 2,
    category: "tops",
    image: p2_img,
    name: 'Lace Bow Accent Crop Cami Top',
    price: 9.49,
    isExclusive: false,
  },
  {
    id: 3,
    category: "tops",
    image: p3_img,
    name: 'Long-Sleeve Ribbed Knit Top',
    price: 18.99,
    isExclusive: false,
  },
  {
    id: 4,
    category: "bottoms",
    image: p4_img,
    name: 'High-Waist Wide-Leg Suit Pants',
    price: 12.59,
    isExclusive: false,
  },
  {
    id: 5,
    category: "bottoms",
    image: p5_img,
    name: 'Satin Long Mermaid Skirt',
    price: 25.49,
    isExclusive: true,
  },
  {
    id: 6,
    category: "bottoms",
    image: p6_img,
    name: 'High-Waist Wide-Leg Jeans',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    id: 7,
    category: "outerwear",
    image: p7_img,
    name: 'Corduroy Loose-Fit Crop Jacket',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    id: 8,
    category: "outerwear",
    image: p8_img,
    name: 'Oversized Blazer',
    price: 24.49,
    isExclusive: true,
  },
];

export default bestsellers_products;