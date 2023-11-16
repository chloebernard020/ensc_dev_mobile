import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParcScreen from "../screens/ParcScreen";
import ParcDetailsScreen from "../screens/ParcDetailsScreen";

import AddParcScreen from "../screens/AddParcScreen";
import EditParcScreen from "../screens/EditParcScreen";

// Screen stack for cocktail search by name tab
const ParcStack = createNativeStackNavigator();

const ParcStackNavigator = () => {
  return (
    <ParcStack.Navigator
      initialRouteName="Parcs"
      screenOptions={({ route }) => ({
        //headerTintColor: "rgba(161,158,204,1)",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <ParcStack.Screen
        name="Parcs"
        component={ParcScreen}
        options={{
          headerShown: false,
        }}
      />

      <ParcStack.Screen name="ParcDetails" component={ParcDetailsScreen} />
      <ParcStack.Screen name="AddParc" component={AddParcScreen} />
      <ParcStack.Screen name="EditParc" component={EditParcScreen} />
    </ParcStack.Navigator>
  );
};

export default ParcStackNavigator;
