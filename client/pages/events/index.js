import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import httpClient from '@/utils/createHttpClient';


export default function EventsPage({ events, page }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No Events to display</h3>}
            {events.map(event => (
                <EventItem key={event._id} evt={event} />
            ))}

            <Pagination page={page} />
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {

    // FIXME: add a second request to fetch total page count to control pagination
    let total;
    const res = await httpClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events?page=${page}&limit=${process.env.NEXT_PUBLIC_EVENTS_PER_PAGE}`);
    const events = res.data.data;
    return {
        props: {
            events: events,
            page: +page,
        },
    };
}