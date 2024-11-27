import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./productPage.module.css";

export default function ProductPage() {

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

  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    title: 'string',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    }
  })

  const getProduct = (id: string) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  };


  useEffect(() => {
    getProduct(id as string);
  }, [id]);

 
  //console.log(product.title);

  return (
    <div className={styles.product}>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <img width={180} src={product.image} alt="" />
      <p>{product.price} €</p>
      <Link to={'../products'}>back to products</Link>
    </div>
  );
}