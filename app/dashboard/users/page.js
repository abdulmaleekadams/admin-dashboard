import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/users/users.module.css';

import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { fetchUsers } from '@/app/lib/data';
import { formatDate } from '@/app/lib/utils';

const Users = async ({searchParams}) => {
  const q = searchParams?.q
  const page = searchParams?.page || 1
  const {usersData, count} = await fetchUsers(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder='Search for a user' />
        <Link href='users/add'>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {usersData.map(
            ({
              _id,
              username,
              email,
              img,
              isAdmin,
              isActive,
              phone,
              address,
              createdAt,
            }) => (
              <tr>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={img}
                      alt=''
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {username}
                  </div>
                </td>
                <td>{email}</td>
                <td>{formatDate(createdAt)}</td>
                <td>{isAdmin ? 'Admin' : 'Client'}</td>
                <td>
                  <span
                    className={`${styles.status} ${isActive ?styles.active: styles.pending }`}
                  >
                    {isActive ? 'Active' : 'Passive'}
                  </span>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`users/${username}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <Link href={`/user/${_id}`}>
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </Link>
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

export default Users;
