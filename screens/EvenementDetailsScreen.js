import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { fetchEvenement } from "../api/evenementapi";
import { fetchLieu } from "../api/lieuapi";
import { fetchAnimal } from "../api/animalapi";
import { fetchPersonnel } from "../api/personnelapi";
import { removeEvenement } from "../api/evenementapi";

const EvenementDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [event, setEvent] = useState([]);
  const [lieu, setLieu] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    const getEvenementDetails = async () => {
      const evenementDetails = await fetchEvenement(id);
      setEvent(evenementDetails);
    };
    getEvenementDetails();
  }, [event]);

  useEffect(() => {
    const getLieu = async () => {
      const lieuDetails = await fetchLieu(event.lieuId);
      setLieu(lieuDetails);
    };
    getLieu();
  }, [lieu]);

  useEffect(() => {
    const getAnimal = async () => {
      const animalDetails = await fetchAnimal(event.animalId);
      setAnimal(animalDetails);
    };
    getAnimal();
  }, [animal]);

  useEffect(() => {
    const getPersonnel = async () => {
      const personnelDetails = await fetchPersonnel(event.personnelId);
      setPersonnel(personnelDetails);
    };
    getPersonnel();
  }, [personnel]);

  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = (evenementId) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer cet événement ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteEvenement(evenementId);
            navigation.navigate("Evenements");
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
  const handleDeleteEvenement = async (evenementId) => {
    setShowBox(false);
    await removeEvenement(evenementId);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {event.nom}
            </Text>
            <View style={styles.line} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() =>
                navigation.navigate("EditEvenement", {
                  event,
                  lieu,
                  animal,
                  personnel,
                })
              }
            >
              <Text style={styles.textButtonUpdate}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtitle}>Informations</Text>
        <View style={styles.card}>
          <Text style={styles.infotitle}>Description</Text>
          <Text style={styles.text}>{event.description}</Text>
          <Text style={styles.infotitle}>Date</Text>
          <Text style={styles.text}>{event.date}</Text>
          <Text style={styles.infotitle}>Lieu de représentation</Text>
          <Text style={styles.text}>{lieu.nom}</Text>
          <Text style={styles.infotitle}>Animal concerné</Text>
          <Text style={styles.text}>{animal.nom}</Text>
          <Text style={styles.infotitle}>Personnel concerné</Text>
          <Text style={styles.text}>
            {personnel.nom} {personnel.prenom}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            showConfirmDialog(event.id);
          }}
        >
          <Text style={styles.textButton}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EvenementDetailsScreen;

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
    flexWrap: "wrap",
  },
  line: {
    height: 5,
    width: 100,
    backgroundColor: "rgb(112,150,125)",
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    color: "rgb(77,79,78)",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    color: "rgb(77,79,78)",
  },
  infotitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    color: "rgb(134,134,134)",
  },
  text: {
    fontSize: 18,
    marginBottom: 25,
    color: "rgb(77,79,78)",
  },
  card: {
    borderWidth: 0.5,
    borderColor: "rgb(220,220,220)",
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: "white",
    padding: 15,
  },
  deleteButton: {
    borderRadius: 8,
    marginTop: 15,
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
