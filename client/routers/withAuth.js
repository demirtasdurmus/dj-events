import httpClient from "@/utils/createHttpClient";

export default function withAuth(gssp) {
    return async (context) => {
        //console.log("hoc", context.req.headers.cookie);
        const cookie = context.req.headers.cookie;
        let user;
        if (cookie) {
            const response = await httpClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-auth`, {
                headers: {
                    cookie: context.req.headers.cookie
                }
            });
            user = response.data.data;
        }

        if (!user) {
            return {
                redirect: {
                    destination: '/auth/login'
                }
            };
        }

        const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

        // Pass page-specific props along with user data from `withAuth` to component
        return {
            props: {
                ...gsspData.props,
                user
            }
        };
    }
}