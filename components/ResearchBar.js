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

const ResearchBar = ({ changeText, valeur, placeholder }) => {
  return (
    <View style={styles.containerResearch}>
      <TextInput
        style={styles.research}
        placeholder={placeholder}
        onChangeText={changeText}
        value={valeur}
      />
      <Ionicons name="search" style={styles.searchIcon}></Ionicons>
    </View>
  );
};

export default ResearchBar;

const styles = StyleSheet.create({
  containerResearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#fff",
    paddingHorizontal: 30,
    shadowColor: "rgba(270,270,270,1)",
    borderRadius: 20,
    marginVertical: 10,
    //borderWidth: 1,
    //borderColor: "#ccc",
  },

  searchIcon: { fontSize: 24, color: "rgb(112,150,125)" },
  line: {
    height: 4,
    marginTop: 10,
    width: 100,
    backgroundColor: "rgb(112,150,125)",
  },
  research: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 16,
    color: "#000",
  },
});
