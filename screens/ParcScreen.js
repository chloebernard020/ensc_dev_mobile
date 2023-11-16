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

import LieuCard from "../components/LieuCard";
import { fetchLieux } from "../api/lieuapi";
import ResearchBar from "../components/ResearchBar";
import { enumType } from "../components/EnumType";
import { stylesListeScreen } from "../theme/style";

const ParcScreen = ({ navigation }) => {
  const [lieux, setLieux] = useState([]); // initialisation du state pour les lieux
  const [searchName, setSearchName] = useState("");

  // Fonction permettant la recherche d'événement
  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };
  useEffect(() => {
    const loadLieux = async () => {
      let lieuxData = await fetchLieux(); // appel à votre fonction d'appel API
      if (searchName) {
        // On filtre les evenements par nom
        lieuxData = lieuxData.filter((a) =>
          a.nom.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      setLieux(lieuxData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadLieux();
  }, [lieux, searchName]);

  return (
    <ScrollView>
      <View style={stylesListeScreen.container}>
        <View style={stylesListeScreen.header}>
          <Text style={stylesListeScreen.title}>Les parcs</Text>
          <TouchableOpacity
            style={stylesListeScreen.addButton}
            onPress={() => navigation.navigate("AddParc")}
          >
            <Text style={stylesListeScreen.textButtonPlus}>+</Text>
          </TouchableOpacity>
        </View>
        <ResearchBar
          changeText={handleSearchNameChange}
          valeur={searchName}
          placeholder="Chercher un parc par nom..."
        />
        {lieux.map((lieu) => (
          <LieuCard
            key={lieu.id}
            nom={lieu.nom}
            keyExtractor={lieu.id}
            type={enumType[lieu.type]}
            id={lieu.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ParcScreen;
