import {Stack} from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="A-login" options={{title: 'Login'}} />
      <Stack.Screen name="B-forgotPass" options={{title: 'Forgot Password'}} />
      <Stack.Screen name="B-forgotPass2" options={{title: 'Forgot Password'}}/>
      <Stack.Screen name="C-profile" options={{title: 'Profile'}}/>
      <Stack.Screen name="D-menuEmployee" options={{title: 'Main Menu'}}/>
      <Stack.Screen name="E-surveyConstEmploy" options={{title: 'Survey'}}/>
      <Stack.Screen name="F-surveyQuesEmploy" options={{title: 'Survey'}}/>
      <Stack.Screen name="G-adminMenu" options={{title: 'Main Menu'}}/>
      <Stack.Screen name="H-adminSeeSurvey" options={{title: 'See Survey'}} />
      <Stack.Screen name="I-adminPublishedSurvey" options={{title: 'Published Survey'}}/>
      <Stack.Screen name="J-adminPublishedResult" options={{title: 'Published Result'}}/>
      <Stack.Screen name="K-adminPublishedResultDetail" options={{title: 'Published Result Detail'}}/>
      <Stack.Screen name="L-adminSurveyOverview" options={{title: 'Survey Overview'}}/>
      <Stack.Screen name="R-employeeList" options={{title:'Employee List'}}/>
      <Stack.Screen name="s-kpi" options={{title:'KPI'}}/>
      <Stack.Screen name="t-employeeRecord" options={{title: 'Employee Records'}} />
    </Stack>
  );
}
