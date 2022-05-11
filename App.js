import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import AddAccountScreen from './src/screens/AddAccountScreen';
import DisplayScreen from './src/screens/DisplayScreen';
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {

  const Stack = createNativeStackNavigator();

  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
        <Stack.Screen name="AddAccountScreen" component={AddAccountScreen} />
        <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
    </Provider>
  );
}
