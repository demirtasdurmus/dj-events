import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";


export default function NotFoundPage() {
    return (
        <Layout>
            <div className={styles.error}>
                <h1><FaExclamationTriangle /> 404</h1>
                <h4>Couldnt find that page</h4>
                <Link href="/">Go back Home</Link>
            </div>
        </Layout>
    )
}