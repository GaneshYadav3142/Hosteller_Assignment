
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../app/lib/apollo'; 
import store from '@/app/redux/store';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
    <ApolloProvider client={apolloClient}>
     
      <Component {...pageProps} />
     
    </ApolloProvider>
    </Provider>
  );
}

export default MyApp;



