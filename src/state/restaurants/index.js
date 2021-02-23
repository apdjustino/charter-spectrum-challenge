export const filter = (data, state, genre, setter = () => null) => {
  const updatedData = data.filter((item) => {
    const stateCondition = state !== "All" ? item.state === state : true;
    const genreCondition = genre !== "All" ? item.genre.includes(genre) : true;
    return stateCondition && genreCondition;
  });
  setter(updatedData);
};
