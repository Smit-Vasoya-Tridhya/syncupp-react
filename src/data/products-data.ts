export type ProductType = {
  id: string;
  name: string;
  category: string;
  image: string;
  sku: string;
  stock: number;
  price: string;
  status: string;
  rating: number[];
};

export const productsData = [
 
  {
    id: '0o02602714',
    name: 'Licensed Concrete Cheese',
    category: 'Electronics',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp',
    sku: '86229',
    stock: 0,
    price: '853.00',
    status: 'Pending',
    rating: [3, 2],
  },
  {
    id: '0o54011366',
    name: 'Electronic Rubber Table',
    category: 'Books',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp',
    sku: '89762',
    stock: 18,
    price: '881.00',
    status: 'Publish',
    rating: [3, 4, 5],
  },
  {
    id: '0o24033230',
    name: 'Gorgeous Bronze Gloves',
    category: 'Shoes',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/16.webp',
    sku: '21065',
    stock: 9,
    price: '124.00',
    status: 'Pending',
    rating: [5, 5, 4, 3, 2],
  },
  
];
