const rootEndpoint = "https://lareserveensc.azurewebsites.net/api";

export const fetchEvenements = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/EvenementApi`);
    const evenements = await response.json();
    return evenements;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les evenements.");
  }
};

export const fetchEvenement = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/EvenementApi/${id}`);
    const evenement = await response.json();
    return evenement;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger l'événement.");
  }
};

export const removeEvenement = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/EvenementApi/${id}`, {
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

export const addEvenement = async (
  _nom,
  _description,
  _date,
  _lieuId,
  _animalId,
  _personnelId
) => {
  try {
    const response = await fetch(`${rootEndpoint}/EvenementApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        description: _description,
        date: _date,
        lieuId: _lieuId,
        animalId: _animalId,
        personnelId: _personnelId,
      }),
    });
    const compte = await response.json();
    return compte;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editEvenement = async (
  _id,
  _nom,
  _description,
  _date,
  _lieuId,
  _animalId,
  _personnelId
) => {
  try {
    const response = await fetch(`${rootEndpoint}/EvenementApi/${_id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        nom: _nom,
        description: _description,
        date: _date,
        lieuId: _lieuId,
        animalId: _animalId,
        personnelId: _personnelId,
      }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
