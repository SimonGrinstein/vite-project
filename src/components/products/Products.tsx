import { useEffect, useState } from 'react';
import styles from './products.module.css';
import ShopProduct from "../shopProduct/ShopProduct";


export default function Products() {

  interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number,
      count: number;
    };
  }

  const [products, setProducts] = useState<IProduct[]>([]);


  // * асинхронный запрос на сервер
  const getProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className={styles.shopContainer}>
        {products.map(el => (
         <ShopProduct key={el.id} price={el.price} id={el.id} title={el.title} image={el.image} />
        ))}
      </div>
    </div>
  );
}