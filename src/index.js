import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ChakraProvider } from "@chakra-ui/react"
import './styles/_typography.scss';
import './index.css';
import { App } from './pages';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'https://pangaea-interviews.now.sh/api/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <ChakraProvider>
      <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
