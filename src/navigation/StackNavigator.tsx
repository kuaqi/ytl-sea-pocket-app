import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";

export type StackNavigation = StackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  Main: undefined,
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
    </Stack.Navigator>
  );
}
