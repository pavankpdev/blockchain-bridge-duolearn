import ArrowLeft from "../../assets/arrow-left.png";
import ArrowRight from "../../assets/arrow-right.png";

import Image from 'next/image'

function SwitchIcon(props) {
  return (
    <div
      onClick={props.onClick}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
    >
      <Image width={100} height={50} src={ArrowLeft} />
      <Image width={100} height={50} src={ArrowRight} />
    </div>
  );
}
export default SwitchIcon;
