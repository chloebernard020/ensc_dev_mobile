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

const LieuCard = ({ nom, type, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={id}
      style={styles.lieuCard}
      onPress={() => navigation.navigate("ParcDetails", { id })}
    >
      <View>
        <Text style={styles.name}>{nom}</Text>
        <Text style={styles.text}>{type}</Text>
      </View>
      <Ionicons name="chevron-forward" style={styles.arrow}></Ionicons>
    </TouchableOpacity>
  );
};

export default LieuCard;

const styles = StyleSheet.create({
  lieuCard: {
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
