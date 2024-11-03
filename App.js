import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import CreateQuestionScreen from './Screens/CreateQuestionScreen';
import QuestionSolutionScreen from './Screens/QuestionSolutionScreen';
import ExamControlScreen from './Screens/ExamControlScreen';
import NotesScreen from './Screens/NotesScreen';
import ProfileScreen from './Screens/ProfileScreen';
import StatisticsScreen from './Screens/StatisticsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateQuestion" component={CreateQuestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuestionSolution" component={QuestionSolutionScreen} options={{ headerShown: false}} />
        <Stack.Screen name="ExamControl" component={ExamControlScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notes" component={NotesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
