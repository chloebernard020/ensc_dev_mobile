import { StyleSheet } from "react-native";

export const stylesListeScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "rgb(246,251,247)",
  },
  title: {
    fontSize: 25,
    marginBottom: 25,
    color: "rgb(77,79,78)",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 70,

    backgroundColor: "rgb(112,150,125)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: { flexDirection: "row", justifyContent: "space-between" },
  textButtonPlus: { color: "white", fontSize: 35 },
});

export const stylesFormScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "rgb(246,251,247)",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 20,
    width: "auto",

    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginVertical: 10,
  },

  input2: {
    paddingTop: 10,
    fontSize: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arrow: {
    fontSize: 20,
    color: "grey",
  },

  title: {
    fontSize: 18,
    color: "rgb(77,79,78)",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: "rgb(112,150,125)",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "rgb(112,150,125)",
    width: 200,
    alignItems: "center",
    height: 40,
    marginTop: 10,
    justifyContent: "center",
    width: 350,
    borderRadius: 10,
  },
  textButton2: {
    fontSize: 20,
  },

  textButton: { color: "white", fontSize: 16 },
});

export const stylesDetailsScreen = StyleSheet.create({
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
