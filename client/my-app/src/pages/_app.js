
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../app/lib/apollo'; 
import store from '@/app/redux/store';
import { Provider } from 'react-redux';
import ReduxProvider from '@/app/redux/ReduxProvider';

function MyApp({ Component, pageProps }) {
 const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ReduxProvider>
    <ApolloProvider client={apolloClient}>
     
      <Component {...pageProps} />
     
    </ApolloProvider>
    </ReduxProvider>
  );
}

export default MyApp;



