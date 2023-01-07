import { ReactElement, useEffect, useRef, useState } from "react";
import style from "./collapse.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

interface CollapseInter {
  children: ReactElement;
  heading: string;
}

const Collapse = ({ children, heading }: CollapseInter) => {
  const [collapse, setColpase] = useState<boolean>(true);

  const [height, setHeight] = useState<number | undefined>(
    collapse ? undefined : 0
  );

  const ref = useRef<HTMLDivElement>(null);

//   style
const myColapseStyle={display:'flex',  width:'100%',height }
  useEffect(() => {
    if (collapse) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [collapse]);
  return (
    <>
      <div className={style.container} >
        <div
          onClick={() => {
            console.log({ collapse });

            setColpase(!collapse);
          }}
          className={style.head}
        >
          {heading}
          <IoMdArrowDropdown
            size={15}
            style={
              !collapse
                ? { transform: "rotate(0deg)", marginBottom: "`20px" }
                : { transform: "rotate(180deg)" }
            }
          />
        </div>
        <div className={style.my_collapse} style={myColapseStyle} >
        <div ref={ref} className={collapse ? style.expandBody : style.body}>
        {/* <div ref={ref} className={style.expandBody}> */}
          {children}
        </div>
        </div>
       
      </div>
    </>
  );
};

export default Collapse;
