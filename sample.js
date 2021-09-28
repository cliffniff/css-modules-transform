import ContentSection from "./components/ContentSection.js";
import styles from "./App.module.css";

const enumTabs = {
    HOME: "Home",
    ACTIVE: "Active",
    EXPIRED: "Expired",
};

const App = () => {
    const navigateTab = () => {};

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles["header-logo"]}></div>
                <div className={styles["header-email"]}></div>
                <div className={styles["header-options"]}></div>
            </div>
            <div className={styles.navbar}>
                {Object.values(enumTabs).map((tab) => (
                    <div className={styles["navbar-tab"]}>{tab}</div>
                ))}
            </div>
            <div className={styles.content}>
                <ContentSection
                    title="Active Subscriptions"
                    link={{
                        linkText: "View all",
                        linkAction: () => {
                            navigateTab(enumTabs.ACTIVE);
                        },
                    }}
                />
                <ContentSection />
            </div>
            <div className={styles.footer}></div>
        </div>
    );
};

export default App;
