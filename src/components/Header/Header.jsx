import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <nav>
        <ul className={styles.navUl}>
          <li className={styles.navLi}><NavLink className={styles.navLink} to="/shop">Shop</NavLink></li>
          <li className={styles.navLi}><NavLink className={styles.navLink} to="/shopping">Shopping Cart</NavLink></li>
          <li className={styles.navLi}><NavLink className={styles.navLink} to="/history">History</NavLink></li>
          <li className={styles.navLi}>f</li>
        </ul>
      </nav>
    </header>
  );
}
