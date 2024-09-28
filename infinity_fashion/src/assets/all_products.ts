import { Product } from "../types/types";

import p1_img from "./productImages/long-sleeve-plain-shirt.png";
import p2_img from "./productImages/lace-trim-bow-accent-cami.png";
import p3_img from "./productImages/long-sleeve-ribbed-knit-top.png";
import p4_img from "./productImages/high-waist-wide-leg-suit-pants.png";
import p5_img from "./productImages/satin-long-mermaid-skirt.png";
import p6_img from "./productImages/high-waist-wide-leg-jeans.png";
import p7_img from "./productImages/corduroy-loose-fit-crop-jacket.png";
import p8_img from "./productImages/oversized-blazer.png";
import p9_img from "./productImages/open-front-eyelet-knit-cardigan.png";
import p10_img from "./productImages/starfish-stud-earrings.png";
import p11_img from "./productImages/carnelian-stone-heart-necklace.png";
import p12_img from "./productImages/sparkle-clover-bracelet.png";
import p13_img from "./productImages/platform-lace-up-oxford-shoes.png";
import p14_img from "./productImages/casual-shoes-with-buckle-closure.png";
import p15_img from "./productImages/black-loafers.png";


export const all_products : Product[] = [
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
    name: 'Lace/Trim Bow Accent Crop Cami Top',
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
  {
    id: 9,
    category: "outerwear",
    image: p9_img,
    name: 'Open-Front Eyelet-Knit Cardigan',
    price: 17.99,
    isExclusive: false,
  },
  {
    id: 10,
    category: "accessories",
    image: p10_img,
    name: 'Starfish Stud Earrings',
    price: 24.00,
    isExclusive: false,
  },
  {
    id: 11,
    category: "accessories",
    image: p11_img,
    name: 'Carnelian Stone Heart Necklace',
    price: 21.60,
    oldPrice: '$27.00',
    discount: '20% OFF',
    isExclusive: false,
  },
  {
    id: 12,
    category: "accessories",
    image: p12_img,
    name: 'Sparkle Clover Bracelet',
    price: 26.00,
    isExclusive: true,
  },
  {
    id: 13,
    category: "shoes",
    image: p13_img,
    name: 'Platform Lace-Up Oxford Shoes',
    price: 29.49,
    isExclusive: true,
  },
  {
    id: 14,
    category: "shoes",
    image: p14_img,
    name: 'Casual Shoes with Buckle Closure',
    price: 17.49,
    isExclusive: true,
  },
  {
    id: 15,
    category: "shoes",
    image: p15_img,
    name: 'Black Loafers',
    price: 25.99,
    isExclusive: false,
  },
  {
    id: 16,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Fleece Drawstring Sweatshorts',
    price: 12.59,
    isExclusive: false,
  },
  {
    id: 17,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Striped Twill Pleated Mini Skirt',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    id: 18,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'High-Rise Corduroy Flare Pants',
    price: 24.49,
    isExclusive: true,
  },
  {
    id: 19,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Ribbed Knit Crop Top',
    price: 10.99,
    isExclusive: false,
  },
  {
    id: 20,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Printed Wrap Skirt',
    price: 15.49,
    isExclusive: false,
  },
  {
    id: 21,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Plaid Pleated Skirt',
    price: 18.99,
    isExclusive: false,
  },
  {
    id: 22,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Mesh Insert Bodycon Dress',
    price: 22.49,
    oldPrice: '$29.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    id: 23,
    category: "bottoms",
    image: 'https://via.placeholder.com/200',
    name: 'Leopard-Trim Flare Leg',
    price: 17.49,
    isExclusive: true,
  },
  {
    id: 24,
    category: "tops",
    image: 'https://via.placeholder.com/200',
    name: 'Leopard Print Flare Pants',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    id: 25,
    category: "outerwear",
    image: 'https://via.placeholder.com/200',
    name: 'Jacquard Baroque Mini Skirt',
    price: 13.99,
    isExclusive: false,
  },
];