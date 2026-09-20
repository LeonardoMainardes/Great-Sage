import { NucleusState } from "./types";
import {
  nucleusCoreStyles,
  nucleusStyles,
  nucleusAnimationStyles,
} from "./styles";

interface NucleusProps {
  state: NucleusState;
}

const Nucleus = ({ state }: NucleusProps) => {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div
        className={`w-[90px] h-[90px] rounded-full flex items-center justify-center ${nucleusStyles[state]} ${nucleusAnimationStyles[state]}`}
      >
        <div
          className={`w-7 h-7 rounded-full ${nucleusCoreStyles[state]}`}
          data-tauri-drag-region
        />
      </div>
    </main>
  );
};

export default Nucleus;
