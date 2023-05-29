import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllShops } from "../../redux/shopsSlice/shopsSelector";
import { fetchAllShops } from "../../redux/shopsSlice/shopsOperations";
import { fetchProducts } from "../../redux/products/productsOperations";
import { selectProducts } from "../../redux/products/productsSelector";

import styles from "./Shops.module.css";
import {
  deleteProducts,
  setProducts,
  setProductsLocal,
  setShop,
} from "../../redux/orders/ordersSlice";
import { orderProduct } from "../../redux/orders/ordersSelector";

const Shops = () => {
  const dispatch = useDispatch();
  const [selectedShop, setSelectedShop] = useState(null);
  const [takedProduct, setTakedProduct] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("products") !== null &&
      localStorage.getItem("products").length !== 0
    ) {
      const localProduct = JSON.parse(localStorage.getItem("products"));
      const localSop = localStorage.getItem("shop");
      const localSopName = localStorage.getItem("shopName");
      dispatch(setProductsLocal(localProduct));
      dispatch(setShop(localSopName));

      setSelectedShop(localSop);
      setTakedProduct([...localProduct.map((oPro) => oPro._id)]);
    }
    if (shops.length === 0) {
      dispatch(fetchAllShops());
    }
    
  }, [dispatch]);
  const { products: oProducts } = useSelector(orderProduct);

  const shops = useSelector(selectAllShops);
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (oProducts.length === 0) {
      dispatch(fetchProducts(selectedShop));
    } else {
      dispatch(fetchProducts(selectedShop));
      setTakedProduct([...oProducts.map((oPro) => oPro._id)]);
    }
  }, [selectedShop, dispatch]);

  const shopItem = shops.map((shop) => {
    return (
      <li key={shop._id}>
        <button
          className={styles.buttonShop}
          onClick={() => {
            dispatch(setShop(shop.name));
            setSelectedShop(shop._id);
            localStorage.setItem("shop", shop._id);
          }}
        >
          {shop.name}
        </button>
      </li>
    );
  });

  const handlTakeProd = (data) => {
    dispatch(setProducts(data));
    setTakedProduct([...takedProduct, data._id]);
  };

  const handlDeleteProd = (data) => {
    dispatch(deleteProducts(data));
    takedProduct.splice(takedProduct.indexOf(data._id), 1);
    setTakedProduct(takedProduct.filter((item) => item._id !== data._id));
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
            Delete in Cart
          </button>
        ) : (
          <button
            className={styles.productBtn}
            onClick={() => {
              handlTakeProd(product);
            }}
          >
            Add to Cart
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
        {takedProduct.length === 0 || (
          <p>
            You have selected a store. If you want another store - click delete
            on the product
          </p>
        )}
      </div>
      <div className={styles.containerProduct}>
        <p>Products:</p>
        {products && <ul className={styles.productUl}>{productItems}</ul>}
      </div>
    </div>
  );
};

export default Shops;
