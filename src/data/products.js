import vimto from '../../assets/Vimto.png'
import branston from '../../assets/branston.avif'
import butter from '../../assets/lakeland butter.webp'
import maltesers from '../../assets/Maltesers Milk Chocolate.jpeg'
import cremeEgg from '../../assets/Cadbury Creme Egg Chocolate Easter Egg 195g.jpg'
import selfRaisingFlour from '../../assets/Jacks self raising flour 1kg.webp'
import plainFlour from '../../assets/Jacks flour plain 1kg.webp'
import sugar from '../../assets/Sugar.avif'
import whiskas from '../../assets/Whiskas adult wet cat food chicken in jelly 400g.jpeg'
import strawberryCones from '../../assets/Strawberry cones x4.png'
// New Sweet Products
import colaAndPineappleCubes from '../../assets/Selection of sweets comming soon stockleys cola cubes, pinapple cubes £1.49 per 100g  .jpeg'
import rhubarbAndCustard from '../../assets/Rhubarb and custard .jpeg'
import custardLollies from '../../assets/custard lollies 0.30 each.jpeg'
import toffeeCrumble from '../../assets/Original Toffe crumble 1.49 100g.jpg'
import chocolateLick from '../../assets/Chocolate lick original.jpg'
import aniseedBalls from '../../assets/Aniseed balls.webp'

export const products = [
  {
    id: 1,
    name: 'Vimto',
    price: 1.65,
    image: vimto,
    category: 'Drinks',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Branston Beans',
    price: 1.00,
    image: branston,
    category: 'Groceries',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Lakeland Butter',
    price: 2.60,
    image: butter,
    category: 'Dairy',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Maltesers Milk Chocolate',
    price: 3.89,
    image: maltesers,
    category: 'Confectionery',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Cadbury Creme Egg Chocolate Easter Egg 195g',
    price: 7.49,
    image: cremeEgg,
    category: 'Confectionery',
    rating: 4.7
  },
  {
    id: 6,
    name: 'Jacks Self Raising Flour 1kg',
    price: 0.99,
    image: selfRaisingFlour,
    category: 'Baking',
    rating: 4.5
  },
  {
    id: 7,
    name: 'Jacks Plain Flour 1kg',
    price: 0.99,
    image: plainFlour,
    category: 'Baking',
    rating: 4.5
  },
  {
    id: 8,
    name: 'Sugar 1kg',
    price: 1.30,
    image: sugar,
    category: 'Baking',
    rating: 4.4
  },
  {
    id: 9,
    name: 'Whiskas Adult Wet Cat Food (Chicken in Jelly) 400g',
    price: 1.40,
    image: whiskas,
    category: 'Pet Food',
    rating: 4.8
  },
  {
    id: 10,
    name: 'Strawberry Cones x4',
    price: 1.89,
    image: strawberryCones,
    category: 'Frozen',
    rating: 4.6
  },
  {
    id: 11,
    name: 'Stockleys Cola & Pineapple Cubes',
    price: 1.49,
    image: colaAndPineappleCubes,
    category: 'Sweets',
    rating: 4.7,
    unit: 'per 100g',
    badge: 'Coming Soon',
    whatsapp: true
  },
  {
    id: 12,
    name: 'Rhubarb and Custard',
    price: 1.49,
    image: rhubarbAndCustard,
    category: 'Sweets',
    rating: 4.6,
    unit: 'per 100g'
  },
  {
    id: 13,
    name: 'Rhubarb and Custard Lollies',
    price: 0.30,
    image: custardLollies,
    category: 'Sweets',
    rating: 4.5,
    unit: 'each'
  },
  {
    id: 14,
    name: 'Original Toffee Crumble',
    price: 1.49,
    image: toffeeCrumble,
    category: 'Sweets',
    rating: 4.8,
    unit: 'per 100g'
  },
  {
    id: 15,
    name: 'Chocolate Lick Original',
    price: 1.49,
    image: chocolateLick,
    category: 'Sweets',
    rating: 4.7,
    unit: 'per 100g'
  },
  {
    id: 16,
    name: 'Aniseed Balls',
    price: 1.49,
    image: aniseedBalls,
    category: 'Sweets',
    rating: 4.6,
    unit: 'per 100g'
  }
]
