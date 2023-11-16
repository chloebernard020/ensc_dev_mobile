import React from "react";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimalStackNavigator from "./AnimalStackNavigator";
import EvenementStackNavigator from "./EvenementStackNavigator";
import ParcStackNavigator from "./ParcStackNavigator";
import PersonnelStackNavigator from "./PersonnelStackNavigator";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "EvenementStack") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "ParcStack") {
              iconName = focused ? "location" : "location-outline";
            } else if (route.name === "AnimalStack") {
              iconName = focused ? "paw" : "paw-outline";
            } else if (route.name === "PersonnelStack") {
              iconName = focused ? "people" : "people-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "rgba(112,150,125,1)",
          tabBarInactiveTintColor: "rgba(134,134,134,1)",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="EvenementStack"
          component={EvenementStackNavigator}
          options={{ title: "Evenements" }}
        />
        <Tab.Screen
          name="ParcStack"
          component={ParcStackNavigator}
          options={{ title: "Parcs" }}
        />
        <Tab.Screen
          name="AnimalStack"
          component={AnimalStackNavigator}
          options={{ title: "Animaux" }}
        />
        <Tab.Screen
          name="PersonnelStack"
          component={PersonnelStackNavigator}
          options={{ title: "Personnel" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;
