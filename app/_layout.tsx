import {Stack} from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Home'}} />
      <Stack.Screen name="adminMainMenu_page" options={{title: 'Main Menu'}} />
      <Stack.Screen name="employeeMainMenu_page" options={{title: 'Main Menu'}} />
    </Stack>
  );
}
