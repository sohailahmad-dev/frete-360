import React, { useEffect, useState } from "react";
import "./CheckBox.css";
import InputField from "../inputField/InputField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function CheckBox({
  label,
  onChange,
  showQual,
  defaulValue,
  timeValue,
  channgeTimeHandle,
}) {
  let [selected, setSelected] = useState("");

  const select = (val) => {
    setSelected(val);
    onChange(val);
  };

 

  useEffect(() => {
    setSelected(defaulValue);
  }, []);

  return (
    <div className="main-checkBox">
      <div className="checkBox-text">{label ?? "label"}</div>
      <div className="checkBox-1">
        <div className="checkBox-2">
          <div className="checkBox-3">
            <div onClick={() => select(true)} className="checkBox-box">
              {selected === true && <div className="checkBox-selected" />}
            </div>
            <div>Sim</div>
          </div>
          <div className="checkBox-3">
            <div onClick={() => select(false)} className="checkBox-box">
              {selected === false && <div className="checkBox-selected" />}
            </div>
            <div>Não</div>
          </div>
        </div>
        {showQual && selected && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker value={timeValue} onChange={channgeTimeHandle} label="Basic time picker" />
            </DemoContainer>
          </LocalizationProvider>
        )}
      </div>
    </div>
  );
}
