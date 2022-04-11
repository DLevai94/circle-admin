import Head from 'next/head';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch('/api/get_subscription_status', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Circle Admin</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Circle Admin</h1>

        <form className="flex flex-col" onSubmit={onSubmit}>
          <input
            className="py-2 px-4 text-black bg-white font-bold border border-black mb-2"
            type="text"
            placeholder="API Key"
            {...register('secret', { required: true })}
          />
          {errors.secret && <span>Error with secret field</span>}
          <input
            className="py-2 px-4 text-black bg-white font-bold border border-black mb-2"
            type="text"
            placeholder="Community ID"
            {...register('community_id', { required: true })}
          />
          {errors.community_id && <span>Error with community_id field</span>}
          <select {...register('status')}>
            <option value="" disabled selected>
              Status
            </option>
            <option key="active" value="active">
              active
            </option>
            <option key="past_due" value="past_due">
              past_due
            </option>
            <option key="canceled" value="canceled">
              canceled
            </option>
            <option key="trial" value="trial">
              trial
            </option>
          </select>
          {errors.status && <span>Error with status field</span>}
          <button
            className="bg-black py-2 px-4 text-white font-bold hover:bg-opacity-70 transition duration-500"
            type="submit"
          >
            Send
          </button>
        </form>
      </main>

      <footer className={styles.footer}>Powered by Circle API</footer>
    </div>
  );
}
