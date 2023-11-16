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
import { fetchEvenement } from "../api/evenementapi";
import { useNavigation } from "@react-navigation/native";

const EvenementCard = ({ nom, date, description, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.animalCard}
      key={id}
      onPress={() => navigation.navigate("EvenementDetails", { id })}
    >
      <View style={styles.infos}>
        <Text style={styles.name}>{nom}</Text>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" style={styles.arrow}></Ionicons>
    </TouchableOpacity>
  );
};

export default EvenementCard;

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
  infos: {
    flex: 5,
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
    marginHorizontal: 14,
  },
  description: {
    fontSize: 12,
    color: "rgb(77,79,78)",
    marginTop: 8,
  },
});
