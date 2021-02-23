import style from "./columns.module.scss";

import React from "react";
import Tag from "../../tag";

const Card = ({ data }) => {
  const { address1, attire, city, genre, hours, id, lat, long, name, state, tags, telephone, website } = data;
  const genres = genre.split(",");
  return (
    <div className={`${style.column} ${style.card}`}>
      <div className={style.nameContainer}>
        <div className={style.name}>{name}</div>
        <div className={`${style.caret} ${style.down}`} />
      </div>
      <div className={style.addressContainer}>
        <div className={style.address}>{`${city}, ${state}`}</div>
        <div className={style.phone}>{telephone}</div>
      </div>
      <div className={style.genreContainer}>
        {genres.map((g, i) => (
          <Tag key={i} title={g} />
        ))}
      </div>
    </div>
  );
};

export default Card;
