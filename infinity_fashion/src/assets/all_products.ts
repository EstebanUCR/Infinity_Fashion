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
import p16_img from "./productImages/long-sleeve-henley-t-shirt.png";
import p17_img from "./productImages/balloon-sleeve-mandarin-collar-blouse.png";
import p18_img from "./productImages/casual-pants.png";
import p19_img from "./productImages/satin-maxi-skirt.png";
import p20_img from "./productImages/herringbone-coat.png";
import p21_img from "./productImages/double-breasted-trench-coat.png";
import p22_img from "./productImages/infinity-choker.png";
import p23_img from "./productImages/ribbon-ring.png";
import p24_img from "./productImages/pointed-toe-heels.png";
import p25_img from "./productImages/flat-sandals.png";


export const all_products : Product[] = [
  {
    id: 1,
    category: "tops",
    image: p1_img,
    name: 'Long-Sleeve Plain Shirt',
    price: 13.60,
    isExclusive: true,
    description: 'A plain long-sleeve shirt perfect for any occassion.',
  },
  {
    id: 2,
    category: "tops",
    image: p2_img,
    name: 'Lace/Trim Bow Accent Crop Cami',
    price: 9.49,
    isExclusive: false,
    description: 'This crop cami top is cute yet elegant.',
  },
  {
    id: 3,
    category: "tops",
    image: p3_img,
    name: 'Long-Sleeve Ribbed Knit Top',
    price: 18.99,
    isExclusive: false,
    description: 'This high-quality knit top is perfect for colder weather.',
  },
  {
    id: 4,
    category: "bottoms",
    image: p4_img,
    name: 'High-Waist Wide-Leg Suit Pants',
    price: 12.59,
    isExclusive: false,
    description: 'A pair of suit pants ideal for everyday wear.',
  },
  {
    id: 5,
    category: "bottoms",
    image: p5_img,
    name: 'Satin Long Mermaid Skirt',
    price: 25.49,
    isExclusive: true,
    description: 'This elegant mermaid skirt exudes an elegant and romantic air.',
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
    description: 'A sturdy pair of jeans that pair well with anything.',
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
    description: 'This crop jacket is the perfect addition to your closet.',
  },
  {
    id: 8,
    category: "outerwear",
    image: p8_img,
    name: 'Oversized Blazer',
    price: 24.49,
    isExclusive: true,
    description: 'An oversized blazer ideal for a casual business look.',
  },
  {
    id: 9,
    category: "outerwear",
    image: p9_img,
    name: 'Open-Front Eyelet-Knit Cardigan',
    price: 17.99,
    isExclusive: false,
    description: 'This cute cardigan is made of the softest materials.',
  },
  {
    id: 10,
    category: "accessories",
    image: p10_img,
    name: 'Starfish Stud Earrings',
    price: 24.50,
    isExclusive: false,
    description: 'These starfish stud earrings make the perfect statement piece',
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
    description: 'A delicate and simple necklace with an eye-catching heart charm.',
  },
  {
    id: 12,
    category: "accessories",
    image: p12_img,
    name: 'Sparkle Clover Bracelet',
    price: 26.00,
    isExclusive: true,
    description: 'This gorgeous bracelet pairs well with any look.',
  },
  {
    id: 13,
    category: "shoes",
    image: p13_img,
    name: 'Platform Lace-Up Oxford Shoes',
    price: 29.49,
    isExclusive: true,
    description: 'These oxford shoes offer a sturdy, classic look.',
  },
  {
    id: 14,
    category: "shoes",
    image: p14_img,
    name: 'Casual Shoes with Buckle',
    price: 17.49,
    isExclusive: true,
    description: 'Casual shoes that are perfect for everyday wear.',
  },
  {
    id: 15,
    category: "shoes",
    image: p15_img,
    name: 'Black Loafers',
    price: 25.99,
    isExclusive: false,
    description: 'Comfortable and elegant, these shoes are a great addition to your closet.',
  },
  {
    id: 16,
    category: "tops",
    image: p16_img,
    name: 'Long-Sleeve Henley T-Shirt',
    price: 12.59,
    isExclusive: false,
    description: 'A casual t-shirt perfect for warmer weather.',
  },
  {
    id: 17,
    category: "tops",
    image: p17_img,
    name: 'Ballon-Sleeve Blouse',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
    description: 'An elegant blouse that combines style and comfort.',
  },
  {
    id: 18,
    category: "bottoms",
    image: p18_img,
    name: 'Casual Pants',
    price: 24.49,
    isExclusive: true,
    description: 'Casual, elegant pants that pair well with anything.',
  },
  {
    id: 19,
    category: "bottoms",
    image: p19_img,
    name: 'Satin Maxi Skirt',
    price: 10.99,
    isExclusive: false,
    description: 'A stylish, comfortable skirt perfect for any occassion.',
  },
  {
    id: 20,
    category: "outerwear",
    image: p20_img,
    name: 'Herringbone Coat',
    price: 15.49,
    isExclusive: false,
    description: 'A sturdy, fashionable coat that will keep you perfectly warm.',
  },
  {
    id: 21,
    category: "outerwear",
    image: p21_img,
    name: 'Double Breasted Trench Coat',
    price: 18.99,
    isExclusive: false,
    description: 'This trench coat offers a classic, elegant look.',
  },
  {
    id: 22,
    category: "accessories",
    image: p22_img,
    name: 'Infinity Choker',
    price: 22.49,
    oldPrice: '$29.99',
    discount: '30% OFF',
    isExclusive: true,
    description: 'A colorful statement piece that can elevate a simple outfit.',
  },
  {
    id: 23,
    category: "accessories",
    image: p23_img,
    name: 'Ribbon Ring',
    price: 17.49,
    isExclusive: true,
    description: 'A classy ring perfect for any occassion.',
  },
  {
    id: 24,
    category: "shoes",
    image: p24_img,
    name: 'Pointed-Toe Heels',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
    description: 'These beautiful heels offer a classy look.',
  },
  {
    id: 25,
    category: "shoes",
    image: p25_img,
    name: 'Flat Sandals',
    price: 13.99,
    isExclusive: false,
    description: 'Comfortable sandals perfect for everyday use.',
  },
];