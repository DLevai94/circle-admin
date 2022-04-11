import { useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

export default function Home() {
  const [data, setData] = useState(null);
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
    const result = await response.json();
    console.log(result);
    setData(result.data);
  });

  return (
    <div>
      <Head>
        <title>Circle Admin</title>
      </Head>

      <main className="max-w-md mx-auto">
        <h1 className="text-red-800 font-extrabold text-2xl mb-8">Circle Admin</h1>

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
            type="submit">
            Send
          </button>
        </form>
        <h2>Results</h2>
        <pre>{data}</pre>
      </main>
    </div>
  );
}
