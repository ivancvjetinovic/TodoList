import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql
} from '@apollo/client'
import './index.css'
import App from './App.jsx'
import { ENDPOINT } from "./Constants.js"

const link = createHttpLink({
  uri: ENDPOINT + "/graphql"
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>,
)