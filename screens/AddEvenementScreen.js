import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addEvenement } from "../api/evenementapi";
import { fetchPersonnels } from "../api/personnelapi";
import { fetchAnimaux } from "../api/animalapi";
import { fetchLieux } from "../api/lieuapi";
import { Picker } from "@react-native-picker/picker";

import { stylesFormScreen } from "../theme/style";

const AddEvenementScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [lieux, setLieux] = useState([]);
  const [nomLieu, setNomLieu] = useState("");
  const [lieuId, setLieuId] = useState(null);
  const [showLieuxPicker, setShowLieuxPicker] = useState(false);

  const [animaux, setAnimaux] = useState([]);
  const [nomAnimal, setNomAnimal] = useState("");
  const [animalId, setAnimalId] = useState(null);
  const [showAnimauxPicker, setShowAnimauxPicker] = useState(false);

  const [nomPersonnel, setNomPersonnel] = useState("");
  const [prenomPersonnel, setPrenomPersonnel] = useState("");
  const [personnelId, setPersonnelId] = useState(null);
  const [personnels, setPersonnels] = useState([]);
  const [showPersonnelPicker, setShowPersonnelPicker] = useState(false);

  useEffect(() => {
    const loadPersonnels = async () => {
      const personnelsData = await fetchPersonnels(); // appel à votre fonction d'appel API
      setPersonnels(personnelsData); // mise à jour du state avec les données récupérées depuis l'API
    };
    const loadAnimaux = async () => {
      const animauxData = await fetchAnimaux(); // appel à votre fonction d'appel API
      setAnimaux(animauxData); // mise à jour du state avec les données récupérées depuis l'API
    };
    const loadLieux = async () => {
      const lieuxData = await fetchLieux(); // appel à votre fonction d'appel API
      setLieux(lieuxData); // mise à jour du state avec les données récupérées depuis l'API
    };

    loadPersonnels();
    loadAnimaux();
    loadLieux();
  }, []);

  // Fonction d'ajout de l'évenement
  const AddEvenement = async () => {
    if (
      nom != "" &&
      description != "" &&
      lieuId != null &&
      animalId != null &&
      personnelId != null
    ) {
      // On vérifie que toutes les données sont rentrées
      try {
        // On ajoute l'événement avec les informations saisies par l'utilisateur
        await addEvenement(
          nom,
          description,
          date,
          lieuId,
          animalId,
          personnelId
        );
        alert("Evenement ajouté avec succès");
        navigation.navigate("Evenements");
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
  // Gestion du changement de la date
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  return (
    <ScrollView>
      <View style={stylesFormScreen.container}>
        <Text style={stylesFormScreen.title}>Nom de l'évenement</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setNom}
          value={nom}
          placeholder="Nom"
        />

        <Text style={stylesFormScreen.title}>Description de l'évenement</Text>
        <TextInput
          style={stylesFormScreen.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
        />
        <Text style={stylesFormScreen.title}>Date de l'évenement</Text>
        <TouchableOpacity
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={stylesFormScreen.loginText}>
            {date.toLocaleDateString()}
          </Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            minimumDate={new Date()} // désactive les dates futures
            onChange={onDateChange}
          />
        )}
        <Text style={stylesFormScreen.title}>Parc de l'évenement</Text>

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

        <Text style={stylesFormScreen.title}>Animal de l'évenement</Text>
        <TouchableOpacity
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowAnimauxPicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>{nomAnimal}</Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
        </TouchableOpacity>
        {showAnimauxPicker && (
          <Picker
            selectedValue={animalId}
            onValueChange={(itemValue) => {
              const animal = animaux.find((a) => a.id === itemValue);
              setNomAnimal(animal.nom);
              setAnimalId(itemValue);
              setShowAnimauxPicker(false);
            }}
          >
            {animaux.map((animal) => (
              <Picker.Item
                key={animal.id}
                label={animal.nom}
                value={animal.id}
              />
            ))}
          </Picker>
        )}
        <Text style={stylesFormScreen.title}>Personnel de l'évenement</Text>
        <TouchableOpacity
          style={[stylesFormScreen.input, stylesFormScreen.input2]}
          onPress={() => setShowPersonnelPicker(true)}
        >
          <Text style={stylesFormScreen.textButton2}>
            {nomPersonnel} {prenomPersonnel}
          </Text>
          <Ionicons
            name="chevron-down"
            style={stylesFormScreen.arrow}
          ></Ionicons>
        </TouchableOpacity>
        {showPersonnelPicker && (
          <Picker
            selectedValue={personnelId}
            onValueChange={(itemValue) => {
              const personnel = personnels.find((p) => p.id === itemValue);
              setNomPersonnel(personnel.nom);
              setPrenomPersonnel(personnel.prenom);
              setPersonnelId(itemValue);
              setShowPersonnelPicker(false);
            }}
          >
            {personnels.map((personnel) => (
              <Picker.Item
                key={personnel.id}
                label={personnel.nom + " " + personnel.prenom}
                value={personnel.id}
              />
            ))}
          </Picker>
        )}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={stylesFormScreen.submitButton}
            onPress={AddEvenement}
          >
            <Text style={stylesFormScreen.textButton}>Ajouter l'évenement</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddEvenementScreen;
