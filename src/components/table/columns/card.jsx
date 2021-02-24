import style from "./columns.module.scss";

import React, { useState } from "react";
import Tag from "../../tag";

const Card = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { address1, attire, city, genre, hours, id, lat, long, name, state, tags, telephone, website, zip } = data;
  const genres = genre.split(",");
  return (
    <div className={`${style.column} ${style.card}`}>
      <div className={style.nameContainer}>
        <div className={style.name}>{name}</div>
        <div className={`${style.caret} ${style.down}`} onClick={() => setIsExpanded(!isExpanded)} />
      </div>
      <div className={style.addressContainer}>
        <div className={style.address}>
          {isExpanded ? <div>{address1}</div> : null}
          <div>{`${city}, ${state} ${zip}`}</div>
        </div>
        <div className={style.phone}>{telephone}</div>
      </div>
      <div className={style.genreContainer}>
        {genres.map((g, i) => (
          <Tag key={i} title={g} />
        ))}
      </div>
      {isExpanded ? (
        <div className={style.hours}>
          Hours:
          <div>{hours}</div>
        </div>
      ) : null}
      {isExpanded ? (
        <div className={style.additionalContainer}>
          <div style={{ marginRight: "10px" }}>
            <a href={website} target="_blank" rel="noreferrer">
              Website
            </a>
          </div>
          <div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} target="_blank" rel="noreferrer">
              Directions
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
