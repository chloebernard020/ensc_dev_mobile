import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { fetchAnimal, removeAnimal } from "../api/animalapi";
import { fetchPersonnelAnimal } from "../api/animalapi";
import PersonnelCard from "../components/PersonnelCard";
import { enumMetier } from "../components/EnumMetier";
import { fetchLieu } from "../api/lieuapi";
import { enumType } from "../components/EnumType";
import { stylesDetailsScreen } from "../theme/style";

const AnimalDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [animal, setAnimal] = useState([]);
  const [lieu, setLieu] = useState([]);
  const [personnel, setPersonnelAnimal] = useState([]);

  // Récupération des informations dans l'API
  useEffect(() => {
    const getAnimalDetails = async () => {
      const animalDetails = await fetchAnimal(id); // appel à votre fonction d'appel API
      setAnimal(animalDetails); // mise à jour du state avec les données récupérées depuis l'API
    };

    const getPersonnelAnimal = async () => {
      const personnelAnimal = await fetchPersonnelAnimal(id); // appel à votre fonction d'appel API
      setPersonnelAnimal(personnelAnimal); // mise à jour du state avec les données récupérées depuis l'API
    };

    const getLieu = async () => {
      const lieuDetails = await fetchLieu(animal.lieuId); // appel à votre fonction d'appel API
      setLieu(lieuDetails); // mise à jour du state avec les données récupérées depuis l'API
    };

    getAnimalDetails();
    getPersonnelAnimal();
    getLieu();
  }, [lieu, animal]);

  const [showBox, setShowBox] = useState(true);

  // Gestion de la fenetre de dialogue pour la suppression de l'animal
  const showConfirmDialog = (animalId) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer ce parc ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteAnimal(animalId); // Retire l'animal de l'API
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

  // Gestion de la suppression dans l'API
  const handleDeleteAnimal = async (animalId) => {
    setShowBox(false);
    await removeAnimal(animalId); // Appel de la fonction removeAnimal du fichier api
    navigation.navigate("Animal"); // On redirige la page vers la page de liste des animaux
  };

  return (
    <ScrollView>
      <View style={stylesDetailsScreen.container}>
        <View style={stylesDetailsScreen.header}>
          <View>
            <Text style={stylesDetailsScreen.title}>{animal.nom}</Text>
            <Text style={stylesDetailsScreen.title2}>{animal.espece}</Text>
            <View style={stylesDetailsScreen.line} />
          </View>
          <View>
            <TouchableOpacity
              style={stylesDetailsScreen.updateButton}
              onPress={() =>
                navigation.navigate("EditAnimal", {
                  animal,
                  lieu,
                })
              }
            >
              <Text style={stylesDetailsScreen.textButtonUpdate}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={stylesDetailsScreen.subtitle}>Informations</Text>
        <View style={stylesDetailsScreen.card}>
          <Text style={stylesDetailsScreen.infotitle}>Age</Text>
          <Text style={[stylesDetailsScreen.text, stylesDetailsScreen.space]}>
            {animal.age} ans
          </Text>
          <View style={stylesDetailsScreen.thinLine} />
          <Text style={stylesDetailsScreen.infotitle}>Type</Text>
          <Text style={stylesDetailsScreen.text}>{enumType[animal.type]}</Text>
          <View style={stylesDetailsScreen.thinLine} />
          <Text style={stylesDetailsScreen.infotitle}>Lieu d'habitat</Text>
          <Text style={stylesDetailsScreen.text}>{lieu.nom}</Text>
        </View>
        <TouchableOpacity
          style={stylesDetailsScreen.deleteButton}
          onPress={() => {
            showConfirmDialog(id);
          }}
        >
          <Text style={stylesDetailsScreen.textButton}>Supprimer</Text>
        </TouchableOpacity>

        <View>
          <Text style={stylesDetailsScreen.subtitle}>Le personnel attitré</Text>
          {
            /*S'il n'y a pas de demande on affiche un message*/
            personnel.length === 0 ? (
              <Text style={stylesDetailsScreen.text2}>
                Aucun personnel ne prend en charge {animal.nom} pour le moment !
              </Text>
            ) : (
              // Sinon on les affiche avec les boutons accepter et refuser
              personnel.map((perso) => (
                <PersonnelCard
                  key={perso.id}
                  nom={perso.nom}
                  prenom={perso.prenom}
                  metier={enumMetier[perso.metier]}
                  id={perso.id}
                />
              ))
            )
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default AnimalDetailsScreen;
