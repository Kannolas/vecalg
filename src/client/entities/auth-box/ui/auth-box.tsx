import styles from '../styles/auth-box.module.css';

export const AuthBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.box}>
            <div className={styles.blockForm}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};
