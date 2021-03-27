import { NavigationContainer } from '@react-navigation/native';
import  React from 'react';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Button from 'react-native';

//icon fonts

import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import ProfileScreen from './ProfileScreen';
import TasksScreen from './TasksScreen';
import FilesScreen from './FilesScreen';
import FormsScreen from './FormsScreen';
import LearnScreen from "./LearnScreen";

 const TasksStack = createStackNavigator();
 const ProfileStack = createStackNavigator();
 const FormsStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabsScreen = () => {
  return (
  <Tab.Navigator
  tabBarOptions = {{
    
    activeTintColor: '#fb8856',
    inactiveTintColor: '#45505d',
    showLabel: false,
    style: {
        // position: 'absolute',
        height: 60,
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginHorizontal: 10,
        top:-3,
        bottom: 5,
    }
  }}
    // initialRouteName="Tasks"
    // activeColor="#fb8856"
    // inactiveColor="#45505d"
    // barStyle={{ 
     
    //   backgroundColor: "#fefeff"
    //  }}
  >
    <Tab.Screen
      name="Tasks"
      component={TasksScreen}
      options={{
        tabBarLabel: "Tasks",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="tasks" color={color} size={23} />
        ),
      }}
    />
    <Tab.Screen
      name="Forms"
      component={FormsScreen}
      options={{
        tabBarLabel: "Forms",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="file-signature" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Files"
      component={FilesScreen}
      options={{
        tabBarLabel: "Files",
        tabBarIcon: ({ color }) => (
          <Entypo name="folder" color={color} size={25} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="user-alt" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
)
    };
export default MainTabsScreen;

// const TasksStackScreen = ({navigation}) => (
//     <TasksStack.Navigator screenOptions={{
//             headerStyle: {
//                 backgroundColor: '#FF7272',
//               },
//               headerTintColor: '#fff',
//               headerTintStyle: {
//                 fontWeight: 'bold'
//               }
//               }}>
//             <TasksStack.Screen name="HomeScreen" component={HomeScreen} 
//             options={{
//            title: 'Overview',
          
//             }} />
            
//           </TasksStack.Navigator>
//     );
    
//     const ProfileStackScreen = ({navigation}) => (
//       <ProfileStack.Navigator screenOptions={{
//               headerStyle: {
//                   backgroundColor: '#FF7272',
//                 },
//                 headerTintColor: '#fff',
//                 headerTintStyle: {
//                   fontWeight: 'bold'
//                 }
//                 }}>
    
//               <ProfileStack.Screen
//                name="ProfileScreen"
//                component={ProfileScreen}/>
              
//             </ProfileStack.Navigator>
//       );
//       const FormsStackScreen = ({navigation}) => (
//         <FormsStack.Navigator screenOptions={{
//                 headerStyle: {
//                     backgroundColor: '#FF7272',
//                   },
//                   headerTintColor: '#fff',
//                   headerTintStyle: {
//                     fontWeight: 'bold'
//                   }
//                   }}>
      
//                 <FormsStack.Screen name="Forms" component={FormsScreen}
//               //    options={{
//               //  headerLeft: () => (
//               //    <Ionicons.Button name="ion-android-contact" size={25}
//               //    backgroundColor="#009387" onPress={() => navigation.openDrawer
//               //    ()}></Ionicons.Button>
//               //  )
        
//               //   }} 
//               />
                
//               </FormsStack.Navigator>
//         );