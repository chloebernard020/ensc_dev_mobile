import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { addPersonnel } from "../api/personnelapi";
import { enumMetier } from "../components/EnumMetier";
import { enumType } from "../components/EnumType";
import { stylesFormScreen } from "../theme/style";

const AddPersonnelScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [metier, setMetier] = useState(0);
  const [specialisation, setSpecialisation] = useState(0);
  const [metierText, setMetierText] = useState(enumMetier[0]);
  const [specialisationText, setSpecialisationText] = useState(enumType[0]);
  const [showMetierPicker, setShowMetierPicker] = useState(false);
  const [showSpecialisationPicker, setShowSpecialisationPicker] =
    useState(false);

  //Fonction d'ajout du personnel
  const AddPersonnel = async () => {
    if (nom != "" && prenom != "" && metier != null && specialisation != null) {
      // On vérifie la saisie des données
      try {
        await addPersonnel(nom, prenom, metier, specialisation); // On ajoute le personnel dans l'API
        navigation.navigate("Personnel");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        Alert.alert("Vous n'avez pas entré toutes les données");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <ScrollView>
      <View style={stylesFormScreen.container}>
        <Text style={stylesFormScreen.title}>Nom du personnel</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setNom}
          value={nom}
          placeholder="Nom"
        />

        <Text style={stylesFormScreen.title}>Prénom du personnel</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setPrenom}
          value={prenom}
          placeholder="Prénom"
        />
        <Text style={stylesFormScreen.title}>Entrez le métier</Text>
        <TouchableOpacity
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowMetierPicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>{metierText}</Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
        </TouchableOpacity>
        {showMetierPicker && (
          <Picker
            selectedValue={metier}
            onValueChange={(itemValue) => {
              setMetier(itemValue);
              setMetierText(enumMetier[itemValue]);
              setShowMetierPicker(false);
            }}
          >
            <Picker.Item label={enumMetier[0]} value={0} />
            <Picker.Item label={enumMetier[1]} value={1} />
            <Picker.Item label={enumMetier[2]} value={2} />
            <Picker.Item label={enumMetier[3]} value={3} />
          </Picker>
        )}

        <Text style={stylesFormScreen.title}>Entrez la spécialisation</Text>
        <TouchableOpacity
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowSpecialisationPicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>{specialisationText}</Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
        </TouchableOpacity>
        {showSpecialisationPicker && (
          <Picker
            selectedValue={specialisation}
            onValueChange={(itemValue) => {
              setSpecialisation(itemValue);
              setSpecialisationText(enumType[itemValue]);
              setShowSpecialisationPicker(false);
            }}
          >
            <Picker.Item label={enumType[0]} value={0} />
            <Picker.Item label={enumType[1]} value={1} />
            <Picker.Item label={enumType[2]} value={2} />
            <Picker.Item label={enumType[3]} value={3} />
            <Picker.Item label={enumType[4]} value={4} />
            <Picker.Item label={enumType[5]} value={5} />
          </Picker>
        )}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={stylesFormScreen.submitButton}
            onPress={AddPersonnel}
          >
            <Text style={stylesFormScreen.textButton}>
              Ajouter le personnel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPersonnelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "rgb(246,251,247)",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 20,
    width: "auto",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginVertical: 10,
  },
  input2: {
    paddingTop: 10,
    fontSize: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arrow: {
    fontSize: 20,
    color: "grey",
  },
  textButton2: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    color: "rgb(77,79,78)",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: "rgb(112,150,125)",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "rgb(112,150,125)",
    width: 200,
    alignItems: "center",
    height: 40,
    marginTop: 10,
    justifyContent: "center",
    width: 350,
    borderRadius: 10,
  },

  textButton: { color: "white", fontSize: 16 },
});
