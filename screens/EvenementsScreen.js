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
import EvenementCard from "../components/EvenementCard";
import ResearchBar from "../components/ResearchBar";
import { fetchEvenements } from "../api/evenementapi";
import { stylesListeScreen } from "../theme/style";

const EvenementScreen = ({ navigation }) => {
  const [evenements, setEvenements] = useState([]);
  const [searchName, setSearchName] = useState("");

  // Fonction permettant la recherche d'événement
  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };

  useEffect(() => {
    const loadEvenements = async () => {
      let evenementsData = await fetchEvenements(); // appel à votre fonction d'appel API
      if (searchName) {
        // On filtre les evenements par nom
        evenementsData = evenementsData.filter((p) =>
          p.nom.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      setEvenements(evenementsData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadEvenements();
  }, [evenements, searchName]);

  return (
    <ScrollView>
      <View style={stylesListeScreen.container}>
        <View style={stylesListeScreen.header}>
          <Text style={stylesListeScreen.title}>Les événements</Text>
          <TouchableOpacity
            style={stylesListeScreen.addButton}
            onPress={() => navigation.navigate("AddEvenement")}
          >
            <Text style={stylesListeScreen.textButtonPlus}>+</Text>
          </TouchableOpacity>
        </View>
        <ResearchBar
          changeText={handleSearchNameChange}
          valeur={searchName}
          placeholder="Chercher un évenement par nom..."
        />
        {evenements.map((evenement) => (
          <EvenementCard
            key={evenement.id}
            nom={evenement.nom}
            date={evenement.date}
            keyExtractor={evenement.id}
            description={evenement.description}
            id={evenement.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default EvenementScreen;
