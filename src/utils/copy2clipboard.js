import { toast } from "react-toastify";

const CustomToast = ({ text1, text2, text3 }) => (
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

export const copyToClipboard = async (textToCopy) => {
  console.log("Text To Copy to Clipboard: ", textToCopy);
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log("Copied to clipboard");
    // throw new Error("Testing...");
    toast(
      <CustomToast
        text1={`The MGS Contract Address is copied into your clipboard! ✅`}
        text2={"Just paste it into the required MetaMask field"}
        text3={"You will understand everything, once you watch the video 😁"}
      />,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  } catch (err) {
    console.error("Failed to copy text: ", err);

    toast.error(
      <CustomToast
        text1={`We tried to copy the MGS Contract Address to your clipboard, but failed!`}
        text2={
          "Please manually copy the address below can paste it to MetaMask"
        }
        text3={textToCopy}
      />,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      }
    );
  }
};
