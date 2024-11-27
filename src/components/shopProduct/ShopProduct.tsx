import { Link } from "react-router-dom";
import MyButton from "../myButton/MyButton";
import styles from "./shopProduct.module.css";

interface IShopProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function ShopProduct({
  id,
  title,
  image,
  price,
}: IShopProductProps) {
  return (
    <div className={styles.shopContainerCard} key={id}>
      <h3>{title}</h3>
      <div className={styles.imgWrapper}>
        <Link to={String(id)}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div>{price}</div>
      <div>
        <Link to={String(id)}>
          <MyButton text="To product" />
        </Link>
      </div>
    </div>
  );
}
