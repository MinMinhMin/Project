import React from "react";
import styles from "../../../styles/user/notification.module.css"; // CSS Module

const Notification = ({ moto_in, car_in, moto_out, car_out, moto_not_out, car_not_out, revenue }) => {
  return (
    <div className={styles.notification}>
      <div className={`${styles.container} ${styles.in}`}>
        <div className={styles.title}>Xe vào</div>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            Xe máy
            <p className={styles["moto-in"]}>{moto_in || 0} xe</p>
          </div>

          <div className={styles["v-line"]}></div>

          <div className={styles["content-right"]}>
            Ô tô
            <p className={styles["car-in"]}>{car_in || 0} xe</p>
          </div>
        </div>
      </div>

      <div className={styles["vertical-line"]}></div>

      <div className={`${styles.container} ${styles.out}`}>
        <div className={styles.title}>Xe ra</div>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            Xe máy
            <p className={styles["moto-out"]}>{moto_out || 0} xe</p>
          </div>

          <div className={styles["v-line"]}></div>

          <div className={styles["content-right"]}>
            Ô tô
            <p className={styles["car-out"]}>{car_out || 0} xe</p>
          </div>
        </div>
      </div>

      <div className={styles["vertical-line"]}></div>

      <div className={`${styles.container} ${styles.not} ${styles.out}`}>
        <div className={styles.title}>Xe chưa ra</div>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            Xe máy
            <p className={styles["moto-not-out"]}>{moto_not_out || 0} xe</p>
          </div>

          <div className={styles["v-line"]}></div>

          <div className={styles["content-right"]}>
            Ô tô
            <p className={styles["car-not-out"]}>{car_not_out || 0} xe</p>
          </div>
        </div>
      </div>

      <div className={styles["vertical-line"]}></div>

      <div className={`${styles.container} ${styles.revenue}`}>
        <div className={styles.title}>Tổng tiền</div>
        <div className={styles.content}>
          <p className={styles['revenue-num']}>{revenue || "500.000"} đ</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;