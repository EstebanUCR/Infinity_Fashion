import { Product } from "../types/types";

import p1_img from "./productImages/fitted-tee-bodysuit.jpg";
import p1_img1 from "./productImages/fitted-tee-bodysuit-1.jpg";
import p1_img2 from "./productImages/fitted-tee-bodysuit-2.jpg";
import p1_img3 from "./productImages/fitted-tee-bodysuit-3.jpg";
import p2_img from "./productImages/crinkled-tie-sleeve-shirt.jpg";
import p2_img1 from "./productImages/crinkled-tie-sleeve-shirt-1.jpg";
import p2_img2 from "./productImages/crinkled-tie-sleeve-shirt-2.jpg";
import p2_img3 from "./productImages/crinkled-tie-sleeve-shirt-3.jpg";
import p3_img from "./productImages/knit-srap-crop-top.jpg";
import p3_img1 from "./productImages/knit-srap-crop-top-1.jpg";
import p3_img2 from "./productImages/knit-srap-crop-top-2.jpg";
import p3_img3 from "./productImages/knit-srap-crop-top-3.jpg";
import p4_img from "./productImages/velour-wide-leg-pants.jpg";
import p4_img1 from "./productImages/velour-wide-leg-pants-1.jpg";
import p4_img2 from "./productImages/velour-wide-leg-pants-2.jpg";
import p4_img3 from "./productImages/velour-wide-leg-pants-3.jpg";
import p5_img from "./productImages/satin-slip-midi-skirt.jpg";
import p5_img1 from "./productImages/satin-slip-midi-skirt-1.jpg";
import p5_img2 from "./productImages/satin-slip-midi-skirt-2.jpg";
import p5_img3 from "./productImages/satin-slip-midi-skirt-3.jpg";
import p6_img from "./productImages/corduroy-flare-pants.jpg";
import p6_img1 from "./productImages/corduroy-flare-pants-1.jpg";
import p6_img2 from "./productImages/corduroy-flare-pants-2.jpg";
import p6_img3 from "./productImages/corduroy-flare-pants-3.jpg";
import p7_img from "./productImages/dolman-sleeve-sweater.jpg";
import p7_img1 from "./productImages/dolman-sleeve-sweater-1.jpg";
import p7_img2 from "./productImages/dolman-sleeve-sweater-2.jpg";
import p7_img3 from "./productImages/dolman-sleeve-sweater-3.jpg";
import p8_img from "./productImages/double-breasted-blazer.jpg";
import p8_img1 from "./productImages/double-breasted-blazer-1.jpg";
import p8_img2 from "./productImages/double-breasted-blazer-2.jpg";
import p8_img3 from "./productImages/double-breasted-blazer-3.jpg";

let bestsellers_products : Product[] = [
  {
    id: 1,
    category: "tops",
    image: [p1_img, p1_img1, p1_img2, p1_img3],
    name: 'Fitted Tee Bodysuit',
    price: 13.60,
    isExclusive: true,
    description: 'A plain fitted shirt perfect for any occassion.',
  },
  {
    id: 2,
    category: "tops",
    image: [p2_img, p2_img1, p2_img2, p2_img3],
    name: 'Crinkled Tie-Sleeve Shirt',
    price: 9.49,
    isExclusive: false,
    description: 'This fashionably crinckled shirt is casual yet elegant.',
  },
  {
    id: 3,
    category: "tops",
    image: [p3_img, p3_img1, p3_img2, p3_img3],
    name: 'Knit Strap Crop Top',
    price: 18.99,
    isExclusive: false,
    description: 'This high-quality crop top is perfect for a romantic outing.',
  },
  {
    id: 4,
    category: "bottoms",
    image: [p4_img, p4_img1, p4_img2, p4_img3],
    name: 'Velour Wide-Leg Pants',
    price: 12.59,
    isExclusive: false,
    description: 'A pair of pants ideal for everyday wear.',
  },
  {
    id: 5,
    category: "bottoms",
    image: [p5_img, p5_img1, p5_img2, p5_img3],
    name: 'Satin-Slip Midi Skirt',
    price: 25.49,
    isExclusive: true,
    description: 'This elegant midi skirt exudes an elegant and classy air.',
  },
  {
    id: 6,
    category: "bottoms",
    image: [p6_img, p6_img1, p6_img2, p6_img3],
    name: 'Corduroy Flare Pants',
    price: 17.49,
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
    description: 'A sturdy pair of pants that pair well with anything.',
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
  {
    id: 8,
    category: "outerwear",
    image: [p8_img, p8_img1, p8_img2, p8_img3],
    name: 'Double-Breasted Blazer',
    price: 24.49,
    isExclusive: true,
    description: 'A blazer ideal for a casual business look.',
  },
];

export default bestsellers_products;