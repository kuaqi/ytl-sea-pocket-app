import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import TransactionHistoryScreen from "../screens/TransactionHistoryScreen";

export type StackNavigation = StackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  Main: undefined,
  TransactionHistory: undefined,
}

const Stack = createStackNavigator<RootStackParamList>()

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{
          headerShown: false,
          title: 'Transaction History',
          headerBackTitleVisible: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
