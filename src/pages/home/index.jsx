import style from "./home.module.scss";

import React, { useEffect, useState } from "react";
import { orderBy, uniq } from "lodash";
import Table from "../../components/table";
import Card from "../../components/table/columns/card";
import Filter from "../../components/filter";
import { getRestaurants } from "../../state/restaurants/promises";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(async () => {
    const { data } = await getRestaurants();
    const genreString = data.map((item) => item.genre).reduce((acc, cv) => `${acc},${cv}`);
    const genres = uniq(genreString.split(","));
    const states = orderBy(uniq(data.map((item) => item.state)));
    data.forEach((item) => {});
    setRestaurants(orderBy(data, "name"));
    setStateOptions(["All", ...states]);
    setGenreOptions(["All", ...genres]);
  }, []);

  console.log(restaurants);

  const columns = [
    {
      name: "",
      render: (d) => <Card data={d} />,
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.title}>Restaurant Finder 2021</div>
      <div className={style.filterContainer}>
        <Filter label="State" options={stateOptions} width={75} selectedOption={selectedState} setSelectedOption={setSelectedState} />
        <Filter label="Genre" options={genreOptions} width={150} selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} />
      </div>
      <Table header={false} columns={columns} data={restaurants} options={stateOptions} />
    </div>
  );
};

export default Home;
