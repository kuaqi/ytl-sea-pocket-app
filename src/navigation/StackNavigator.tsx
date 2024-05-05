import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import TransactionHistoryScreen from "../screens/TransactionHistoryScreen";
import TransactionDetailScreen from "../screens/TransactionDetailScreen";
import { TransactionHistory } from "../types";

export type StackNavigation = StackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  Main: undefined,
  TransactionHistory: undefined,
  TransactionDetail: { transaction_item: TransactionHistory },
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
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          headerShown: false,
          title: 'Transaction Detail',
          headerBackTitleVisible: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
