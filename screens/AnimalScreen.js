import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import AnimalCard from "../components/AnimalCard";
import ResearchBar from "../components/ResearchBar";
import { fetchAnimaux } from "../api/animalapi";
import { stylesListeScreen } from "../theme/style";

const AnimalScreen = ({ navigation }) => {
  const [animaux, setAnimaux] = useState([]); // initialisation du state pour les animaux
  const [searchName, setSearchName] = useState("");

  // Fonction permettant la recherche d'événement
  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };

  // Fonction permettant la recherche d'événement

  useEffect(() => {
    const loadAnimaux = async () => {
      let animauxData = await fetchAnimaux(); // appel à votre fonction d'appel API
      if (searchName) {
        // On filtre les evenements par nom
        animauxData = animauxData.filter((a) =>
          a.nom.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      setAnimaux(animauxData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadAnimaux();
  }, [animaux, searchName]); // On ajoute une dépendance pour les animaux

  return (
    <ScrollView>
      <View style={stylesListeScreen.container}>
        <View style={stylesListeScreen.header}>
          <Text style={stylesListeScreen.title}>Les animaux</Text>
          <TouchableOpacity
            style={stylesListeScreen.addButton}
            onPress={() => navigation.navigate("AddAnimal")}
          >
            <Text style={stylesListeScreen.textButtonPlus}>+</Text>
          </TouchableOpacity>
        </View>
        <ResearchBar
          changeText={handleSearchNameChange}
          valeur={searchName}
          placeholder="Chercher un animal par nom..."
        />
        {animaux.map((animal) => (
          <AnimalCard
            key={animal.id}
            nom={animal.nom}
            espece={animal.espece}
            keyExtractor={animal.id}
            id={animal.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default AnimalScreen;
