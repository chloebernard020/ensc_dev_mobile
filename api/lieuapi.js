const rootEndpoint = "https://lareserveensc.azurewebsites.net/api";

export const fetchLieux = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi`);
    const lieux = await response.json();
    return lieux;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les lieux.");
  }
};

export const fetchLieu = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi/${id}`);
    const lieux = await response.json();
    return lieux;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les lieux.");
  }
};

export const addLieu = async (_nom, _type) => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        type: _type,
      }),
    });
    const compte = await response.json();
    return compte;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editLieu = async (_id, _nom, _type) => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi/${_id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        nom: _nom,
        type: _type,
      }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeLieu = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi/${id}`, {
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
