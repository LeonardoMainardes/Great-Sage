import "../../App.css";
import React from "react";
import { NucleusState } from "./types";

const Nucleus: React.FC<{ state: NucleusState }> = ({ state }) => {
  return (
    <main className="nucleus-container ">
      <div className={`nucleus ${state.toLowerCase()}`}>
        <div className="nucleus-core" data-tauri-drag-region />
      </div>
    </main>
  );
};

export default Nucleus;
