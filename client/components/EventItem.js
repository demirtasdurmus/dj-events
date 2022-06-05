import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";


export default function EventItem({ evt }) {
    return (
        <div className={styles.event}>
            <div className={styles.image}>
                <Image
                    src={evt.image ? evt.image : "/images/event-default.png"}
                    width={170}
                    height={100}
                    alt={evt.name}
                />
            </div>
            <div className={styles.info}>
                <span>
                    {new Date(evt.date).toLocaleString().split(',')[0]} at
                    {new Date(evt.date).toLocaleString().split(',')[1]}
                </span>
                <h3>{evt.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${evt.slug}`}>
                    <a className="btn">View Event</a>
                </Link>
            </div>
        </div>
    )
}