import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllShops } from "../../redux/shopsSlice/shopsSelector";
import { fetchAllShops } from "../../redux/shopsSlice/shopsOperations";
import { fetchProducts } from "../../redux/products/productsOperations";
import { selectProducts } from "../../redux/products/productsSelector";

import styles from "./ShoppingCart.module.css";
import {
  deleteProducts,
  setProductQuantity,
  setProducts,
  setShop,
} from "../../redux/orders/ordersSlice";
import { orderProduct } from "../../redux/orders/ordersSelector";
import { useNavigate } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector(orderProduct);

  const [products, setProducts] = useState([]);
  console.log(products)

  useEffect(() => {
    if (order.products.length === 0) {
      navigate("/shop");
    }
    setProducts(order.products);
  }, [order]);

  // const [quantity, setQuantity] = useState(1);

  const handleChange = (e, data) => {
    dispatch(setProductQuantity({ quantity: Number(e.target.value) , _id:data }))

  }

  const productItems = products.map((product) => {
    return (
      <li className={styles.productLi} key={product._id}>
        <div
          className={styles.imgP}
          style={{
            backgroundImage: `url(${product.imgProd})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className={styles.divProductAndQuantity}>
          <p className={styles.productP}>{product.nameProduct}</p>
          <p className={styles.productP}>Price: {product.price} $</p>
          <label>
            Quantity: {product.quantity}
            <input
              type="range"
              name="quantity"
              min="1"
              max="10"
              value={product.quantity}
              step="1"
              onChange={(e)=>handleChange(e,product._id)}
            />
            <p className={styles.productP}>Price for {product.quantity} products: {product.price * product.quantity} $</p>
          </label>
        </div>
      </li>
    );
  });

  return (
    <form className={styles.container}>
      <div className={styles.containerShop}>
        <div></div>
        <ul className={styles.productUl}>
          <li className={styles.formLi}>
            <label className={styles.formLabel}>
              Address:
              <input className={styles.formInput} type="text" name="address" placeholder="Address" />
            </label>
          </li>
          <li className={styles.formLi}>
            <label className={styles.formLabel}>
              Email:
              <input className={styles.formInput} type="text" name="email" placeholder="User email" />
            </label>
          </li>
          <li className={styles.formLi}>
            <label className={styles.formLabel}>
              Phone:
              <input className={styles.formInput} type="text" name="phone" placeholder="Phone" />
            </label>
          </li>
          <li className={styles.formLi}>
            <label className={styles.formLabel}>
              Name:
              <input className={styles.formInput} type="text" name="user" placeholder="Name" />
            </label>
          </li>
        </ul>
      </div>
      <div className={styles.containerProductAndSubmit}>
        <div className={styles.containerProduct}>
          <ul className={styles.productUl}>{productItems}</ul>
        </div>
        <div>
          <p>Total price:</p>
          <button>Captcha</button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default ShoppingCart;
