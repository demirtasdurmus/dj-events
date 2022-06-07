import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import httpClient from '@/utils/createHttpClient';


export default function Home({ events = [] }) {

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to display</h3>}

      {events.map(event => (
        <EventItem key={event._id} evt={event} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className='btn-secondary'>View All</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  //TODO: we can pass the cookie to serverside to authenticate to reach resources
  console.log(ctx.req.headers.cookie);
  const res = await httpClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events?limit=3`);
  const events = res.data.data;
  return {
    props: {
      events: events
    },
  };
}
