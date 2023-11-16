import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { addAnimal } from "../api/animalapi";
import { enumType } from "../components/EnumType";
import { Picker } from "@react-native-picker/picker";
import { stylesFormScreen } from "../theme/style";
import { fetchLieux } from "../api/lieuapi";

const AddAnimalScreen = ({ navigation }) => {
  // Déclaration des états avec useState()
  const [nom, setNom] = useState("");
  const [age, setAge] = useState("");
  const [espece, setEspece] = useState("");

  const [type, setType] = useState(0);
  const [typeText, setTypeText] = useState(enumType[0]);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const [lieux, setLieux] = useState([]);
  const [nomLieu, setNomLieu] = useState("");
  const [lieuId, setLieuId] = useState(null);
  const [showLieuxPicker, setShowLieuxPicker] = useState(false);

  // Effectuer un appel API au chargement du composant pour récupérer les lieux disponibles
  useEffect(() => {
    const loadLieux = async () => {
      const lieuxData = await fetchLieux(); // appel à votre fonction d'appel API
      setLieux(lieuxData); // mise à jour du state avec les données récupérées depuis l'API
    };

    loadLieux();
  }, []);

  // Fonction pour ajouter un animal
  const AddAnimal = async () => {
    if (type != null && nomLieu != "" && nom != "" && age != null) {
      // Vérifier si le type est sélectionné
      try {
        await addAnimal(nom, age, espece, type, lieuId); // appel à votre fonction d'ajout d'animal via l'API
        navigation.navigate("Animal"); // rediriger vers la page principale des animaux après l'ajout
      } catch (error) {
        console.error(error); // Gérer les erreurs en cas d'échec de l'ajout
      }
    } else {
      try {
        Alert.alert("Vous n'avez pas entré toutes les données"); // Afficher un message d'alerte si toutes les données ne sont pas saisies
      } catch (error) {
        console.error(error);
      }
    }
  };
  // Afficher le formulaire pour ajouter un animal
  return (
    <ScrollView>
      <View style={stylesFormScreen.container}>
        <Text style={stylesFormScreen.title}>Nom de l'animal</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setNom}
          value={nom}
          placeholder="Nom"
        />

        <Text style={stylesFormScreen.title}>Age de l'animal</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setAge}
          value={age}
          placeholder="Age"
        />
        <Text style={stylesFormScreen.title}>Espèce de l'animal</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setEspece}
          value={espece}
          placeholder="Espèce"
        />

        <Text style={stylesFormScreen.title}>Le type de l'animal</Text>
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
        <Text style={stylesFormScreen.title}>Parc de l'animal</Text>

        <TouchableOpacity
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowLieuxPicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>{nomLieu}</Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
        </TouchableOpacity>
        {showLieuxPicker && (
          <Picker
            selectedValue={lieuId}
            onValueChange={(itemValue) => {
              setLieuId(itemValue);
              const lieu = lieux.find((l) => l.id === itemValue);
              setNomLieu(lieu.nom);
              setLieuId(itemValue);
              setShowLieuxPicker(false);
            }}
          >
            {lieux.map((lieu) => (
              <Picker.Item key={lieu.id} label={lieu.nom} value={lieu.id} />
            ))}
          </Picker>
        )}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={stylesFormScreen.submitButton}
            onPress={AddAnimal}
          >
            <Text style={stylesFormScreen.textButton}>Ajouter l'animal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAnimalScreen;
