import { useEffect, useState } from "react";
import styles from "./History.module.css";
import { getAllOrders } from "../../services/API";

const History = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const onHandleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // let search = undefined
        if (email && phone) {
          const data = await getAllOrders({
            owner: email,
            customerPhone: phone,
          });
          setAllOrders([...data.data]);
        }
        if (email && !phone) {
          const data = await getAllOrders({
            owner: email
          });
          setAllOrders([...data.data]);
        }
        if (!email && phone) {
          const data = await getAllOrders({
            customerPhone: phone
          });
          setAllOrders([...data.data]);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [email, phone]);

  const orderItems = allOrders.map((order) => (
    <li className={styles.orderLi} key={order._id}>
      <ul className={styles.productsContainerOrder}>
        {order.products.map((product) => (
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
            <div className={styles.divProduct}>
              <p>{product.nameProduct}</p>
              <p>Price: {product.price}</p>
              <p>
                Price for {product.quantity} pcs becomes{" "}
                {product.quantity * product.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.divOrder}>
        <p>Shop: {order.shop}</p>
        <p>Total price: {order.priceAll} $</p>
        <p>about {order.products.length} products</p>
      </div>
    </li>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.containerShop}>
        <ul className={styles.formUl}>
          <li className={styles.formLi}>
            <label className={styles.formLabel}>
              Email:
              <input
                className={styles.formInput}
                type="text"
                name="email"
                placeholder="User email"
                value={email}
                onChange={onHandleChange}
                required
              />
            </label>
          </li>
          <li className={styles.formLi}>
            <label className={styles.formLabel}>
              Phone:
              <input
                className={styles.formInput}
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={onHandleChange}
                required
              />
            </label>
          </li>
        </ul>
      </div>

      {loading || <ul className={styles.containerOrders}>{orderItems}</ul>}
    </div>
  );
};

export default History;
