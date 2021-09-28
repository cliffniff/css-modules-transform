import styles from "dd.module.css";

const Sample = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <div className={styles.navbar}></div>
            <div className={styles["navbar-ss"]}></div>
        </div>
    );
};

export default Sample;
