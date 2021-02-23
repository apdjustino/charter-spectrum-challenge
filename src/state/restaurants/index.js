import { getRestaurants } from "./promises";
import { orderBy, uniq, chunk, flattenDeep } from "lodash";

export const getData = async () => {
  const { data } = await getRestaurants();
  const genreString = data.map((item) => item.genre).reduce((acc, cv) => `${acc},${cv}`);
  return {
    genres: orderBy(uniq(genreString.split(","))),
    states: orderBy(uniq(data.map((item) => item.state))),
    attire: orderBy(uniq(data.map((item) => item.attire))),
    restaurantData: chunk(orderBy(data, "name"), 10),
  };
};

export const filter = (chunkedData, state, genre, attire, searchString, setter = () => null) => {
  const data = flattenDeep(chunkedData);
  let updatedData = data.filter((item) => {
    const stateCondition = state !== "All" ? item.state === state : true;
    const genreCondition = genre !== "All" ? item.genre.includes(genre) : true;
    const attireCondition = attire !== "All" ? item.attire === attire : true;
    return stateCondition && genreCondition && attireCondition;
  });

  if (searchString !== "") {
    updatedData = updatedData.filter((item) => {
      const nameCondition = item.name.startsWith(searchString);
      const cityCondition = item.city.startsWith(searchString);
      const genreCondition = item.genre.includes(searchString);
      return nameCondition || cityCondition || genreCondition;
    });
  }

  setter(chunk(updatedData, 10));
};

export const getPageCount = (chunkedData) => {
  const data = flattenDeep(chunkedData);
  return Math.ceil(data.length / 10);
};
