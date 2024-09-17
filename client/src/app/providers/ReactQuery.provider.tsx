import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient()

export default function ReactQueryProvider({children}: PropsWithChildren) {
return (
  <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
)
}