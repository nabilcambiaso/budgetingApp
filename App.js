import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import AddAccountScreen from './src/screens/AddAccountScreen';
import DisplayScreen from './src/screens/DisplayScreen';


export default function App() {

  const Stack = createNativeStackNavigator();
  const URL = '192.168.1.102:4000';
  //create http link
  const httpLink = new HttpLink({
    uri: `http://${URL}/graphql`
  })

  // create web socket link
  const wsLink = new WebSocketLink({
    uri: `ws://${URL}/graphql`,
    options: {
      reconnect: true
    }
  })

  // create a split
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies:{
        Account:{
          fields:{
            balance(balance){
              return `${balance} $`
            }
          }
        }
      }
    }),
    link: splitLink
  })

  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
        <Stack.Screen name="AddAccountScreen" component={AddAccountScreen} />
        <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}
