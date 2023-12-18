'use client';
import { usePathname } from 'next/navigation';
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from 'react-icons/md';
import styles from './navbar.module.css';
const Navbar = () => {
  const pathname = usePathname();
  let currentPath = '';

  if (pathname.indexOf('products/add', 0) >= 0) {
    currentPath = 'add product';
  } else if (pathname.indexOf('users/add', 0) >= 0) {
    currentPath = 'add user';
  } else {
    currentPath = pathname.split('/').pop();
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>{currentPath}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type='text' placeholder='Search...' className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
