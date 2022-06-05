import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Search() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(router.query.searchTerm);
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/events/search?searchTerm=${searchTerm}`);
    }
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for events"
                />
            </form>
        </div>
    )
}