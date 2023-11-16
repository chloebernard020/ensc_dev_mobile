const rootEndpoint = "https://lareserveensc.azurewebsites.net/api";

export const fetchPersonnels = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/PersonnelApi`);
    const personnels = await response.json();
    return personnels;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger le personnel de la réserve.");
  }
};

export const fetchPersonnel = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/PersonnelApi/${id}`);
    const personnel = await response.json();
    return personnel;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger le personnel.");
  }
};

export const fetchAnimalPersonnel = async (id) => {
  try {
    const response = await fetch(
      `${rootEndpoint}/PersonnelApi/${id}/PeutSOccuperDe`
    );
    const animal = await response.json();
    return animal;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les animaux pris en charge.");
  }
};

export const addPersonnel = async (_nom, _prenom, _metier, _specialisation) => {
  try {
    const response = await fetch(`${rootEndpoint}/PersonnelApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        prenom: _prenom,
        metier: _metier,
        specialisation: _specialisation,
      }),
    });
    const compte = await response.json();
    return compte;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removepersonnel = async (id) => {
  try {
    console.log(id);
    const response = await fetch(`${rootEndpoint}/PersonnelApi/${id}`, {
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

export const editPersonnel = async (
  _id,
  _nom,
  _prenom,
  _metier,
  _specialisation
) => {
  try {
    const response = await fetch(`${rootEndpoint}/PersonnelApi/${_id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        nom: _nom,
        prenom: _prenom,
        metier: _metier,
        specialisation: _specialisation,
      }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
