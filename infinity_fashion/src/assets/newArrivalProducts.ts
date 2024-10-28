import { Product } from "../types/types";

import p7_img from "./productImages/dolman-sleeve-sweater.jpg";
import p7_img1 from "./productImages/dolman-sleeve-sweater-1.jpg";
import p7_img2 from "./productImages/dolman-sleeve-sweater-2.jpg";
import p7_img3 from "./productImages/dolman-sleeve-sweater-3.jpg";
import p9_img from "./productImages/open-front-cardigan.jpg";
import p9_img1 from "./productImages/open-front-cardigan-1.jpg";
import p9_img2 from "./productImages/open-front-cardigan-2.jpg";
import p9_img3 from "./productImages/open-front-cardigan-3.jpg";
import p10_img from "./productImages/pearl-bow-pendant-necklace.jpg";
import p10_img1 from "./productImages/pearl-bow-pendant-necklace-1.jpg";
import p10_img2 from "./productImages/pearl-bow-pendant-necklace-2.jpg";
import p10_img3 from "./productImages/pearl-bow-pendant-necklace-3.jpg";
import p11_img from "./productImages/rhinestone-hoop-earrings.jpg";
import p11_img1 from "./productImages/rhinestone-hoop-earrings-1.jpg";
import p11_img2 from "./productImages/rhinestone-hoop-earrings-2.jpg";
import p11_img3 from "./productImages/rhinestone-hoop-earrings-3.jpg";
import p12_img from "./productImages/wrap-hinge-bracelet.jpg";
import p12_img1 from "./productImages/wrap-hinge-bracelet-1.jpg";
import p12_img2 from "./productImages/wrap-hinge-bracelet-2.jpg";
import p12_img3 from "./productImages/wrap-hinge-bracelet-3.jpg";
import p13_img from "./productImages/suede-stiletto-boots.jpg";
import p13_img1 from "./productImages/suede-stiletto-boots-1.jpg";
import p13_img2 from "./productImages/suede-stiletto-boots-2.jpg";
import p13_img3 from "./productImages/suede-stiletto-boots-3.jpg";
import p14_img from "./productImages/mary-jane-pumps.jpg";
import p14_img1 from "./productImages/mary-jane-pumps-1.jpg";
import p14_img2 from "./productImages/mary-jane-pumps-2.jpg";
import p14_img3 from "./productImages/mary-jane-pumps-3.jpg";
import p15_img from "./productImages/chelsea-ankle-boots.jpg";
import p15_img1 from "./productImages/chelsea-ankle-boots-1.jpg";
import p15_img2 from "./productImages/chelsea-ankle-boots-2.jpg";
import p15_img3 from "./productImages/chelsea-ankle-boots-3.jpg";

let newArrivals_products : Product[] = [
  {
    id: 9,
    category: "outerwear",
    image: [p9_img, p9_img1, p9_img2, p9_img3],
    name: 'Open-Front Knit Cardigan',
    price: 17.99,
    isExclusive: false,
    description: 'This cute cardigan is made of the softest materials.',
  },
  {
    id: 10,
    category: "accessories",
    image: [p10_img, p10_img1, p10_img2, p10_img3],
    name: 'Pearl Bow-Pendant Necklace',
    price: 24.50,
    isExclusive: false,
    description: 'A delicate and simple necklace with an eye-catching bow charm.',
  },
  {
    id: 11,
    category: "accessories",
    image: [p11_img, p11_img1, p11_img2, p11_img3],
    name: 'Rhinestone Hoop Earrings',
    price: 21.60,
    oldPrice: '$27.00',
    discount: '20% OFF',
    isExclusive: false,
    description: 'These hoop earrings make the perfect statement piece.',
  },
  {
    id: 12,
    category: "accessories",
    image: [p12_img, p12_img1, p12_img2, p12_img3],
    name: 'Wrap Hinge Bracelet',
    price: 26.00,
    isExclusive: true,
    description: 'This gorgeous bracelet pairs well with any look.',
  },
  {
    id: 13,
    category: "shoes",
    image: [p13_img, p13_img1, p13_img2, p13_img3],
    name: 'Suede Stiletto Boots',
    price: 29.49,
    isExclusive: true,
    description: 'These boots offer a sturdy, classic look.',
  },
  {
    id: 14,
    category: "shoes",
    image: [p14_img, p14_img1, p14_img2, p14_img3],
    name: 'Mary Jane Pumps',
    price: 17.49,
    isExclusive: true,
    description: 'Casual shoes that are perfect for everyday wear.',
  },
  {
    id: 15,
    category: "shoes",
    image: [p15_img, p15_img1, p15_img2, p15_img3],
    name: 'Chelsea Ankle Boots',
    price: 25.99,
    isExclusive: false,
    description: 'Comfortable and elegant, these shoes are a great addition to your closet.',
  },
  {
    id: 7,
    category: "outerwear",
    image: [p7_img, p7_img1, p7_img2, p7_img3],
    name: 'Dolman Sleeve Sweater',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
    description: 'This comfortable sweater is the perfect addition to your closet.',
  },
];

export default newArrivals_products;