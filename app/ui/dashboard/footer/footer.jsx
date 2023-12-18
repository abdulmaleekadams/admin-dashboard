import styles from './footer.module.css';
const Footer = () => {
  return (
    <div className={styles.container}>
      <p className={styles.logo}>Adams Abdulmaleek</p>
      <p className={styles.text}>All rigths reserved</p>
    </div>
  );
};

export default Footer;
