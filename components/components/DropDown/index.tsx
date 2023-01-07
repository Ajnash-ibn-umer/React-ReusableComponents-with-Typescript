import { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { IoMdArrowDropdown } from "react-icons/io";
interface Dropdown {
  label: string;
  isSortButton?: boolean;
  menuItems: {
    id?: string;
    label?: string;
    link?: string;
  }[];
}

interface clickOnContentInterface {

  selectedLabel: string;
}
const DropDown = ({ label, menuItems, isSortButton }: Dropdown) => {
  // states and hooks

  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(menuItems[0].label || "");
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  // functions
  useEffect(() => {
    if (menuRef.current)
      menuRef.current.style.display = showMenu ? "none" : "block";
  }, [showMenu]);

  const onClick = (e: any) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };
  const clickOnContent = ({ selectedLabel }: clickOnContentInterface) => {
    // router.push(link);
    console.log('clicked');
    
    setSelected(selectedLabel);
    setShowMenu(true)
  };
  return (
    <>
      <button onClick={onClick} className={styles.buttonDefault}>
        {isSortButton ? (
          <>
            <span>sort by</span>
            <span></span>
            <strong>{selected}</strong>
          </>
        ) : (
          label
        )}
        {"  "}{" "}
        <span>
          <IoMdArrowDropdown></IoMdArrowDropdown>
        </span>
      </button>
      <div ref={menuRef} className={styles.menu}>
        <ul>
          {menuItems.map((data, idx) => {
            return (
              <li
                key={idx}
                onClick={() =>
                  clickOnContent({
                  
                    selectedLabel: data.label ?? "",
                  })
                }
              >
                {data.label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
