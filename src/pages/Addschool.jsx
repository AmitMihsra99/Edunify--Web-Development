// pages/AddSchool.jsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './Addschool.module.css';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AddSchool = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data, e) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      formData.append('image', data.image[0]);

      const response = await axios.post('/api/addSchool', formData);

      // Display success toast
      toast.success('Data inserted successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      e.target.reset();

      // Navigate to the "ShowSchools" page after successful submission
      router.push('/ShowSchools');

     // console.log(response.data);
    } catch (error) {
      // Display error toast
      toast.error(errors.email_id?.message || 'Error inserting data. Please check your input and try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

     console.error(error);
    }
  };

  return (
    <div className={styles.con}>
    <div className={styles.con1}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        encType="multipart/form-data"
        action="/api/addSchool"
        method="post"
      >
        <h1 className={styles.head}>Add School Data</h1>
        <Link className={styles.link} href="/ShowSchools">
          Show-Data
        </Link>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" {...register('name', { required: true })} />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          {...register('address', { required: true })}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          {...register('city', { required: true })}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          {...register('state', { required: true })}
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          {...register('contact', { required: true })}
        />

        <label htmlFor="email_id">Email ID:</label>
        <input
          type="text"
          id="email_id"
          name="email_id"
          {...register('email_id', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <label htmlFor="image">Image:</label>
        <input
          className={styles.image}
          type="file"
          id="image"
          name="image"
          {...register('image', { required: true })}
        />


        <button type="submit">Submit</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </div>
    </div>
  );
};

export default AddSchool;
