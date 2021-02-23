import style from "./filter.module.scss";

import React, { useState } from "react";

const Filter = ({ label, width, options, selectedOption, setSelectedOption = () => null }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={style.filter}>
      <div className={style.label}>{label}</div>
      <div
        className={style.control}
        style={{ width: `${width}px` }}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        <div className={style.selected}>{selectedOption}</div>
        <div className={style.caret} />
      </div>
      <div className={`${style.optionsContainer} ${isVisible ? null : style.hidden}`} style={{ width: `${width}px` }}>
        {options.map((option, i) => (
          <div
            key={i}
            className={style.option}
            style={{ width: `${width}px` }}
            onClick={() => {
              setSelectedOption(option);
              setIsVisible(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
