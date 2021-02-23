import style from "./home.module.scss";

import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import Card from "../../components/table/columns/card";
import Filter from "../../components/filter";
import Search from "../../components/search";
import Pagination from "../../components/pagination";
import { getData, filter, getPageCount } from "../../state/restaurants";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchString, setSearchString] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(async () => {
    const { genres, states, restaurantData } = await getData();
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
  const pageCount = getPageCount(filteredData);
  console.log(pageCount);
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
      <Table header={false} columns={columns} data={filteredData[currentPageIndex]} options={stateOptions} />
      <Pagination selectedPageIndex={currentPageIndex} pageCount={pageCount} setter={setCurrentPageIndex} />
    </div>
  );
};

export default Home;
