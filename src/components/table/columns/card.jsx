import style from "./columns.module.scss";

import React, { useState } from "react";
import Tag from "../../tag";

const Card = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { address1, attire, city, genre, hours, id, lat, long, name, state, tags, telephone, website, zip } = data;
  const genres = genre.split(",");
  let attireClass = attire.toLowerCase();

  if (attireClass === "business casual") attireClass = "businessCasual";
  if (attireClass === "smart casual") attireClass = "smartCasual";

  return (
    <div className={`${style.column} ${style.card}`} onClick={() => setIsExpanded(!isExpanded)}>
      <div className={style.nameContainer}>
        <div className={style.name}>
          {name}
          <div title={attire} className={`${style.icon} ${style[attireClass]}`} />
        </div>
        <div className={`${style.caret} ${style.down}`} />
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
