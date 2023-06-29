import { toast } from "react-toastify";

const CustomErrorToast = ({ text1, text2, text3 }) => (
  <div>
    {text1}
    {text2 && (
      <>
        <br />
        <br />
        {text2}
      </>
    )}
    {text3 && (
      <>
        <br />
        <br />
        {text3}
      </>
    )}
  </div>
);

export function loginProcessHandler(operation, hasProvider, wallet) {
  const operations = (op, step) => {
    // User presses "Connect" button
    if (op === "connect") {
      // Steo #1. User does not have wallet
      if (step === 1) {
        return true;
      }
    }
  };

  if (!hasProvider) {
    // 1. User doesnt have wallet
    toast.error(
      <CustomErrorToast
        text1={`A Crypto Wallet is required,in order to interact with the site.`}
        text2={"If just installed or activated one, please refresh the page."}
      />,
      {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    console.log(
      "useWeb3Login: ⛔ A Crypto Wallet is required,in order to interact with the site. If just installed or activated one, please refresh the page."
    );
    return false;
  } else if (hasProvider && wallet.chainId === "") {
    if (operations(operation, 1)) return true;
    // 3. User has wallet, has logged into the Wallet, but has not connected to the site
    toast.error(
      <CustomErrorToast
        text1={"To procceed please connect your wallet to the site."}
        text2={"There is an orange 'Connect' button for this purpose."}
      />,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    console.log(
      "useWeb3Login: ⛔ To procceed please connect your wallet to the site. There is an orange 'Connect' button for this purpose."
    );
    return false;
  } else if (hasProvider && wallet.chainId !== 31337) {
    // 4. User has wallet, and has connected it, but is on the wrong network
    toast.error(
      <CustomErrorToast
        text1={"Please change your selected network to: (GENERA)"}
      />,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    console.log(
      "useWeb3Login: ⛔ Please change your selected network to: (GENERA)"
    );
    return false;
  }
  //   else if (operations("redeem", 5)) {
  //     // 5. User has wallet, and has connected it, is on the wrong network, BUT
  //     // Does not have suffient MGS Token for the seleceted Reward
  //     toast.error(
  //       <CustomErrorToast
  //         text1={"Please change your selected network to: (GENERA)"}
  //       />,
  //       {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       }
  //     );
  //     console.log(
  //       "useWeb3Login: ⛔ Please change your selected network to: (GENERA)"
  //     );
  //     return false;
  //   }

  return true;
}

export function noAccountWarning() {
  toast.warn(
    <CustomErrorToast
      text1={"To interact with the website, you have to create an account."}
      text2={"The only thing we need is an alias (username)."}
      text3={"To do so, click the 'Sign Up!' button"}
    />,
    {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );
  console.log(
    "useWeb3Login: ⚠ To interact with the website, you have to create an account. The only thing we need is an alias (username)."
  );
  return false;
}
