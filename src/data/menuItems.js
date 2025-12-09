// Import product images from assets
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
import colaAndPineappleCubes from '../../assets/Selection of sweets comming soon stockleys cola cubes, pinapple cubes £1.49 per 100g  .jpeg'
import rhubarbAndCustard from '../../assets/Rhubarb and custard .jpeg'
import custardLollies from '../../assets/custard lollies 0.30 each.jpeg'
import toffeeCrumble from '../../assets/Original Toffe crumble 1.49 100g.jpg'
import chocolateLick from '../../assets/Chocolate lick original.jpg'
import aniseedBalls from '../../assets/Aniseed balls.webp'

export const menuItems = [
  // Drinks
  {
    id: 1,
    name: 'Vimto',
    category: 'Drinks',
    subcategory: 'Soft Drinks',
    size: '330ml',
    price: 1.65,
    description: 'Classic British soft drink',
    rating: 4.8,
    image: vimto
  },

  // Groceries
  {
    id: 2,
    name: 'Branston Beans',
    category: 'Groceries',
    subcategory: 'Canned Goods',
    size: '410g',
    price: 1.00,
    description: 'Classic British baked beans',
    rating: 4.6,
    image: branston
  },

  // Dairy
  {
    id: 3,
    name: 'Lakeland Butter',
    category: 'Dairy',
    subcategory: 'Butter',
    size: '250g',
    price: 2.60,
    description: 'Premium quality butter',
    rating: 4.7,
    image: butter
  },

  // Confectionery
  {
    id: 4,
    name: 'Maltesers Milk Chocolate',
    category: 'Confectionery',
    subcategory: 'Chocolate',
    size: 'Standard',
    price: 3.89,
    description: 'Light and bubbly chocolate',
    rating: 4.9,
    image: maltesers
  },
  {
    id: 5,
    name: 'Cadbury Creme Egg Chocolate Easter Egg',
    category: 'Confectionery',
    subcategory: 'Chocolate',
    size: '195g',
    price: 7.49,
    description: 'Delicious Easter chocolate egg',
    rating: 4.7,
    image: cremeEgg
  },

  // Baking
  {
    id: 6,
    name: 'Jacks Self Raising Flour',
    category: 'Baking',
    subcategory: 'Flour',
    size: '1kg',
    price: 0.99,
    description: 'Perfect for baking cakes and pastries',
    rating: 4.5,
    image: selfRaisingFlour
  },
  {
    id: 7,
    name: 'Jacks Plain Flour',
    category: 'Baking',
    subcategory: 'Flour',
    size: '1kg',
    price: 0.99,
    description: 'Versatile all-purpose flour',
    rating: 4.5,
    image: plainFlour
  },
  {
    id: 8,
    name: 'Sugar',
    category: 'Baking',
    subcategory: 'Sugar',
    size: '1kg',
    price: 1.30,
    description: 'Granulated white sugar',
    rating: 4.4,
    image: sugar
  },

  // Pet Food
  {
    id: 9,
    name: 'Whiskas Adult Wet Cat Food',
    category: 'Pet Food',
    subcategory: 'Cat Food',
    size: '400g',
    price: 1.40,
    description: 'Chicken in jelly - Complete cat food',
    rating: 4.8,
    image: whiskas
  },

  // Frozen
  {
    id: 10,
    name: 'Strawberry Cones',
    category: 'Frozen',
    subcategory: 'Ice Cream',
    size: 'x4',
    price: 1.89,
    description: 'Delicious strawberry ice cream cones',
    rating: 4.6,
    image: strawberryCones
  },

  // Sweets
  {
    id: 11,
    name: 'Stockleys Cola & Pineapple Cubes',
    category: 'Sweets',
    subcategory: 'Traditional Sweets',
    size: '100g',
    price: 1.49,
    description: 'Classic British sweets',
    rating: 4.7,
    badge: 'Coming Soon',
    image: colaAndPineappleCubes
  },
  {
    id: 12,
    name: 'Rhubarb and Custard',
    category: 'Sweets',
    subcategory: 'Traditional Sweets',
    size: '100g',
    price: 1.49,
    description: 'Traditional British favourite',
    rating: 4.6,
    image: rhubarbAndCustard
  },
  {
    id: 13,
    name: 'Rhubarb and Custard Lollies',
    category: 'Sweets',
    subcategory: 'Traditional Sweets',
    size: 'Each',
    price: 0.30,
    description: 'Sweet and tangy lollies',
    rating: 4.5,
    image: custardLollies
  },
  {
    id: 14,
    name: 'Original Toffee Crumble',
    category: 'Sweets',
    subcategory: 'Traditional Sweets',
    size: '100g',
    price: 1.49,
    description: 'Crunchy toffee pieces',
    rating: 4.8,
    image: toffeeCrumble
  },
  {
    id: 15,
    name: 'Chocolate Lick Original',
    category: 'Sweets',
    subcategory: 'Traditional Sweets',
    size: '110g',
    price: 1.49,
    description: 'Chocolate flavoured sweets',
    rating: 4.7,
    image: chocolateLick
  },
  {
    id: 16,
    name: 'Aniseed Balls',
    category: 'Sweets',
    subcategory: 'Traditional Sweets',
    size: '100g',
    price: 1.49,
    description: 'Classic aniseed flavour',
    rating: 4.6,
    image: aniseedBalls
  }
]

export const categories = ['All', 'Drinks', 'Groceries', 'Dairy', 'Confectionery', 'Baking', 'Pet Food', 'Frozen', 'Sweets']
