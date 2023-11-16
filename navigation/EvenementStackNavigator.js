import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EvenementsScreen from "../screens/EvenementsScreen";
import EvenementDetailsScreen from "../screens/EvenementDetailsScreen";
import AddEvenementScreen from "../screens/AddEvenementScreen";
import EditEvenementScreen from "../screens/EditEvenementScreen";

const EvenementStack = createNativeStackNavigator();

const EvenementStackNavigator = () => {
  return (
    <EvenementStack.Navigator
      initialRouteName="Evenements"
      screenOptions={({ route }) => ({
        //headerTintColor: "rgba(161,158,204,1)",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <EvenementStack.Screen
        name="Evenements"
        component={EvenementsScreen}
        options={{
          headerShown: false,
        }}
      />

      <EvenementStack.Screen
        name="EvenementDetails"
        component={EvenementDetailsScreen}
      />
      <EvenementStack.Screen
        name="AddEvenement"
        component={AddEvenementScreen}
      />

      <EvenementStack.Screen
        name="EditEvenement"
        component={EditEvenementScreen}
      />
    </EvenementStack.Navigator>
  );
};

export default EvenementStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});
