import style from "./home.module.scss";

import React, { useEffect, useState } from "react";
import { orderBy, uniq } from "lodash";
import Table from "../../components/table";
import FilterColumn from "../../components/table/columns/filter";
import { getRestaurants } from "../../state/restaurants/promises";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(async () => {
    const { data } = await getRestaurants();
    const genreString = data.map((item) => item.genre).reduce((acc, cv) => `${acc},${cv}`);
    const genres = uniq(genreString.split(","));
    console.log(genres);
    data.forEach((item) => {});
    setRestaurants(orderBy(data, "name"));
  }, []);

  console.log(restaurants);

  const columns = [
    {
      name: "Restaurant",
      render: (d) => d.name,
    },
    {
      name: "City",
      render: (d) => d.city,
    },
    {
      name: "State",
      render: (d) => d.state,
    },
    {
      name: "Phone",
      render: (d) => d.telephone,
    },
    {
      name: "Genre",
      render: (d) => d.genre,
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.title}>Restaurant Finder 2021</div>
      <Table columns={columns} data={restaurants} />
    </div>
  );
};

export default Home;
