import style from "./tag.module.scss";

import React from "react";

const Tag = ({ title }) => (
  <div>
    <div>{`${title},`}&nbsp;</div>
  </div>
);

export default Tag;
