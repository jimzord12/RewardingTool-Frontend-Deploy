// import { DNA } from "../../../../node_modules/react-loader-spinner/dist/loader/Dna.js";
import { Circles } from "react-loader-spinner";

// import { useNavigation } from "hooks/useNavigation.js";

export default function SimpleSpinner() {
  return (
    <Circles
      height="50"
      width="50"
      color="#4fa94d"
      wrapperStyle={{ display: "block" }}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      //   outerCircleColor="white"
      //   innerCircleColor="white"
      //   middleCircleColor="white"
    />
  );
}
