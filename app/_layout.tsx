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
      <Stack.Screen name="F-surveyQuesEmploy" />
      <Stack.Screen name="G-adminMenu" />
      <Stack.Screen name="H-adminSeeSurvey" />
      <Stack.Screen name="I-adminPublishedSurvey" />
      <Stack.Screen name="J-adminPublishedResult" />
      <Stack.Screen name="K-adminPublishedResultDetail" />
      <Stack.Screen name="L-adminSurveyOverview" />
      <Stack.Screen name="R-employeeList" />
      <Stack.Screen name="s-kpi" />
      <Stack.Screen name="t-employeeRecord" />
    </Stack>
  );
}
