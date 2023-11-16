import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";

import { editPersonnel } from "../api/personnelapi";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

import { enumMetier } from "../components/EnumMetier";
import { enumType } from "../components/EnumType";
import { stylesFormScreen } from "../theme/style";

const EditPersonnelScreen = ({ route, navigation }) => {
  const { personnel } = route.params;
  const [nom, setNom] = useState(personnel.nom);
  const [prenom, setPrenom] = useState(personnel.prenom);
  const [metier, setMetier] = useState(personnel.metier);
  const [specialisation, setSpecialisation] = useState(
    personnel.specialisation
  );
  const [metierText, setMetierText] = useState(enumMetier[personnel.metier]);
  const [specialisationText, setSpecialisationText] = useState(
    enumType[personnel.specialisation]
  );
  const [showMetierPicker, setShowMetierPicker] = useState(false);
  const [showSpecialisationPicker, setShowSpecialisationPicker] =
    useState(false);

  // Fonction de modification du personnel
  const EditPersonnel = async () => {
    if (nom != "" && prenom != "" && metier != null && specialisation != null) {
      // On vérifie que toutes les données sont entrées
      try {
        await editPersonnel(personnel.id, nom, prenom, metier, specialisation); // On appelle la fonction edit du fichier api
        alert("Personnel modifié avec succès"); // On affiche une alerte
        navigation.navigate("Personnel"); // On redirige sur la page Personnel
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        Alert.alert("Vous n'avez pas entré toutes les données"); // On affiche un message lorsque les données ne sont pas saisies
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
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
        <Ionicons name="chevron-down" style={stylesFormScreen.arrow}></Ionicons>
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
        <Ionicons name="chevron-down" style={stylesFormScreen.arrow}></Ionicons>
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
          <Picker.Item label={enumType[4]} value={5} />
        </Picker>
      )}

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={stylesFormScreen.submitButton}
          onPress={EditPersonnel}
        >
          <Text style={stylesFormScreen.textButton}>Modifier le personnel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditPersonnelScreen;
