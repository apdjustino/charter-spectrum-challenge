import style from "./search.module.scss";

import React from "react";

const Search = ({ setter = () => null, searchAction = () => null }) => {
  return (
    <div className={style.search}>
      <input type="text" placeholder="Search" onChange={(e) => setter(e.target.value)} />
      <div className={style.button} onClick={searchAction}>
        Search
      </div>
    </div>
  );
};

export default Search;
