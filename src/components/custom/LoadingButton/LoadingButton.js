// import { DNA } from "../../../../node_modules/react-loader-spinner/dist/loader/Dna.js";
import { ThreeCircles } from "react-loader-spinner";

import { Button } from "reactstrap";
// import { useNavigation } from "hooks/useNavigation.js";

export default function LoadingButton({
  isLoading,
  onClick,
  children,
  loginFailed,
}) {
  //   const { navigate } = useNavigation();

  return (
    <Button
      className="btn-round login-btn"
      color={loginFailed ? "danger" : "success"}
      size="lg"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <ThreeCircles
          height="50"
          width="50"
          color="#4fa94d"
          wrapperStyle={{ display: "block" }}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="white"
          innerCircleColor="white"
          middleCircleColor="white"
        />
      ) : (
        children
      )}
    </Button>
  );
}
