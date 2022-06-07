import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import httpClient from '@/utils/createHttpClient';


export default function EventPage({ event }) {
    const router = useRouter();

    const deleteEvent = (e) => {
        // FIXME: create a confirmation modal before deleting
        e.preventDefault();
        httpClient.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${event._id}`)
            .then(res => {
                toast.success("Event deleted successfully");
                router.push("/events");
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })
    };

    return (
        <Layout title="Event">
            <div className={styles.event}>
                <ToastContainer />
                {/*<div className={styles.controls}>
                    <Link href={`/events/edit/${event._id}`}>
                        <a>
                            <FaPencilAlt /> Edit event
                        </a>
                    </Link>
                    <a
                        href="#"
                        className={styles.delete}
                        onClick={deleteEvent}>
                        <FaTimes /> Delete event
                    </a>
    </div>*/}

                <span>
                    {new Date(event.date).toLocaleString().split(',')[0]} at
                    {new Date(event.date).toLocaleString().split(',')[1]}
                </span>

                <h1>{event.name}</h1>
                {event.image && (
                    <div className={styles.image}>
                        <Image
                            src={event.image}
                            width={960}
                            height={600}
                            alt={event.name} />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{event.performers}</p>

                <h3>Description:</h3>
                <p>{event.description}</p>

                <h3>Location: {event.venue}</h3>
                <p>{event.address}</p>

                <Link href={`/events`}>
                    <a className={styles.back}>
                        Back to events
                    </a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await httpClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);

    const paths = res.data.data.map(event => ({
        params: {
            slug: event.slug
        }
    }));
    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params: { slug } }) {
    const res = await httpClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`);

    const event = res.data.data;

    return {
        props: {
            event
        },
        revalidate: 1
    }
}