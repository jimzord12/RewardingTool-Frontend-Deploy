import { toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 12000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const useToastMsg = () => {
  const showToast = (title, message, type) => {
    switch (type) {
      case "error":
        return toast.error(
          <CustomToastError title={title} message={message} />,
          options
        );
      case "success":
        return toast.success(
          <CustomToastSuccess title={title} message={message} />,
          { ...options, theme: "light", position: "top-right" }
        );
      case "info":
        return toast.info(
          <CustomToastInfo title={title} message={message} />,
          options
        );
      default:
        return toast.error(
          "We are experiencing issues with the Web Server, please try again later",
          options
        );
    }
  };

  return { showToast };
};

const CustomToastError = ({ title, message }) => {
  return (
    <div
      style={{
        color: "red",
        padding: "16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "8px" }}>
        <h2 style={{ fontSize: 24 }}>{title}</h2>
        <p style={{ color: "black" }}>{message}</p>
      </div>
    </div>
  );
};

const CustomToastSuccess = ({ message, title }) => {
  return (
    <div>
      <h2 style={{ color: "green", fontSize: "24px" }}>{title}</h2>
      <p style={{ color: "black", fontSize: "16px" }}>{message}</p>
    </div>
  );
};

const CustomToastInfo = ({ message, title }) => {
  return (
    <div>
      <h2 style={{ color: "blue", fontSize: "24px" }}>{title}</h2>
      <p style={{ color: "black", fontSize: "16px" }}>{message}</p>
    </div>
  );
};

export default useToastMsg;
