import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {retry: 2}
    }
})

function QueryProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right"/>
    </QueryClientProvider>
  )
}

export default QueryProvider