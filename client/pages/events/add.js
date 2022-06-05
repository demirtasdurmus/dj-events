import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/AddEvent.module.css";
import Layout from "@/components/Layout";


export default function AddEventPage() {
    const router = useRouter();
    const [values, setValues] = useState({
        name: "",
        performers: "",
        venue: "",
        address: "",
        date: "",
        description: "",
    });
    const [image, setImage] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some(value => value === "");
        if (hasEmptyFields) {
            return toast.error("Please fill in all fields");
        };
        // create form data and append image and other fields
        const formData = new FormData();
        formData.append("image", image, image.name);
        formData.append("jsonData", JSON.stringify(values));

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, formData)
            .then(res => {
                toast.success("Event created successfully");
                router.push("/events");
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })
    };

    return (
        <Layout title="Add new event">
            <Link href="/events">Go Back</Link>
            <h1>Add Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='image'>Image</label>
                        <input
                            type='file'
                            name='image'
                            id='image'
                            //value={values.image}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    )
}