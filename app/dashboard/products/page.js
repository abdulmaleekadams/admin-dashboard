import styles from '@/app/ui/dashboard/products/products.module.css';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

import Link from 'next/link';
import Image from 'next/image';
import Search from '@/app/ui/dashboard/search/search';

const Products = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder='Search for a products' />
        <Link href='products/add'>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Decription</td>
            <td>Price </td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src='/noavatar.png'
                  alt=''
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing el.</td>
            <td>N200,000</td>
            <td>14.02.2024</td>
            <td>
              34
            </td>
            <td>
              <div className={styles.buttons}>
                <Link href='/'>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <Link href='/'>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Products;
