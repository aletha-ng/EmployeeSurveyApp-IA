import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="A-login" />
      <Stack.Screen name="B-forgotPass" />
      <Stack.Screen name="B-forgotPass2" />
      <Stack.Screen name="C-profile" />
      <Stack.Screen name="D-menuEmployee" />
      <Stack.Screen name="E-surveyConstEmploy" />
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
