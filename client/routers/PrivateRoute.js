import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";



export default function PrivateRoute(Component) {
    const AuthenticatedComponent = () => {
        const router = useRouter();
        const { user, isLoading } = useContext(AuthContext);
        if (isLoading) {
            return <div>Loading....</div>;
        } else if (!user) {
            router.push('/auth/login');
        } else {
            return <Component />;
        }
    };
    return AuthenticatedComponent;
};