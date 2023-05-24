import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllShops } from "../../redux/shopsSlice/shopsSelector";
import { fetchAllShops } from "../../redux/shopsSlice/shopsOperations";
import { fetchProducts } from "../../redux/products/productsOperations";
import { selectProducts } from "../../redux/products/productsSelector";

import styles from "./Shops.module.css"

const Shops = () => {
  const [selectedShop, setSelectedShop] = useState(null);

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
        <button className={styles.buttonShop}
          onClick={() => {
            setSelectedShop(shop._id);
          }}
        >
          {shop.name}
        </button>
      </li>
    );
  });

  const products = useSelector(selectProducts);

  const productItems = products.map((product) => {
    return (
        <li className={styles.productLi} key={product._id}>
        <div className={styles.imgP} style={{backgroundImage: `url(${product.imgProd})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></div>

        <p className={styles.productP}>{product.nameProduct}</p>
        <p className={styles.productP}>{product.price}</p>
        <button className={styles.productBtn}>Add</button>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.containerShop}>
        <p>Shops:</p>
        {shopItem && <ul className={styles.shopUl}>{shopItem}</ul>}
      </div>
      <div className={styles.containerProduct}>
        <p>Products:</p>
        {products && <ul className={styles.productUl}>{productItems}</ul>}
      </div>
    </div>
  );
};

export default Shops;
