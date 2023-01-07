import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import style from "./selectDropdown.module.css";
import { IoCloseOutline } from "react-icons/io5";


interface Iprops {}

const SelectDropDown = ({}: Iprops) => {
  const [selected, setSelected] = useState<string>("");
  const [selectedArray, setSelectedArray] = useState<string[]>([]);
const inputField=useRef<HTMLInputElement>(null)

useEffect(()=>{



})

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("add to array", selected);
      setSelectedArray((oldData) => [...oldData, selected]);
      setSelected("");
    }
  };

  const removeData = (e: MouseEvent, data: string) => {
    console.log("deleted");
    
    const index = selectedArray.indexOf(data);
    console.log(index);
    
    selectedArray.splice(index, 1);
    setSelectedArray(data=>[...data])
  };
  return (
    <>
      <div onClick={(e)=>{
        e.preventDefault()
        inputField.current?.focus()
      }} className={style.container}>
        <div className={style.selectedDataContainer}>
          {selectedArray.map((data: string, idx: number) => (
            <div key={idx + Date.now()} className={style.selectedData}>
              <option value="">{data}</option>
              <div className={style.btnWrapper}>
                <button
                  onClick={(e: MouseEvent) => removeData(e, data)}
                  className={style.rmvBtn}
                >
                  <IoCloseOutline />
                </button>
              </div>
            </div>
          ))}
          <input
          ref={inputField}
            type="text"
            onKeyDown={handleKeyDown}
            value={selected}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setSelected(e.currentTarget.value);
            }}
            className={style.inputText}
          />
        </div>
      </div>
    </>
  );
};

export default SelectDropDown;
