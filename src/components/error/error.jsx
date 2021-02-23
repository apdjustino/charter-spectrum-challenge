import style from "./error.module.scss";

import React from "react";

const Error = () => {
  return (
    <div className={style.error}>
      <div className={style.icon} />
      <div className={style.message}>No Restaurants Found</div>
    </div>
  );
};

export default Error;
