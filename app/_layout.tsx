import {Stack} from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title:'Home'}}/>
      <Stack.Screen name='adminMainMenu_page' options={{title:'Admin Main Menu'}}/>
      <Stack.Screen name='employeeMainMenu_page' options={{title:'Employee Main Menu'}}/>
      <Stack.Screen name='profile_page' options={{title:'User Profile'}}/>
      <Stack.Screen name='answerSurvey_page' options={{title:'Submit A Survey'}}/>
      <Stack.Screen name='response_page' options={{title:'Employee Responses'}}/>
      <Stack.Screen name='kpi_page' options={{title:'Company KPIs'}}/>
      <Stack.Screen name='email_page' options={{title:'Email Employees'}}/>
      <Stack.Screen name='employeeRecords_page' options={{title:'Employee List'}}/>
    </Stack>
  );
}
