import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllShops } from "../../redux/shopsSlice/shopsSelector";
import { fetchAllShops } from "../../redux/shopsSlice/shopsOperations";
import { fetchProducts } from "../../redux/products/productsOperations";
import { selectProducts } from "../../redux/products/productsSelector";

import styles from "./Shops.module.css";
import { deleteProducts, setProducts, setShop } from "../../redux/orders/ordersSlice";
import { orderProduct } from "../../redux/orders/ordersSelector";

const Shops = () => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [takedProduct, setTakedProduct] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllShops());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(selectedShop));
  }, [selectedShop]);

  const shops = useSelector(selectAllShops);

  const shopItem = shops.map((shop) => {
    return (
      <li key={shop._id}>
        <button
          className={styles.buttonShop}
          onClick={() => {
            dispatch(setShop(shop.name));
            setSelectedShop(shop._id);
          }}
        >
          {shop.name}
        </button>
      </li>
    );
  });

  const products = useSelector(selectProducts);
  const orProd = useSelector(orderProduct);
  console.log("order:",orProd);

  const handlTakeProd = (data) => {
    dispatch(setProducts(data));
    setTakedProduct([...takedProduct, data._id]);
  };

    const handlDeleteProd = (data) => {
      dispatch(deleteProducts(data))
    takedProduct.splice(takedProduct.indexOf(data._id), 1);
    setTakedProduct(takedProduct.filter(item => item._id !== data._id));
  };

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

        <p className={styles.productP}>{product.nameProduct}</p>
        <p className={styles.productP}>Price: {product.price} $</p>
        {takedProduct.includes(product._id) ? (
          <button
            className={styles.productBtn}
            onClick={() => handlDeleteProd(product)}
          >
            Delete
          </button>
        ) : (
          <button
            className={styles.productBtn}
            onClick={() => {
              handlTakeProd(product);
            }}
          >
            Add
          </button>
        )}
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.containerShop}>
        <p>Shops:</p>
        {shopItem && takedProduct.length === 0 && (
          <ul className={styles.shopUl}>{shopItem}</ul>
        )}
        {takedProduct.length === 0 || <p>You are select shop</p>}
      </div>
      <div className={styles.containerProduct}>
        <p>Products:</p>
        {products && <ul className={styles.productUl}>{productItems}</ul>}
      </div>
    </div>
  );
};

export default Shops;
