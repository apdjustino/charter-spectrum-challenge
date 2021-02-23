export const filter = (data, state, genre, searchString, setter = () => null) => {
  let updatedData = data.filter((item) => {
    const stateCondition = state !== "All" ? item.state === state : true;
    const genreCondition = genre !== "All" ? item.genre.includes(genre) : true;
    return stateCondition && genreCondition;
  });

  if (searchString !== "") {
    updatedData = updatedData.filter((item) => {
      const nameCondition = item.name.startsWith(searchString);
      const cityCondition = item.city.startsWith(searchString);
      const genreCondition = item.genre.includes(searchString);
      return nameCondition || cityCondition || genreCondition;
    });
  }

  setter(updatedData);
};
