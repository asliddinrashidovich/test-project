import { NuqsAdapter } from 'nuqs/adapters/react'
import { BrowserRouter } from 'react-router-dom'
import QueryProvider from './queryProvider'

// eslint-disable-next-line react/prop-types
function Providers({children}) {
  return (
    <BrowserRouter>
        <NuqsAdapter>
            <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
    </BrowserRouter>
  )
}

export default Providers