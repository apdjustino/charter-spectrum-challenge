import style from "./pagination.module.scss";

import React from "react";

const Pagination = ({ selectedPageIndex, pageCount, setter = () => null }) => {
  const pages = [];
  for (var i = 0; i < pageCount; i++) {
    pages.push({ label: i + 1 });
  }
  pages.reverse();
  return (
    <div className={style.pagination}>
      {pages.map((p, i) => {
        return (
          <div className={`${style.pageLink} ${selectedPageIndex === p.label - 1 ? style.selected : null}`} key={i} onClick={() => setter(p.label - 1)}>
            {p.label}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
