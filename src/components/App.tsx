import { QueryClient, QueryClientProvider } from "react-query"
import ListOrderPriority from "./ListOrderPriority"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>List of ordered issues based on priority</h1>
                <ListOrderPriority />
            </div>
        </QueryClientProvider>
    )
}

export default App
