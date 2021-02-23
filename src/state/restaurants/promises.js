import axios from "axios";

export const getRestaurants = () =>
  axios.get("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
    headers: { Authorization: "Api-Key q3MNxtfep8Gt" },
  });
