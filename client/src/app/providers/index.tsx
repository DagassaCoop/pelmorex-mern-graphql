import { PropsWithChildren } from "react"

// Providers
import ApolloProvider from "./Apollo.provider";
import AuthProvider from "./Auth.provider";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <ApolloProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ApolloProvider>
    );
};