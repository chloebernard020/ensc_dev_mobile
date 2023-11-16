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
import { editAnimal } from "../api/animalapi";
import { enumType } from "../components/EnumType";
import { Picker } from "@react-native-picker/picker";

import { fetchLieux } from "../api/lieuapi";
import { stylesFormScreen } from "../theme/style";

const EditAnimalScreen = ({ route, navigation }) => {
  const { animal } = route.params;
  const { lieu } = route.params;

  const [nom, setNom] = useState(animal.nom);
  const [age, setAge] = useState(animal.age);

  const [espece, setEspece] = useState(animal.espece);

  const [type, setType] = useState(animal.type);
  const [typeText, setTypeText] = useState(enumType[animal.type]);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const [lieux, setLieux] = useState([]);
  const [nomLieu, setNomLieu] = useState(lieu.nom);
  const [lieuId, setLieuId] = useState(lieu.id);
  const [showLieuxPicker, setShowLieuxPicker] = useState(false);

  useEffect(() => {
    const loadLieux = async () => {
      const lieuxData = await fetchLieux(); // appel à votre fonction d'appel API
      setLieux(lieuxData); // mise à jour du state avec les données récupérées depuis l'API
    };

    loadLieux();
  }, []);

  const EditAnimal = async () => {
    if (type != null) {
      try {
        await editAnimal(animal.id, nom, age, espece, type, lieuId);
        navigation.navigate("Animal");
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
          value={age.toString()}
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
            <Picker.Item label={enumType[4]} value={5} />
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
            onPress={EditAnimal}
          >
            <Text style={stylesFormScreen.textButton}>Modifier l'animal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditAnimalScreen;
