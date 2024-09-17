import { PropsWithChildren } from "react"

// Providers
import ApolloProvider from "./Apollo.provider";
import AuthProvider from "./Auth.provider";
import SnackbarProvider from "./Snackbar.provider";
import ReactQueryProvider from "./ReactQuery.provider";
import MUIProvider from "./MUI.Provider";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <SnackbarProvider>
            <ReactQueryProvider>
                <ApolloProvider>
                    <AuthProvider>
                        <MUIProvider>
                            {children}
                        </MUIProvider>
                    </AuthProvider>
                </ApolloProvider>
            </ReactQueryProvider>
        </SnackbarProvider>
    );
};