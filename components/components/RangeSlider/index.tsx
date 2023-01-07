import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import style from "./range.module.css";

interface multirangeSlid {
  min: number;
  max: number;
  onChange?: any;
  width?: number;
}
interface onchangeINterface {
  min: number;
  max: number;
}
const RangeSlider = ({ min, max, onChange, width }: multirangeSlid) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const containerRef = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);
  useEffect(() => {
    
    if (containerRef.current) {
    console.log({width});
    
      containerRef.current.style.width = width &&width <400 ?`${width}px` : '400px' ;
    }
  }, [width]);
  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange && onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);
const containerStyle={ width:width }
  return (
    <div  ref={containerRef} className={style.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={`${style.thumb} ${style.thumb__left}`}
        style={{ zIndex: (minVal > max - 100 && "5") || 5 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${style.thumb} ${style.thumb_right}`}
      />

      <div className={style.slider}>
        <div className={style.slider__track} />
        <div ref={range} className={style.slider__range} />
        {/* <div className={style.slider__left_value}>{minVal}</div>
        <div className={style.slider__right_value}>{maxVal}</div> */}
      </div>
    </div>
  );
};

export default RangeSlider;
