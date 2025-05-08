import styles from "../styles/LoadingIndicator.module.css";

const LoadingIndicator = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingIndicator;
