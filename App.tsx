import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from 'react-native';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpenses from './src/screens/ManageExpenses';
import RecentExpenses from './src/screens/RecentExpenses';
import { GlobalStyles } from './constants/style';
import Ionicons from '@react-native-vector-icons/ionicons';
import IconButton from './src/components/UI/IconButton';
import { ExpensesContextProvider } from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={
        ({ navigation }) => (
          {
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500, },
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({ tintColor }) => <IconButton
              color={tintColor}
              name={'add'}
              size={24}
              onPress={() => navigation.navigate('ManageExpenses')}
            />
          }
        )
      }>
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ size, color }) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      />
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ size, color }) => <Ionicons name='calendar' size={size} color={color} />
        }} />
    </BottomTabs.Navigator>
  );
}

function App(): React.JSX.Element {

  return (
    <>
      <StatusBar backgroundColor={GlobalStyles.colors.primary500} />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{

              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen name='ManageExpenses' component={ManageExpenses}
              options={{
                presentation: 'modal'
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );

}

export default App;
