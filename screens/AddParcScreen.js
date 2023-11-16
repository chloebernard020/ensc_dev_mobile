import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { addLieu } from "../api/lieuapi";
import { enumType } from "../components/EnumType";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { stylesFormScreen } from "../theme/style";

const AddParcScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");

  const [type, setType] = useState(0); // On initialise le type avec la première valeur dans le énum
  const [typeText, setTypeText] = useState(enumType[0]); // On initialise le texte affiché sur le form
  const [showTypePicker, setShowTypePicker] = useState(false);

  // Fonction gérant l'ajout du lieu
  const AddLieu = async () => {
    if (nom != "" && type != null) {
      // On vérifie que les informations sont saisies
      try {
        await addLieu(nom, type); // On ajoute le lieu dans l'API
        navigation.navigate("Parcs");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // Gestion de l'erreur
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
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowTypePicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>{typeText}</Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
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
            <Picker.Item label={enumType[4]} value={4} />
            <Picker.Item label={enumType[5]} value={5} />
          </Picker>
        )}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={stylesFormScreen.submitButton}
            onPress={AddLieu}
          >
            <Text style={stylesFormScreen.textButton}>Ajouter le parc</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddParcScreen;
