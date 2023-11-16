import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { editLieu } from "../api/lieuapi";
import { enumType } from "../components/EnumType";
import { Picker } from "@react-native-picker/picker";
import { stylesFormScreen } from "../theme/style";

const EditParcScreen = ({ route, navigation }) => {
  const { lieu } = route.params;
  const [nom, setNom] = useState(lieu.nom);
  const [type, setType] = useState(lieu.type);
  const [typeText, setTypeText] = useState(enumType[lieu.type]);
  const [showTypePicker, setShowTypePicker] = useState(false);

  //Fonction permettant de modifier un lieu
  const EditLieu = async () => {
    if (nom != "" && type != "") {
      // On vérifie la saisie de toutes les données
      try {
        await editLieu(lieu.id, nom, type); // On appelle la fonction de modification du fichier api
        alert("Parc modifié avec succès");
        navigation.navigate("Parcs");
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
        <Text style={stylesFormScreen.title}>Nom du parc</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setNom}
          value={nom}
          placeholder="Nom"
        />

        <Text style={stylesFormScreen.title}>Le type des animaux du parcs</Text>
        <TouchableOpacity
          style={stylesFormScreen.input}
          onPress={() => setShowTypePicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>{typeText}</Text>
        </TouchableOpacity>
        {showTypePicker && (
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => {
              setType(itemValue);
              setTypeText(enumType[itemValue]);
              setShowTypePicker(false);
            }}
          >
            <Picker.Item label={enumType[0]} value={0} />
            <Picker.Item label={enumType[1]} value={1} />
            <Picker.Item label={enumType[2]} value={2} />
            <Picker.Item label={enumType[3]} value={3} />
          </Picker>
        )}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={stylesFormScreen.submitButton}
            onPress={EditLieu}
          >
            <Text style={stylesFormScreen.textButton}>Modifier le parc</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditParcScreen;
