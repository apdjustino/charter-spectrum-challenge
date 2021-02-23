import style from "./home.module.scss";

import React, { useEffect, useState } from "react";
import { orderBy, uniq } from "lodash";
import Table from "../../components/table";
import Card from "../../components/table/columns/card";
import Filter from "../../components/filter";
import Search from "../../components/search";
import { filter, search } from "../../state/restaurants";
import { getRestaurants } from "../../state/restaurants/promises";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchString, setSearchString] = useState("");

  useEffect(async () => {
    const { data } = await getRestaurants();
    const genreString = data.map((item) => item.genre).reduce((acc, cv) => `${acc},${cv}`);
    const genres = orderBy(uniq(genreString.split(",")));
    const states = orderBy(uniq(data.map((item) => item.state)));
    const restaurantData = orderBy(data, "name");
    data.forEach((item) => {});
    setRestaurants(restaurantData);
    setFilteredData(restaurantData);
    setStateOptions(["All", ...states]);
    setGenreOptions(["All", ...genres]);
  }, []);

  useEffect(() => {
    filter(restaurants, selectedState, selectedGenre, searchString, setFilteredData);
  }, [selectedState, selectedGenre]);

  useEffect(() => {
    if (searchString === "") {
      filter(restaurants, selectedState, selectedGenre, searchString, setFilteredData);
    }
  }, [searchString]);

  const searchAction = () => {
    filter(restaurants, selectedState, selectedGenre, searchString, setFilteredData);
  };

  const columns = [
    {
      name: "",
      render: (d) => <Card data={d} />,
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.title}>Restaurant Finder 2021</div>
      <div className={style.searchContainer}>
        <Search setter={setSearchString} searchAction={searchAction} />
      </div>
      <div className={style.filterContainer}>
        <Filter label="State" options={stateOptions} width={75} selectedOption={selectedState} setSelectedOption={setSelectedState} />
        <Filter label="Genre" options={genreOptions} width={150} selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} />
      </div>
      <Table header={false} columns={columns} data={filteredData} options={stateOptions} />
    </div>
  );
};

export default Home;
