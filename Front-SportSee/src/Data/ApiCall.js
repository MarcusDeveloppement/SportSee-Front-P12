const apiUrl = "http://localhost:3000/user/";

export const fetchUserDataAPI = () => {
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
};
