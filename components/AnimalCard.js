import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const AnimalCard = ({ nom, espece, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={id}
      style={styles.animalCard}
      onPress={() => navigation.navigate("AnimalDetails", { id })}
    >
      <View>
        <Text style={styles.name}>{nom}</Text>
        <Text style={styles.text}>{espece}</Text>
      </View>
      <Ionicons name="chevron-forward" style={styles.arrow}></Ionicons>
    </TouchableOpacity>
  );
};

export default AnimalCard;

const styles = StyleSheet.create({
  animalCard: {
    borderWidth: 0.5,
    borderColor: "rgb(220,220,220)",
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "rgb(77,79,78)",
  },
  text: {
    fontSize: 15,
    color: "rgb(77,79,78)",
  },
  arrow: {
    fontSize: 30,
    color: "grey",
  },
});
