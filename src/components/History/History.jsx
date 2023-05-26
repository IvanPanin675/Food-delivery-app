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
        const data = await getAllOrders("jovanni.94.van@gmail.com");
        setAllOrders([...data.data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const orderItems = allOrders.map((order) => (
    <li>
      <ul>
        {order.products.map((product) => (
          <li>
            <div
              className={styles.imgP}
              style={{
                backgroundImage: `url(${product.imgProd})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </li>
        ))}
      </ul>
      <div><p>{order.priceAll}</p></div>
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
      <div className={styles.containerOrders}>
        <ul>{orderItems}</ul>
      </div>
    </div>
  );
};

export default History;
