import { Text, View, Button } from "react-native";
import { useRouter } from 'expo-router';
import { useNavigation } from "expo-router";

const app = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (  
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button
      title="Go to Login"
      onPress={() => router.push('/A-login')}  
    />
    <Button
      title="working current"
      onPress={() => router.push('/_editingArea')}  
    />
    <Button
      title="Go to ForgotPass2"
      onPress={() => router.push('/B-forgotPass2')} 
    />
    <Button
      title="Go to profile"
      onPress={() => router.push('/C-profile')} 
    />
    <Button
      title="Go to main menu employee"
      onPress={() => router.push('/D-menuEmployee')}  
    />
    <Button
      title="Go to survey employee pt1"
      onPress={() => router.push('/E-surveyConstEmploy')}  
    />
    <Button
      title="Go to survey employee pt2"
      onPress={() => router.push('/F-surveyQuesEmploy')}  
    />
    <Button
      title="Go to Admin menu"
      onPress={() => router.push('/G-adminMenu')}  
    />
    <Button
      title="see survey admin"
      onPress={() => router.push('/H-adminSeeSurvey')}  
    />
    <Button
      title="see published admin"
      onPress={() => router.push('/I-adminPublishedSurvey')}  
    />
    <Button
      title="see published result admin"
      onPress={() => router.push('/J-adminPublishedResult')}  
    />
    <Button
      title="see published result admin detail"
      onPress={() => router.push('/K-adminPublishedResultDetail')}  
    />
    <Button
      title="admin survey overview"
      onPress={() => router.push('/L-adminSurveyOverview')}  
    />
    <Button
      title="admin survey make"
      onPress={() => router.push('/M-adminMakeSurvey')}  
    />
    <Button
      title="admin survey make"
      onPress={() => router.push('/N-adminMakeSurvey')}  
    />
    <Button
      title="admin survey make"
      onPress={() => router.push('/O-adminConsent')}  
    />
    <Button
      title="admin survey make"
      onPress={() => router.push('/P-adminEditQues')}  
    />
    <Button
      title="emp list"
      onPress={() => router.push('/R-employeeList')}  
    />
    <Button
      title="kpi"
      onPress={() => router.push('/s-kpi')}  
    />
    <Button
      title="emp rec"
      onPress={() => router.push('/t-employeeRecord')}  
    />
    <Button
      title="test file"
      onPress={() => router.push('/ZZZZ_testFile')}  
    />
    <Button
      title="test file"
      onPress={() => router.push('/testfile')}  
    />
  </View>
  );
}

export default app;