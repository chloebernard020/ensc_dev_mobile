import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalScreen from "../screens/AnimalScreen";
import AnimalDetailsScreen from "../screens/AnimalDetailsScreen";

import AddAnimalScreen from "../screens/AddAnimalScreen";
import EditAnimalScreen from "../screens/EditAnimalScreen";

// Screen stack for cocktail search by name tab
const AnimalStack = createNativeStackNavigator();

const AnimalStackNavigator = () => {
  return (
    <AnimalStack.Navigator
      initialRouteName="Animal"
      screenOptions={({ route }) => ({
        //headerTintColor: "rgba(161,158,204,1)",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <AnimalStack.Screen
        name="Animal"
        component={AnimalScreen}
        options={{
          headerShown: false,
        }}
      />
      <AnimalStack.Screen
        name="AnimalDetails"
        component={AnimalDetailsScreen}
      />
      <AnimalStack.Screen name="AddAnimal" component={AddAnimalScreen} />
      <AnimalStack.Screen
        name="EditAnimal"
        component={EditAnimalScreen}
        options={{ title: "Modification d'un animal" }}
      />
    </AnimalStack.Navigator>
  );
};

export default AnimalStackNavigator;
