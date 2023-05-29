import styles from "./Couponts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDiskonts } from "../../redux/diskonts/diskontsOperations";
import {
  selectDiskonts,
  setDiskont,
} from "../../redux/diskonts/diskontsSelector";
import {
  deleteDiskontSlice,
  setDiskontSlice,
} from "../../redux/diskonts/diskontsSlice";
import { useNavigate } from "react-router-dom";

const Couponts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [selectedDiskont, setSelectedDiskont] = useState(null);
  const diskontsItems = useSelector(selectDiskonts);
  const setDis = useSelector(setDiskont);

  useEffect(() => {
    if (diskontsItems.length === 0) {
      dispatch(fetchDiskonts());
    }
  }, [dispatch]);

  const handlTakeDiskont = (data) => {
    dispatch(setDiskontSlice(data));
    
  };

  const handleDeactivateDiskont = () => {
    dispatch(deleteDiskontSlice());
  };

  const diskontItem = diskontsItems.map((diskont) => {
    return (
      <li key={diskont._id}>
        <div className={styles.divDiskont}>
          <p>{diskont.name}</p>
          <p>Diskont {diskont.diskont} %</p>
          {setDis._id === diskont._id ? (
            <button
              type="button"
              onClick={() => {
                handleDeactivateDiskont();
                
              }}
            >
              Deactivate diskont
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handlTakeDiskont(diskont);
                navigate("/shopping");
              }}
            >
              Take diskont
            </button>
          )}
        </div>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <ul className={styles.shopUl}>{diskontItem}</ul>
    </div>
  );
};

export default Couponts;
