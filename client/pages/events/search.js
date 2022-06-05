import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';


export default function SearchPage({ events = [] }) {
    const router = useRouter();
    return (
        <Layout title="Search Results">
            <Link href="/events">Go Back</Link>
            <h1>Search Results for {router.query.searchTerm}</h1>
            {events.length === 0 && <h3>No Events to display</h3>}
            {events.map(event => (
                <EventItem key={event._id} evt={event} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({ query: { searchTerm } }) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events?searchTerm=${searchTerm}`);
    const events = res.data.data;
    return {
        props: {
            events: events,
        },
    };
}