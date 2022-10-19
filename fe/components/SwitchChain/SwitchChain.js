import style from "./SwitchChain.module.css";
import BSC from "../../assets/BSC.png";
import Polygon from "../../assets/Polygon.png";
import SwitchIcon from "../SwitchIcon/SwitchIcon";

import Image from "next/image";

const chainConfig = {
  BSC: {
    logo: BSC,
  },
  PoL: {
    logo: Polygon,
  },
};

function SwitchChain(props) {
  return (
    <div className={style.switchContainer}>
      <Image src={chainConfig[props.from].logo} width={250} height={250} />
      <SwitchIcon onClick={props.toggle} />
      <Image src={chainConfig[props.to].logo} width={250} height={250} />
    </div>
  );
}

export default SwitchChain;
