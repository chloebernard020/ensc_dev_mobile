import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PersonnelCard from "../components/PersonnelCard";
import ResearchBar from "../components/ResearchBar";
import { fetchPersonnels } from "../api/personnelapi";
import { enumMetier } from "../components/EnumMetier";
import { stylesListeScreen } from "../theme/style";

const PersonnelScreen = ({ navigation }) => {
  const [personnels, setPersonnels] = useState([]);
  const [searchName, setSearchName] = useState("");

  // Fonction permettant la recherche d'événement
  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };

  useEffect(() => {
    const loadPersonnels = async () => {
      let personnelsData = await fetchPersonnels(); // appel à votre fonction d'appel API
      if (searchName) {
        // On filtre les evenements par nom
        personnelsData = personnelsData.filter((a) =>
          a.nom.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      setPersonnels(personnelsData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadPersonnels();
  }, [personnels, searchName]); // Ajoute personnels en dépendance pour qu'il rafraichisse la liste du personnel lors de l'ajout ou la suppression d'un personnel
  return (
    <ScrollView>
      <View style={stylesListeScreen.container}>
        <View style={stylesListeScreen.header}>
          <Text style={stylesListeScreen.title}>Le personnel</Text>
          <TouchableOpacity
            style={stylesListeScreen.addButton}
            onPress={() => navigation.navigate("AddPersonnel")}
          >
            <Text style={stylesListeScreen.textButtonPlus}>+</Text>
          </TouchableOpacity>
        </View>
        <ResearchBar
          changeText={handleSearchNameChange}
          valeur={searchName}
          placeholder="Chercher un personnel par nom..."
        />

        {personnels.map((personnel) => (
          <PersonnelCard
            key={personnel.id}
            nom={personnel.nom}
            prenom={personnel.prenom}
            keyExtractor={personnel.id}
            metier={enumMetier[personnel.metier]}
            id={personnel.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PersonnelScreen;
