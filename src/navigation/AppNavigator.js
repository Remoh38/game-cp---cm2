import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LevelSelectScreen from "../screens/LevelSelectScreen";
import ModeSelectScreen from "../screens/ModeSelectScreen";
import TeamSetupScreen from "../screens/TeamSetupScreen";
import GameScreen from "../screens/GameScreen";
import GameOverScreen from "../screens/GameOverScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
      <Stack.Screen name="ModeSelect" component={ModeSelectScreen} />
      <Stack.Screen name="TeamSetup" component={TeamSetupScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="GameOver" component={GameOverScreen} />
    </Stack.Navigator>
  );
}