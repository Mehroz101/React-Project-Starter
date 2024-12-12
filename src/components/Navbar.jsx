import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { ToggleButton } from "primereact/togglebutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

export default function Navbar({ onShow }) {
  const [checked, setChecked] = useState(true);

  return (
    <div className="card">
      <Menubar
        start={
          <ToggleButton
            offLabel=""
            onLabel=""
            onIcon={
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="icon text-green-500 text-2xl"
              />
            } // Tailwind styling
            offIcon={
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="icon text-red-500 text-2xl"
              />
            } // Tailwind styling
            checked={checked}
            onChange={(e) => onShow(e.value)}
            className="toggle-btn me-2 outline-none border-none"
          />
        }
      />
    </div>
  );
}
