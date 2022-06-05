import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";


export default function Layout({ title, keywords, description, children }) {
    const router = useRouter();
    const { pathname } = router;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
            </Head>
            <Header />
            {pathname === "/" && <Showcase />}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    )
};

Layout.defaultProps = {
    title: "DJ Events | Find the latest DJ and other musical events",
    keywords: "music, dj, edm, events",
    description: "Find the latest DJ and other musical events"
};