export const filter = (data, state, genre, setter = () => null) => {
  const updatedData = data.filter((item) => {
    const stateCondition = state !== "All" ? item.state === state : true;
    const genreCondition = genre !== "All" ? item.genre.includes(genre) : true;
    return stateCondition && genreCondition;
  });
  setter(updatedData);
};

export const search = (data, searchString, setter = () => null) => {
  if (searchString === "") return data;

  const updatedData = data.filter((item) => {
    const nameCondition = item.name.startsWith(searchString);
    const cityCondition = item.city.startsWith(searchString);
    const genreCondition = item.genre.includes(searchString);

    return nameCondition || cityCondition || genreCondition;
  });
  setter(updatedData);
};
