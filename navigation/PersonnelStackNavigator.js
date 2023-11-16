import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonnelScreen from "../screens/PersonnelScreen";
import AddPersonnelScreen from "../screens/AddPersonnelScreen";
import PersonnelDetailsScreen from "../screens/PersonnelDetailsScreen";
import EditPersonnelScreen from "../screens/EditPersonnelScreen";

const PersonnelStack = createNativeStackNavigator();

const PersonnelStackNavigator = () => {
  return (
    <PersonnelStack.Navigator
      initialRouteName="Personnel"
      screenOptions={({ route }) => ({
        //headerTintColor: "rgba(161,158,204,1)",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <PersonnelStack.Screen
        name="Personnel"
        component={PersonnelScreen}
        options={{
          headerShown: false,
        }}
      />

      <PersonnelStack.Screen
        name="PersonnelDetails"
        component={PersonnelDetailsScreen}
      />

      <PersonnelStack.Screen
        name="AddPersonnel"
        component={AddPersonnelScreen}
        options={{ title: "Ajouter un personnel" }}
      />

      <PersonnelStack.Screen
        name="EditPersonnel"
        component={EditPersonnelScreen}
        options={{ title: "Modification d'un personnel" }}
      />
    </PersonnelStack.Navigator>
  );
};

export default PersonnelStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});
