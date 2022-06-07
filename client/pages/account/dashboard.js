import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import styles from '@/styles/Dashboard.module.css';
import httpClient from '@/utils/createHttpClient';
import withAuth from '@/routers/withAuth';


export default function DashboardPage({ events }) {
    const router = useRouter()

    const deleteEvent = (id) => {
        if (confirm('Are you sure?')) {
            httpClient.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`)
                .then(res => {
                    toast.success("Deleted successfully!")
                    router.reload();
                })
                .catch(err => {
                    toast.error(err.response.data.message)
                });
        }
    }

    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
                ))}
            </div>
        </Layout>
    )
}



export const getServerSideProps = withAuth(async (ctx) => {

    const res = await httpClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        { headers: { cookie: ctx.req.headers.cookie } }
    );
    const events = res.data.data;
    return {
        props: {
            events: events,
        },
    };
});