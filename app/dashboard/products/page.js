import styles from '@/app/ui/dashboard/products/products.module.css';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

import Link from 'next/link';
import Image from 'next/image';
import Search from '@/app/ui/dashboard/search/search';
import { fetchProducts } from '@/app/lib/data';
import { formatDate } from '@/app/lib/utils';
import { deleteProduct } from '@/app/lib/actions';

const Products = async ({ searchParams }) => {
  const q = searchParams?.q;
  const page = searchParams.page || 1;

  const { productsData, count } = await fetchProducts(q, page);

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
          {productsData.map(
            ({ _id, title, desc, price, stock, img, createdAt }) => (
              <tr key={_id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={img}
                      alt=''
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {title}
                  </div>
                </td>
                <td>{desc.substring(0, 30)}...</td>
                <td>N{price.toLocaleString()}</td>
                <td>{formatDate(createdAt)}</td>
                <td>{stock}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`products/${title}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deleteProduct}>
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        value={_id.toString()}
                        name='id'
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default Products;
