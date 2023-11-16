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
  Alert,
} from "react-native";
import { fetchLieu, removeLieu } from "../api/lieuapi";
import { fetchAnimauxLieu } from "../api/animalapi";

import { enumType } from "../components/EnumType";
import AnimalCard from "../components/AnimalCard";

//import { styles } from "../theme/style";

const ParcDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [lieu, setLieu] = useState([]);
  const [animauxLieu, setAnimauxLieu] = useState([]);

  useEffect(() => {
    const getLieuDetails = async () => {
      const lieuDetails = await fetchLieu(id); // appel à votre fonction d'appel API
      setLieu(lieuDetails); // mise à jour du state avec les données récupérées depuis l'API
    };
    const getAnimauxLieu = async () => {
      const animauxLieu = await fetchAnimauxLieu(id); // appel à votre fonction d'appel API
      setAnimauxLieu(animauxLieu); // mise à jour du state avec les données récupérées depuis l'API
    };

    getLieuDetails();
    getAnimauxLieu();
  }, []);

  const [showBox, setShowBox] = useState(true);

  // Fenetre de dialogue pour la suppression du parc
  const showConfirmDialog = (parcId) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer ce parc ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteParc(parcId);
          },
        },
        // Le bouton Non
        // Ne fait rien mais enlève le message
        {
          text: "Non",
        },
      ]
    );
  };
  const handleDeleteParc = async (parcId) => {
    setShowBox(false);
    await removeLieu(parcId);
    navigation.navigate("Parcs");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{lieu.nom}</Text>
            <View style={styles.line} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() =>
                navigation.navigate("EditParc", {
                  lieu,
                })
              }
            >
              <Text style={styles.textButtonUpdate}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtitle}>Informations</Text>
        <View style={styles.card}>
          <Text style={styles.infotitle}>Type d'animaux</Text>
          <Text style={[styles.text, styles.space]}>{enumType[lieu.type]}</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            showConfirmDialog(id);
          }}
        >
          <Text style={styles.textButton}>Supprimer</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.subtitle}>Les animaux du parc</Text>
          {
            /*S'il n'y a pas d'animal on affiche un message*/
            animauxLieu.length === 0 ? (
              <Text style={styles.text2}>
                Aucun animal pris en charge par {lieu.nom} pour le moment !
              </Text>
            ) : (
              animauxLieu.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  nom={animal.nom}
                  espece={animal.espece}
                  id={animal.id}
                />
              ))
            )
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default ParcDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: "rgb(246,251,247)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  line: {
    height: 5,
    width: 100,
    backgroundColor: "rgb(112,150,125)",
    marginBottom: 30,
  },
  thinLine: {
    height: 1,
    backgroundColor: "rgb(243,243,243)",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    color: "rgb(77,79,78)",
  },
  title2: {
    fontSize: 20,
    marginBottom: 20,
    color: "rgb(134,134,134)",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    color: "rgb(77,79,78)",
  },
  infotitle: {
    fontSize: 18,
    marginBottom: 5,
    color: "rgb(134,134,134)",
  },
  text: {
    fontSize: 18,
    color: "rgb(77,79,78)",
  },

  text2: {
    fontSize: 14,
    marginTop: 5,
    color: "grey",
  },

  card: {
    borderWidth: 0.5,
    borderColor: "rgb(220,220,220)",
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: "white",
    padding: 20,
  },
  deleteButton: {
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "rgb(212,78,78)",
    padding: 15,
    alignItems: "center",
  },
  textButton: {
    color: "white",
  },
  updateButton: {
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: "1",
    borderColor: "rgb(112,150,125)",
    padding: 15,
    alignItems: "center",
  },
  textButtonUpdate: {
    color: "rgb(112,150,125)",
  },
});
