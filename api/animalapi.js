const rootEndpoint = "https://lareserveensc.azurewebsites.net/api";

export const fetchAnimaux = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/AnimalApi`);
    const animaux = await response.json();
    return animaux;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les animaux.");
  }
};

export const fetchAnimal = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/AnimalApi/${id}`);
    const animal = await response.json();
    return animal;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger l'animal.");
  }
};

export const fetchPersonnelAnimal = async (id) => {
  try {
    const response = await fetch(
      `${rootEndpoint}/AnimalApi/${id}/PrisEnChargePar`
    );
    const animal = await response.json();
    return animal;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger le personnel de l'animal.");
  }
};

export const fetchAnimauxLieu = async (lieuId) => {
  try {
    const response = await fetch(`${rootEndpoint}/AnimalApi/parLieu/${lieuId}`);
    const animal = await response.json();
    return animal;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les animaux du lieu.");
  }
};

export const addAnimal = async (_nom, _age, _espece, _type, _lieuId) => {
  try {
    const response = await fetch(`${rootEndpoint}/AnimalApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        age: _age,
        espece: _espece,
        type: _type,
        lieuId: _lieuId,
      }),
    });
    const compte = await response.json();
    return compte;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editAnimal = async (_id, _nom, _age, _espece, _type, _lieuId) => {
  try {
    const response = await fetch(`${rootEndpoint}/AnimalApi/${_id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        nom: _nom,
        age: _age,
        espece: _espece,
        type: _type,
        lieuId: _lieuId,
      }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeAnimal = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/AnimalApi/${id}`, {
      method: `DELETE`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
