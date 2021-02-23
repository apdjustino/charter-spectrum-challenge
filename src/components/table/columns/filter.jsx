import style from "./columns.module.scss";

import React from "react";

const FilterColumn = ({ label, options }) => {
  return (
    <div className={style.filter}>
      <div className={style.label}>{label}</div>
      <div className={style.picker}>All</div>
    </div>
  );
};

export default FilterColumn;
